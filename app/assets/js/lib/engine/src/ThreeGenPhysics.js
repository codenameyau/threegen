/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/****************************
 * Physics Engine Functions *
 ****************************/
ThreeGen.prototype.enablePhysics = function() {
  this.gravity = this.settings.PHYSICS.gravity;
  this.airFriction = 0.5;
};


ThreeGen.prototype.applyPhysics = function() {
  for (var i in this.entities) {
    var entity = this.entities[i];
    if (entity.falling) {

      // Set minimum Y position
      if (entity.belowPosition(entity.dimensions.base)) {
        entity.translateBaseHeight();
      }

      // Check if obstacle under entity
      else if (this.checkCollisionVectors(entity, this.getCollisionVectors('down'))) {
        entity.falling = false;
        entity.velocity.y = 0;
      }

      // Falling object
      else {
        this.accelerateY(entity);
        this.translateEntity(entity, -entity.velocity.y, this.getDirectionVector('down'));
      }
    }

    // Obstacle no longer under entity
    else if (!entity.belowPosition(entity.dimensions.base) &&
      !this.checkCollisionVectors(entity, this.getCollisionVectors('down'))) {
      entity.falling = true;
    }

    // Apply movement mechanics
    // this.moveEntity(entity, entity.velocity.x, 'right');
    // this.moveEntity(entity, entity.velocity.z, 'front');
    this.accelerateX(entity);
    this.accelerateZ(entity);
  }
};


ThreeGen.prototype.getDirectionVector = function(direction) {
  return this.directions[direction];
};


ThreeGen.prototype.getCollisionVectors = function(direction) {
  return this.directions.vectors[direction];
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
