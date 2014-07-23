/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*************************
 * Entity Public Methods *
 *************************/
ThreeGen.prototype.getEntity = function(id) {
  return this.entities[id];
};


ThreeGen.prototype.deleteEntity = function(entity) {
  if (entity === this.player) { delete this.player; }
  this.scene.remove(entity);
  delete this.entities[entity.entityID];
};


ThreeGen.prototype.addEntity = function(object, options) {
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

  // Add entity to scene
  this.entities.push(object);
  this.scene.add(object);
  return object;
};


ThreeGen.prototype.scaleEntity = function(object, options) {
  // Scale object dimensions
  var entityWidth, entityHeight, entityLength;
  var scaleX = this.checkProperty(options, 'scaleX', 1);
  var scaleY = this.checkProperty(options, 'scaleY', 1);
  var scaleZ = this.checkProperty(options, 'scaleZ', 1);
  object.scale.set(scaleX, scaleY, scaleZ);
  console.log(object);
  // Handle Object3D
  if (object instanceof THREE.Object3D) {
    entityWidth  = 10;
    entityHeight = 10;
    entityLength = 10;
  }

  else {
    object.computeBoundingBox();
    entityWidth  = object.geometry.parameters.width;
    entityHeight = object.geometry.parameters.height;
    entityLength = object.geometry.parameters.depth;
  }

  // Re-compute geometry bounds and dimensions
  object.dimensions = {
    width  : scaleX * entityWidth,
    height : scaleY * entityHeight,
    length : scaleZ * entityLength,
    base   : scaleY * entityHeight/2,
  };
};


ThreeGen.prototype.checkCollision = function(entity, directionVector) {
  var ray = new THREE.Raycaster(entity.position, directionVector, 0, 3);
  var obstacles = ray.intersectObjects(this.entities);
  return (obstacles.length > 0) ? true : false;
};


ThreeGen.prototype.translateEntity = function(entity, distance, direction) {
  var posX = entity.position.x + distance * direction.x * this.clock.delta;
  var posY = entity.position.y + distance * direction.y * this.clock.delta;
  var posZ = entity.position.z + distance * direction.z * this.clock.delta;
  entity.position.set(posX, posY, posZ);
};


ThreeGen.prototype.rotateEntity = function(entity, value) {
  entity.rotation.y += value * this.clock.delta;
};


ThreeGen.prototype.moveEntity = function(entity, distance, direction) {
  // [TODO] Animate entity
  // this.player.animation.walking = true;

  // Check for collision with other entities
  var vertex, vector;
  var pathClear = true;
  for (vertex in direction) {
    vector = entity.applyDirection(direction[vertex]);
    if (this.checkCollision(entity, vector)) {
      pathClear = false;
      break;
    }
  }

  if (pathClear) {
    this.translateEntity(entity, distance, vector);
  }
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
    this.velocity.y = false;
    this.position.y = this.dimensions.base;
  };

  object.belowPosition = function(value) {
    return this.position.y <= value;
  };

};
