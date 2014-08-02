/*-------JSHint Directive---------*/
/* global THREE                   */
/*--------------------------------*/
'use strict';


module.exports = function(engine, options) {
  var boxGeometry = new THREE.BoxGeometry(5, 5, 5);
  var crateTexture = engine.getTexture('crate');
  var crateMesh = new THREE.Mesh( boxGeometry, crateTexture );
  return engine.Entity(crateMesh, options);
};
