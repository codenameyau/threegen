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

  // Set length, width, height
  var length = this.checkProperty(options, 'length', 10);
  var width  = this.checkProperty(options, 'width',  10);
  var height = this.checkProperty(options, 'height', 10);

  // Set position (x,y,z)
  var posX = this.checkProperty(options, 'posX', 0);
  var posY = this.checkProperty(options, 'posY', height/2);
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
  object.floating = this.checkProperty(options, 'floating', false);
  object.animated = this.checkProperty(options, 'animated', false);
  object.dimensions = {length: length, width: width, height: height, base: height/2};
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

