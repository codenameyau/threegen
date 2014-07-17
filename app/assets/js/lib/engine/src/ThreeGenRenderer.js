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


ThreeGen.prototype.animateScene = function() {
  window.requestAnimationFrame(this.animateScene.bind(this));
  this.clock.delta = this.clock.getDelta();
  this.stats.update();
  this.updatePlayer();
  this.animateEntities();
  this.applyPhysics();
  this.camera.update();
  this.renderScene();
};


ThreeGen.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};


ThreeGen.prototype.animateEntities = function() {
  for (var entityID in this.entities) {
    var entity = this.entities[entityID];
    if (entity.animation.active) {
      console.log(entityID);
    }
  }
};
