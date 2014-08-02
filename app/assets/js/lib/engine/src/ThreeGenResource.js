/*-------JSHint Directive---------*/
/* global THREE, ThreeGen, Howl   */
/*--------------------------------*/
'use strict';


/*****************************
 * Resource Loader Functions *
 *****************************/
ThreeGen.prototype.preloadResources = function(resources, levelCallback) {
  // Load simple resources
  this.loadResources('texture', resources.texture, this.loadTexture.bind(this));
  this.loadResources('sound', resources.sound, this.loadSound.bind(this));
  this.loadResources('music', resources.music, this.loadMusic.bind(this));

  // Load models, run callback and resume game when done
  if (this.utils.objectSize(resources.model)) {
    this.loadModelResources(resources.model, levelCallback);
  }
  else {
    this.finishLoadingResources(levelCallback);
  }
};


ThreeGen.prototype.finishLoadingResources = function(levelCallback) {
  console.info('Finished loading resources');
  levelCallback(this);
  this.resumeGame();
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


ThreeGen.prototype.loadModelResources = function(source, callback) {
  console.info('Loading models...');
  this.preloader.model = {count: 0, total: this.utils.objectSize(source)};
  for (var resourceName in source) {
    var filePath = this.settings.PATHS.model + source[resourceName];
    if (!this._checkResourceCached('model', resourceName, filePath)) {
      this.loadModel(filePath, resourceName, callback);
    }
  }
};


ThreeGen.prototype.loadModel = function(filePath, resourceName, callback) {
  var engine = this;
  this.jsonLoader.load(filePath, function(geometry, materials) {

    // Create MeshFaceMaterial from JSON loader
    materials.map(function(material) { material.morphTargets = true; });
    var material = new THREE.MeshFaceMaterial(materials);
    engine.addResource('model', resourceName, filePath,
      new THREE.Mesh(geometry, material));

    // Invoke callback when all models are loaded
    engine.preloader.model.count++;
    if (engine.preloader.model.count === engine.preloader.model.total) {
      engine.finishLoadingResources(callback);
    }
  });
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
  return this.resources.model[modelName];
};


ThreeGen.prototype.deleteModel = function(modelName) {
  // [TODO] run tests
  delete this.resources.model[modelName];
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
