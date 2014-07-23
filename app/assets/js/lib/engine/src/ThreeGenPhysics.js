/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/****************************
 * Physics Engine Functions *
 ****************************/
ThreeGen.prototype.enablePhysics = function() {
  this.gravity = this.settings.PHYSICS.gravity;
};


ThreeGen.prototype.applyGravity = function() {
  for (var i in this.entities) {
    var entity = this.entities[i];

    if (entity.falling) {
      // Check if obstacle under entity
      if (this.checkCollision(entity, this.directions.down)) {
        entity.falling = false;
        entity.velocity.y = 0;
      }

      // Set minimum position at object base height
      else if (entity.belowPosition(entity.dimensions.base)) {
        entity.translateBaseHeight();
      }

      // Falling object
      else {
        this.accelerateY(entity);
        this.translateEntity(entity, entity.velocity.y, this.directions.up);
      }
    }

    // Obstacle no longer under entity
    else if (!this.checkCollision(entity, this.directions.down)) {
      entity.falling = true;
    }
  }
};


ThreeGen.prototype.accelerateX = function(entity) {
  entity.velocity.x += entity.acceleration.x * this.clock.delta;
};


ThreeGen.prototype.accelerateY = function(entity) {
  entity.velocity.y += entity.acceleration.y * this.clock.delta;
};


ThreeGen.prototype.accelerateZ = function(entity) {
  entity.velocity.z += entity.acceleration.z * this.clock.delta;
};
