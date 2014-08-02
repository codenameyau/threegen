/*-------JSHint Directive---------*/
/* global THREE, ThreeGen, Howl   */
/*--------------------------------*/
'use strict';


/*****************************
 * Resource Loader Functions *
 *****************************/
ThreeGen.prototype.preloadResources = function(resources, callback) {
  this.loadResources('texture', resources.texture, this.loadTexture.bind(this));
  // this.loadResources('model', resources.model, this.loadModel.bind(this));
  this.loadResources('sound', resources.sound, this.loadSound.bind(this));
  this.loadResources('music', resources.music, this.loadMusic.bind(this));
  this.resumeGame();
  console.info('Finished Loading resources');
  callback(this);
};


ThreeGen.prototype.addResource = function(type, name, path, data) {
  this.resources[type][name] = data;
  this.resources[type][name].resourcePath = path;
};


ThreeGen.prototype.loadResources = function(resourceType, source, loaderCallback) {
  console.info('Loading ' + resourceType + '...');
  for (var resourceName in source) {
    var filePath = this.settings.PATHS[resourceType] + source[resourceName];
    if (!this._checkResourceCached(resourceType, resourceName, filePath)) {
      loaderCallback(filePath, resourceName);
    }
  }
};


ThreeGen.prototype.loadTexture = function(filePath, resourceName) {
  this.addResource('texture', resourceName, filePath,
    new THREE.ImageUtils.loadTexture(filePath));
};


ThreeGen.prototype.loadModel = function(filePath, resourceName) {
  console.log(filePath);
  console.log(this.jsonLoader);
  this.jsonLoader.load(filePath, function(geometry, materials) {
    materials.map(function(material) {
      material.morphTargets = true;
    });
    var material = new THREE.MeshFaceMaterial(materials);
    console.log(material);
    return new THREE.Mesh(geometry, material);
  });
};


ThreeGen.prototype.loadSound = function(filePath, resourceName) {
  this.addResource('sound', resourceName, filePath,
    new Howl({
      urls: [filePath],
      autoplay: false,
      loop: false,
      volume: 0.5,
    }));
};


ThreeGen.prototype.loadMusic = function(filePath, resourceName) {
  // [TODO] Add support for multiple sound files
  this.addResource('music', resourceName, filePath,
    new Howl({
      urls: [filePath],
      autoplay: false,
      loop: true,
      volume: 1.0,
    }));
};



// ThreeGen.prototype.loadModel = function(modelName, modelFile, callback) {

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


/****************************
 * Resource Audio Functions *
 ****************************/
ThreeGen.prototype.playMusic = function(name) {
  this.resources.music[name].play();
};


ThreeGen.prototype.playSound = function(name) {
  this.resources.sound[name].play();
};


/*******************************
 * Resource Internal Utilities *
 *******************************/
ThreeGen.prototype._checkResourceCached = function(type, name, path) {
  return (this.resources[type].hasOwnProperty(name) &&
    this.resources[type][name].resourcePath === path);
};
