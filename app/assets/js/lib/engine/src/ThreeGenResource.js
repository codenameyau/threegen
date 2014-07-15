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
