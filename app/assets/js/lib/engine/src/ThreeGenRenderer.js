/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/***********************
 * Rendering Functions *
 ***********************/
ThreeGen.prototype.renderScene = function() {
  this.renderer.render(this.scene, this.camera);
};


ThreeGen.prototype.updateScene = function() {
  this.clock.delta = this.clock.getDelta();
  this.stats.update();
  this.updatePlayer();
  this.applyPhysics();
  this.camera.update();
};


ThreeGen.prototype.animateScene = function() {
  window.requestAnimationFrame(this.animateScene.bind(this));
  this.updateScene();
  this.renderScene();
};


ThreeGen.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};
