/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/****************************
 * Physics Engine Functions *
 ****************************/
ThreeGen.prototype.enablePhysics = function() {
  this.gravity = this.settings.PHYSICS.gravity;
};


ThreeGen.prototype.applyPhysics = function() {

  for (var item in this.entities) {
    var entity = this.entities[item];

    // Apply gravity
    if (entity.falling) {
      entity.position.y += entity.velocity.y * this.clock.delta;
      entity.velocity.y += entity.acceleration.y * this.clock.delta;

      if (entity.position.y <= entity.dimensions.base) {
        entity.falling = false;
        entity.velocity.y = 0;
      }
    }

  }
};
