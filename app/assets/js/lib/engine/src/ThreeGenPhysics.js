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

    // Check collisions
    this.checkCollision(entity, this.entities);
  }
};


// Collision detection
ThreeGen.prototype.checkCollision = function(object, obstacles, distance) {
  distance = distance || 30;
  var collisions;

  for (var i=0; i<object.rays.length; i++) {
    object.caster.set(object.position, object.rays[i]);
    collisions = object.caster.intersectObject(obstacles);

    // If intersection, disable direction
    if (collisions.length > 0 && collisions[0].distance <= distance) {

      // Positive 'z' movement
      if ((i === 0 || i === 1 || i === 7) && this.direction.z === 1) {
        object.direction.setZ(0);
      }

      // Negative 'z' movement
      else if ((i === 3 || i === 4 || i === 5) && object.direction.z === -1) {
        object.direction.setZ(0);
      }

      // Positive 'x' movement
      if ((i === 1 || i === 2 || i === 3) && object.direction.x === 1) {
        object.direction.setX(0);
      }

      // Negative 'x' movement
      else if ((i === 5 || i === 6 || i === 7) && object.direction.x === -1) {
        object.direction.setX(0);
      }

    }
  }
};
