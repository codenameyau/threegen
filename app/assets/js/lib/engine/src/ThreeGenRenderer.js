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

  // Update player
  if (this.player) {
    this.updatePlayer();
    this.checkPlayerCollision();
  }

  // this.animateEntities();
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
  // [TODO] optimization: only loop through active animations
  for (var entityID in this.entities) {
    var entity = this.entities[entityID];

    if (entity.animation.active) {

      // Key frame animation
      if (entity.animation.walking) {
        // var time = this.clock.delta % entity.animation.duration;
        // entity.animation.keyframe = Math.floor(time / entity.animation.interpolation) + entity.animation.offset;

        // if (entity.animation.keyframe !== entity.animation.currentKeyFrame) {
        //   entity.morphTargetInfluences[entity.animation.lastKeyframe] = 0;
        //   entity.morphTargetInfluences[entity.animation.currentKeyframe] = 1;
        //   entity.morphTargetInfluences[entity.animation.keyframe] = 0;
        //   entity.animation.lastKeyframe = entity.animation.currentKeyframe;
        //   entity.animation.currentKeyframe = entity.animation.keyframe;
        // }
        // entity.morphTargetInfluences[entity.animation.keyframe] =
        //   (time % entity.animation.interpolation) / entity.animation.interpolation;
        // entity.morphTargetInfluences[entity.animation.lastKeyframe] = 1 -
        //   entity.morphTargetInfluences[entity.animation.keyframe];
      } // End: key frame animation

    }
  }
};
