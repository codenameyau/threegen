/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


ThreeGen.prototype.getEntity = function(id) {
  return this.entities[id];
};


ThreeGen.prototype.deleteEntity = function(id) {
  this.scene.remove(this.entities[id]);
  delete this.entities[id];
};


ThreeGen.prototype.addEntity = function(object, options) {

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
    height : boundMax.y - boundMin.y,
    width  : boundMax.x - boundMin.x,
    length : boundMax.z - boundMin.z,
    base   : baseHeight,
  };
  console.log(object.dimensions);
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
  var animDuration = this.checkProperty(options, 'duration', 1000);
  var animKeyFrames = this.checkProperty(options, 'keyframes', 20);

  // Extend Threejs mesh object
  object.collision = this.checkProperty(options, 'collision', 1);
  object.falling = this.checkProperty(options, 'falling', true);
  object.animated = this.checkProperty(options, 'animated', false);
  object.position.set(posX, posY, posZ);
  object.velocity = new THREE.Vector3(vX, vY, vZ);
  object.acceleration = new THREE.Vector3(aX, aY, aZ);
  object.entityID = this.entityCount;
  object.stats = this.settings.ENTITIES.stats;

  // Configure animations
  object.animation = {
    offset : 0,
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
  return object.entityID;
};


ThreeGen.prototype.showBoundingBox = function(entityID, color) {
  color = color || 0x22FF22;
  var bbox = new THREE.BoundingBoxHelper(this.getEntity(entityID), color);
  this.scene.add(bbox);
};

ThreeGen.prototype.getModel = function(modelName) {
  return this.models[modelName];
};


ThreeGen.prototype.deleteModel = function(modelName) {
  delete this.models[modelName];
};
