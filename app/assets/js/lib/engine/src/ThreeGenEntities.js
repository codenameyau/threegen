/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


ThreeGen.prototype.getEntity = function(id) {
  return this.entities[id];
};


ThreeGen.prototype.deleteEntity = function(entity) {
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
  object.entityID = this.entityCount;
  object.stats = this.settings.ENTITIES.stats;

  // Set collision detection
  this.enableCollisionDetection(object);

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
  this.entities[this.entityCount] = object;
  this.entityCount += 1;
  this.scene.add(object);
  return object;
};


ThreeGen.prototype.getModel = function(modelName) {
  return this.models[modelName];
};


ThreeGen.prototype.deleteModel = function(modelName) {
  delete this.models[modelName];
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


ThreeGen.prototype.enableCollisionDetection = function(object) {
  object.caster = new THREE.Raycaster();
  object.rays = [
    new THREE.Vector3( 0,  0,  1), // [0]:
    new THREE.Vector3( 1,  0,  1), // [1]:
    new THREE.Vector3( 1,  0,  0), // [2]:
    new THREE.Vector3( 1,  0, -1), // [3]:
    new THREE.Vector3( 0,  0, -1), // [4]:
    new THREE.Vector3(-1,  0, -1), // [5]:
    new THREE.Vector3(-1,  0,  0), // [6]:
    new THREE.Vector3(-1,  0,  1)  // [7]:
  ];
};
