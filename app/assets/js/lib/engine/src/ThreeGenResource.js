/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*****************************
 * Resource Loader Functions *
 *****************************/
ThreeGen.prototype.loadTexture = function(filename) {
  var filePath = this.settings.PATHS.textures + filename;
  var texture  = new THREE.ImageUtils.loadTexture(filePath);
  return new THREE.MeshLambertMaterial({ map: texture });
};


ThreeGen.prototype.loadModel = function(modelName, modelFile, callback) {
  var filePath  = this.settings.PATHS.models + modelFile;
  var engineRef = this;

  // Reuse model if it has already been loaded
  if (this.models[modelName]) {
    callback.bind(engineRef)(modelName);
  }

  // [AJAX] load JSON model then invoke callback
  else {
    this.jsonLoader.load(filePath, function(geometry, materials) {
      var material = new THREE.MeshFaceMaterial(materials);
      for (var i = 0; i < materials.length; i++) {
        materials[i].morphTargets = true;
      }
      engineRef.models[modelName] = new THREE.Mesh(geometry, material);
      callback.bind(engineRef)(modelName);
    });
  }
};
