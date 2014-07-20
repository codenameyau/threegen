/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


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

  // Set animations
  var animated =  this.checkProperty(options, 'animated', false);
  var animDuration = this.checkProperty(options, 'duration', 1000);
  var animKeyFrames = this.checkProperty(options, 'keyframes', 20);

  // Extend Threejs mesh object
  object.falling = this.checkProperty(options, 'falling', true);
  object.position.set(posX, posY, posZ);
  object.velocity = new THREE.Vector3(vX, vY, vZ);
  object.acceleration = new THREE.Vector3(aX, aY, aZ);
  object.stats = this.settings.ENTITIES.stats;

  // Configure collision raycaster
  this.setCollisionDetection(object);

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
  var scaleX = this.checkProperty(options, 'scaleX', 1);
  var scaleY = this.checkProperty(options, 'scaleY', 1);
  var scaleZ = this.checkProperty(options, 'scaleZ', 1);
  object.scale.set(scaleX, scaleY, scaleZ);

  // Compute geometry bounds and dimensions
  object.geometry.computeBoundingSphere();
  object.geometry.computeBoundingBox();
  var boundMin = object.geometry.boundingBox.min;
  var boundMax = object.geometry.boundingBox.max;
  var baseHeight = this.checkProperty(options, 'base', (boundMax.y - boundMin.y)/2);
  object.dimensions = {
    width  : scaleX * (boundMax.x - boundMin.x),
    height : scaleY * (boundMax.y - boundMin.y),
    length : scaleZ * (boundMax.z - boundMin.z),
    base   : scaleY * baseHeight,
  };
};


ThreeGen.prototype.moveEntity = function(entity, distance, direction) {
  // [TODO] Animate entity

  // Check for collision with other entities
  if (!this.checkCollision(entity)) {
    // Translate object
    // var v = direction.multiplyScalar(distance);
    // var p = entity.position.add(v);
    // entity.position = p;
    var posX = entity.position.x + distance * direction.x;
    var posY = entity.position.y + distance * direction.y;
    var posZ = entity.position.z + distance * direction.z;
    entity.position.set(posX, posY, posZ);
    // entity.translateZ(-this.settings.PLAYER.frontSpeed * this.clock.delta);
  }

};


ThreeGen.prototype.setCollisionDetection = function(object, rayLength) {
  rayLength = rayLength || 3;
  object.rays = {
    front : new THREE.Raycaster(object.position, new THREE.Vector3( 0,  0, -1), 0, rayLength),
    back  : new THREE.Raycaster(object.position, new THREE.Vector3( 0,  0,  1), 0, rayLength),
    left  : new THREE.Raycaster(object.position, new THREE.Vector3(-1,  0,  0), 0, rayLength),
    right : new THREE.Raycaster(object.position, new THREE.Vector3( 1,  0,  0), 0, rayLength),
  };
};
