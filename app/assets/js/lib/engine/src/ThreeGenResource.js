/*-------JSHint Directive---------*/
/* global THREE, ThreeGen, Howl   */
/*--------------------------------*/
'use strict';


/*****************************
 * Resource Loader Functions *
 *****************************/
ThreeGen.prototype.preloadResources = function(resources, callback) {
  this.loadResource('texture', resources.texture, this.loadTexture);
  // this.loadResource('model', resources.model, this.loadModel);
  this.loadResource('sound', resources.sound, this.loadSound);
  this.loadResource('music', resources.music, this.loadMusic);
  this.resumeGame();
  console.info('Finished Loading resources');
  callback(this);
};


ThreeGen.prototype.addResource = function(type, name, path, data) {
  this.resources[type][name] = data;
  this.resources[type][name].resourcePath = path;
};


ThreeGen.prototype.loadResource = function(resourceType, source, loader) {
  console.info('Loading ' + resourceType + '...');
  console.log(source);
  for (var resourceName in source) {
    var filePath = this.settings.PATHS[resourceType] + source[resourceName];
    if (!this._checkResourceCached(resourceType, resourceName, filePath)) {
      var resource = loader(filePath);
      this.addResource(resourceType, resourceName, filePath, resource);
    }
  }
};


ThreeGen.prototype.loadTexture = function(filePath) {
  return new THREE.ImageUtils.loadTexture(filePath);
};


ThreeGen.prototype.loadModel = function(filePath) {
};


ThreeGen.prototype.loadSound = function(filePath) {
};


ThreeGen.prototype.loadMusic = function(filePath) {
  return new Howl({
    urls: filePath,
    autoplay: true,
    loop: true,
    volume: 0.9,
  });
};



// ThreeGen.prototype.loadModel = function(modelName, modelFile, callback) {
//   var filePath  = this.settings.PATHS.model + modelFile;
//   var engineRef = this;

//   // [TODO] Reuse model if it has already been loaded
//   if (this.models[modelName]) {
//     callback.bind(engineRef)(modelName);
//   }

//   // [AJAX] load JSON model then invoke callback
//   else {
//     this.jsonLoader.load(filePath, function(geometry, materials) {
//       for (var i = 0; i < materials.length; i++) {
//         materials[i].morphTargets = true;
//       }
//       var material = new THREE.MeshFaceMaterial(materials);
//       engineRef.models[modelName] = new THREE.Mesh(geometry, material);
//       callback.bind(engineRef)(modelName);
//     });
//   }
// };


/*****************************
 * Resource Getter Functions *
 *****************************/
ThreeGen.prototype.getTexture = function(name) {
  // [TODO] Optional material
  var texture = this.resources.texture[name];
  return new THREE.MeshLambertMaterial({ map: texture });
};


ThreeGen.prototype.getModel = function(modelName) {
  return this.models[modelName];
};


ThreeGen.prototype.deleteModel = function(modelName) {
  delete this.models[modelName];
};


/*******************************
 * Resource Internal Utilities *
 *******************************/
ThreeGen.prototype._checkResourceCached = function(type, name, path) {
  return (this.resources[type].hasOwnProperty(name) &&
    this.resources[type][name].resourcePath === path);
};
