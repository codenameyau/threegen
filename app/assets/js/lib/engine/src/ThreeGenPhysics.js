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


ThreeGen.prototype.checkCollision = function(entity) {
  var ray, obstacles;
  for (var direction in entity.rays) {
    ray = entity.rays[direction];
    obstacles = ray.intersectObjects(this.entities);
    if (obstacles.length > 0) {
      return true;
    }
  }
};


ThreeGen.prototype.applyPhysics = function() {

  for (var i in this.entities) {
    var entity = this.entities[i];

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

