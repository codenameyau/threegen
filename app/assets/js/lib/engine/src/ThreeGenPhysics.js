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

    if (!this.checkCollision(entity, this.directions.down)) {
      entity.falling = true;
    }

    if (entity.falling) {
      if (this.checkCollision(entity, this.directions.down)) {
        entity.falling = false;
        entity.velocity.y = 0;
      }

      else {
        entity.velocity.y += entity.acceleration.y * this.clock.delta;
        this.translateEntity(entity, entity.velocity.y * this.clock.delta, entity.direction(this.directions.up));
      }

      if (entity.belowPosition(entity.dimensions.base)) {
        entity.moveToBaseHeight();
      }

    }

  }
};


ThreeGen.prototype.getDirectionVector = function(entity, direction) {
  var matrix = new THREE.Matrix4();
  matrix.extractRotation( entity.matrix );
  direction.applyMatrix4(matrix);
  return direction;
};
