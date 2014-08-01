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
  console.info('Finished Loading resources');
  callback(this);
};


ThreeGen.prototype.addResource = function(type, name, path, data) {
  this.resources[type][name] = data;
  this.resources[type][name].resourcePath = path;
};


ThreeGen.prototype.loadTextures = function(source) {
  console.info('Loading textures...');
  var resourceType = 'texture';
  for (var resourceName in source) {
    var filePath = this.settings.PATHS.texture + source[resourceName];
    if (!this._checkResourceCached(resourceType, resourceName, filePath)) {
      var resource = new THREE.ImageUtils.loadTexture(filePath);
      this.addResource(resourceType, resourceName, filePath, resource);
    }
  }
};


ThreeGen.prototype.loadModels = function(source) {
  console.log(source);
};


ThreeGen.prototype.loadSounds = function(source) {
  console.log(source);
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
