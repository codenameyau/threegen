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


ThreeGen.prototype.updateEntityPhysics = function() {
  for (var i in this.entities) {
    var entity = this.entities[i];

    // Apply gravity
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
  }
};


ThreeGen.prototype.updateProjectilePhysics = function() {
  for (var i in this.projectiles) {
    var projectile = this.projectiles[i];

    // Destroy projectile if hits floor
    if (projectile.belowPosition(0)) {
      this.deleteProjectile(projectile);
      // [TODO] Apply bounce
    }

    // Check if collides with another entity
    else if (this.checkCollisionVectors(projectile, this.getCollisionVectors('down'))) {
      this.deleteProjectile(projectile);
      // [TODO] Apply projectile collision effect
    }

    // Apply physics
    else {
      projectile.position.x += projectile.velocity.x;
      projectile.position.z += projectile.velocity.z;
      this.accelerateX(projectile);
      this.accelerateY(projectile);
      this.accelerateZ(projectile);
      this.translateEntity(projectile, -projectile.velocity.y, this.getDirectionVector('down'));
    }

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

