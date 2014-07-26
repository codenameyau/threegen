/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*************************
 * Entity Public Methods *
 *************************/
ThreeGen.prototype.addEntity = function(entity) {
  this.entities.push(entity);
  this.scene.add(entity);
};


ThreeGen.prototype.getEntity = function(id) {
  return this.entities[id];
};


ThreeGen.prototype.deleteEntity = function(object) {
  // [TODO]: Refactor
  var entity = this.getEntity(object.id);
  if (entity === this.player) { delete this.player; }
  this.scene.remove(entity);
  delete this.entities[object.id];
};


ThreeGen.prototype.Entity = function(object, options) {
  // Scale object dimensions
  this.scaleEntity(object, options);

  // Set position (x,y,z)
  var posX = this.checkProperty(options, 'posX', 0);
  var posY = this.checkProperty(options, 'posY', object.dimensions.base);
  var posZ = this.checkProperty(options, 'posZ', 0);

  // Set velocity (x,y,z)
  var vX = this.checkProperty(options, 'vX', 0);
  var vY = this.checkProperty(options, 'vY', 0);
  var vZ = this.checkProperty(options, 'vZ', 0);

  // Set acceleration (x,y,z)
  var aX = this.checkProperty(options, 'aX', 0);
  var aY = this.checkProperty(options, 'aY', this.gravity);
  var aZ = this.checkProperty(options, 'aZ', 0);

  // Extend entity properties
  object.falling = this.checkProperty(options, 'falling', true);
  object.position.set(posX, posY, posZ);
  object.velocity = new THREE.Vector3(vX, vY, vZ);
  object.acceleration = new THREE.Vector3(aX, aY, aZ);
  object.stats = this.settings.ENTITIES.stats;

  // Extend entity methods
  this._initializeEntityMethods(object);

  // Set animations
  var animated =  this.checkProperty(options, 'animated', false);
  var animDuration = this.checkProperty(options, 'duration', 1000);
  var animKeyFrames = this.checkProperty(options, 'keyframes', 20);

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

  return object;
};


ThreeGen.prototype.scaleEntity = function(object, options) {
  // Scale object dimensions
  var scaleX = this.checkProperty(options, 'scaleX', 1);
  var scaleY = this.checkProperty(options, 'scaleY', 1);
  var scaleZ = this.checkProperty(options, 'scaleZ', 1);
  object.scale.set(scaleX, scaleY, scaleZ);

  // Compute Mesh dimensions
  var entityWidth  = this.checkProperty(options, 'width', 5);
  var entityHeight = this.checkProperty(options, 'height', 5);
  var entityLength = this.checkProperty(options, 'length', 5);
  if (object.geometry) {

    // Regular Mesh
    if (object.geometry.parameters) {
      entityWidth  = object.geometry.parameters.width;
      entityHeight = object.geometry.parameters.height;
      entityLength = object.geometry.parameters.depth;
    }

    // Object3D
    else {
      entityWidth  = this.checkProperty(options, 'width', 5);
      entityHeight = this.checkProperty(options, 'height', 5);
      entityLength = this.checkProperty(options, 'length', 5);
    }
  }

  // Re-compute geometry bounds and dimensions
  object.dimensions = {
    width  : scaleX * entityWidth,
    height : scaleY * entityHeight,
    length : scaleZ * entityLength,
    base   : scaleY * entityHeight/2,
  };
};


ThreeGen.prototype.iterateCollisionVectors = function(entity, collisionVectors) {

};


ThreeGen.prototype.checkCollision = function(entity, directionVector) {
  var ray = new THREE.Raycaster(entity.position, directionVector, 0, 3);
  var obstacles = ray.intersectObjects(this.entities);
  return (obstacles.length > 0) ? true : false;
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

  // Initialize vectors
  var collisionVectors = this.getCollisionVectors(direction);
  var vector;

  // Check for collision with other entities
  for (var i in collisionVectors) {
    vector = entity.applyDirection(collisionVectors[i]);
    if (this.checkCollision(entity, vector)) { return; }
  }

  // Translate if no collisions detected
  this.translateEntity(entity, distance, vector);
};




/***************************
 * Entity Internal Methods *
 ***************************/
ThreeGen.prototype._initializeEntityMethods = function(object) {

  object.applyDirection = function(vector) {
    var matrix = new THREE.Matrix4();
    var direction = vector.clone();
    matrix.extractRotation(this.matrix);
    direction.applyMatrix4(matrix);
    return direction;
  };

  object.translateBaseHeight = function() {
    this.falling = false;
    this.velocity.y = 0;
    this.position.y = this.dimensions.base;
  };

  object.belowPosition = function(value) {
    return this.position.y <= value;
  };

};
