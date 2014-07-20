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


ThreeGen.prototype.checkCollision = function(entity, directionVector) {
  var ray = new THREE.Raycaster(entity.position, directionVector, 0, 3.5);
  var obstacles = ray.intersectObjects(this.entities);
  return (obstacles.length > 0) ? true : false;
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
        entity.moveToBaseHeight();
      }

      // Falling object
      else {
        entity.velocity.y += entity.acceleration.y * this.clock.delta;
        this.translateEntity(entity, entity.velocity.y * this.clock.delta,
          entity.direction(this.directions.up));
      }
    }

    // Obstacle no longer under entity
    else if (!this.checkCollision(entity, this.directions.down)) {
      entity.falling = true;
    }
  }
};

