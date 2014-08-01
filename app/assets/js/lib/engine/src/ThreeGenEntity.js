/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*************************
 * Entity Public Methods *
 *************************/
ThreeGen.prototype.Entity = function(object, options) {
  // Scale object dimensions
  this.scaleEntity(object, options);

  // Extend entity properties and methods
  this._initializeEntityProperties(object, options);
  this._initializeEntityMethods(object);
  this._initializeEntityStats(object, options);
  this._initializeEntityAnimations(object, options);
  return object;
};


ThreeGen.prototype.addEntity = function(entity) {
  this.entities.push(entity);
  this.scene.add(entity);
};


ThreeGen.prototype.deleteEntity = function(entity) {
  this.removeFromScene(entity);
  this.utils.removeObjectInArray(this.entities, 'id', entity.id);
};


ThreeGen.prototype.removeFromScene = function(object) {
  if (object === this.player) { delete this.player; }
  this.scene.remove(object);
};


ThreeGen.prototype.scaleEntity = function(object, options) {
  // Scale object dimensions
  var scaleX = this.utils.checkProperty(options, 'scaleX', 1);
  var scaleY = this.utils.checkProperty(options, 'scaleY', 1);
  var scaleZ = this.utils.checkProperty(options, 'scaleZ', 1);
  object.scale.set(scaleX, scaleY, scaleZ);

  // Compute Mesh dimensions
  var entityWidth  = this.utils.checkProperty(options, 'width', 5);
  var entityHeight = this.utils.checkProperty(options, 'height', 5);
  var entityLength = this.utils.checkProperty(options, 'length', 5);
  var entityBase = entityHeight/2;

  // Check if entity is sphere
  if (object.geometry && object.geometry.parameters.radius) {
    entityBase = object.geometry.parameters.radius;
  }

  if (object.geometry) {
    // Regular Mesh
    if (object.geometry.parameters) {
      entityWidth  = object.geometry.parameters.width;
      entityHeight = object.geometry.parameters.height;
      entityLength = object.geometry.parameters.depth;
    }

    // Object3D
    else {
      entityWidth  = this.utils.checkProperty(options, 'width', 5);
      entityHeight = this.utils.checkProperty(options, 'height', 5);
      entityLength = this.utils.checkProperty(options, 'length', 5);
    }
  }

  // Re-compute geometry bounds and dimensions
  object.dimensions = {
    width  : scaleX * entityWidth,
    height : scaleY * entityHeight,
    length : scaleZ * entityLength,
    base   : scaleY * entityBase,
  };
};


ThreeGen.prototype.translateEntity = function(entity, distance, directionVector) {
  var posX = entity.position.x + distance * directionVector.x * this.clock.delta;
  var posY = entity.position.y + distance * directionVector.y * this.clock.delta;
  var posZ = entity.position.z + distance * directionVector.z * this.clock.delta;
  entity.position.set(posX, posY, posZ);
};


ThreeGen.prototype.rotateEntity = function(entity, value) {
  entity.rotation.y += value * this.clock.delta;
};


ThreeGen.prototype.moveEntity = function(entity, distance, direction) {
  // [TODO] Animate entity
  // this.player.animation.walking = true;

  // Check for collision with other entities
  var collisionVectors = this.getCollisionVectors(direction);
  if (this.checkCollisionVectors(entity, collisionVectors)) { return; }

  // Translate if no collisions detectedapplyDi
  var vector = entity.faceDirection(this.getDirectionVector(direction));
  this.translateEntity(entity, distance, vector);
};


ThreeGen.prototype.stillAlive = function(entity) {
  if (entity.stats.health <= 0) {
    // [TODO] Entity death animation
    this.removeFromScene(entity);
    this.deleteEntity(entity);
  }
};


ThreeGen.prototype.modifyHealth = function(entity, points) {
  // [TODO] Display damage and healing indicators
  points = points || 0;
  if (entity.stats.health) {
    entity.stats.health += points;
    this.stillAlive(entity);
  }
};


/***************************
 * Entity Internal Methods *
 ***************************/
ThreeGen.prototype._initializeEntityProperties = function(object, options) {
  var posX = this.utils.checkProperty(options, 'posX', 0);
  var posY = this.utils.checkProperty(options, 'posY', object.dimensions.base);
  var posZ = this.utils.checkProperty(options, 'posZ', 0);

  // Set velocity (x,y,z)
  var vX = this.utils.checkProperty(options, 'vX', 0);
  var vY = this.utils.checkProperty(options, 'vY', 0);
  var vZ = this.utils.checkProperty(options, 'vZ', 0);

  // Set acceleration (x,y,z)
  var aX = this.utils.checkProperty(options, 'aX', 0);
  var aY = this.utils.checkProperty(options, 'aY', this.gravity);
  var aZ = this.utils.checkProperty(options, 'aZ', 0);

  // Extend entity properties
  object.falling = this.utils.checkProperty(options, 'falling', true);
  object.position.set(posX, posY, posZ);
  object.velocity = new THREE.Vector3(vX, vY, vZ);
  object.acceleration = new THREE.Vector3(aX, aY, aZ);

  // Define entity movement speed
  var airMultiplier = this.utils.checkProperty(options, 'airMultiplier', 1.0);
  var jumpHeight = this.utils.checkProperty(options, 'jumpHeight', 40.0);
  var frontSpeed = this.utils.checkProperty(options, 'frontSpeed', 80.0);
  var backSpeed  = this.utils.checkProperty(options, 'backSpeed', frontSpeed * 0.8);
  var rotationMultiplier = this.utils.checkProperty(options, 'rotationMultiplier', 1.5);
  object.movement = {
    airRotation   : airMultiplier * rotationMultiplier,
    rotationSpeed : rotationMultiplier,
    jumpDistance  : jumpHeight,
    frontSpeed    : frontSpeed,
    backSpeed     : backSpeed,
    airFrontSpeed : frontSpeed * airMultiplier,
    airBackSpeed  : backSpeed * airMultiplier,
  };

};


ThreeGen.prototype._initializeEntityMethods = function(object) {

  object.faceDirection = function(vector) {
    var matrix = new THREE.Matrix4();
    var direction = vector.clone();
    matrix.extractRotation(this.matrix);
    direction.applyMatrix4(matrix);
    return direction;
  };

  object.moveToBaseHeight = function() {
    this.falling = false;
    this.velocity.y = 0;
    this.position.y = this.dimensions.base;
  };

  object.belowPosition = function(value) {
    return this.position.y <= value;
  };

  object.abovePosition = function(value) {
    return this.position.y >= value;
  };

};


ThreeGen.prototype._initializeEntityStats = function(object, options) {
  // Load stats with default values from settings
  var statsSettings = this.settings.ENTITIES.stats;
  object.stats = {};

  // Initialize each stat with either default value or value in options
  for (var property in statsSettings) {
    object.stats[property] = this.utils.checkProperty(
      options, property, statsSettings[property]);
  }
};


ThreeGen.prototype._initializeEntityAnimations = function(object, options) {
  // Load options
  var animated = this.utils.checkProperty(options, 'animated', false);
  var animDuration = this.utils.checkProperty(options, 'duration', 1000);
  var animKeyFrames = this.utils.checkProperty(options, 'keyframes', 20);

  // Configure animations
  object.animation = {
    offset : 0,
    keyframe : 0,
    active : animated,
    walking : false,
    duration : animDuration,
    keyframes : animKeyFrames,
    interpolation : animDuration / animKeyFrames,
    lastKeyFrame : 0,
    currentKeyFrame : 0,
  };
};
