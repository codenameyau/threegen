/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*****************************
 * Resource Loader Functions *
 *****************************/
ThreeGen.prototype.preloadResources = function(resources, callback) {
  this.loadTextures(resources.texture);
  this.loadModels(resources.model);
  this.loadSounds(resources.sound);
  this.resumeGame();
  console.log('All Loaded');
  callback(this);
};


ThreeGen.prototype.addResource = function(type, name, path, data) {
  this.resources[type][name] = data;
  this.resources[type][name].resourcePath = path;
};


ThreeGen.prototype.loadTextures = function(source) {
  var filepath, resource;
  for (var name in source) {
    filepath = this.settings.PATHS.texture + source[name];
    // Check if texture is cached
    // if (this._checkResourceCached())
    resource = new THREE.ImageUtils.loadTexture(filepath);
    this.addResource('texture', name, filepath, resource);
  }
};


ThreeGen.prototype.loadModels = function(source) {
  console.log(source);

};


ThreeGen.prototype.loadSounds = function(source) {
  console.log(source);
};


ThreeGen.prototype.loadTexture = function(filename) {
  var filePath = this.settings.PATHS.texture + filename;
  var texture  = new THREE.ImageUtils.loadTexture(filePath);
  return new THREE.MeshLambertMaterial({ map: texture });
};


ThreeGen.prototype.loadModel = function(modelName, modelFile, callback) {
  var filePath  = this.settings.PATHS.model + modelFile;
  var engineRef = this;

  // [TODO] Reuse model if it has already been loaded
  if (this.models[modelName]) {
    callback.bind(engineRef)(modelName);
  }

  // [AJAX] load JSON model then invoke callback
  else {
    this.jsonLoader.load(filePath, function(geometry, materials) {
      for (var i = 0; i < materials.length; i++) {
        materials[i].morphTargets = true;
      }
      var material = new THREE.MeshFaceMaterial(materials);
      engineRef.models[modelName] = new THREE.Mesh(geometry, material);
      callback.bind(engineRef)(modelName);
    });
  }
};


/*****************************
 * Resource Getter Functions *
 *****************************/
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
