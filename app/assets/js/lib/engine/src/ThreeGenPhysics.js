/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/****************************
 * Physics Engine Functions *
 ****************************/
ThreeGen.prototype.updateEntityPhysics = function() {
  for (var i=this.entities.length-1; i>=0; --i) {
    var entity = this.entities[i];

    // Apply gravity
    if (entity.falling) {
      // Set minimum Y position
      if (entity.belowPosition(entity.dimensions.base)) {
        entity.moveToBaseHeight();
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
  for (var i=this.projectiles.length-1; i>=0; --i) {
    var projectile = this.projectiles[i];
    var obstacles = this.findCollisionObstacles(projectile, this.getFaceVectors());

    // Destroy projectile if hits floor
    if (projectile.belowPosition(0)) {
      // [TODO] Add optional bounce parameter
      this.deleteProjectile(projectile);
    }

    // Check if collides with another entity
    else if (this.utils.containsItem(obstacles)) {
      this.applyProjectileCollision(projectile, obstacles[0]);
      this.deleteProjectile(projectile);
    }

    // Apply physics
    else {
      // [TODO] translate posX and poZ
      projectile.position.x += projectile.velocity.x;
      projectile.position.z += projectile.velocity.z;
      this.translateEntity(projectile, -projectile.velocity.y, this.getDirectionVector('down'));
      this.accelerateX(projectile);
      this.accelerateY(projectile);
      this.accelerateZ(projectile);
    }

  }
};


ThreeGen.prototype.getDirectionVector = function(direction) {
  return this.directions[direction];
};


ThreeGen.prototype.getCollisionVectors = function(direction) {
  return this.directions.vectors[direction];
};


ThreeGen.prototype.getFaceVectors = function() {
  return [
    this.getDirectionVector('front'),
    this.getDirectionVector('back'),
    this.getDirectionVector('up'),
    this.getDirectionVector('down'),
    this.getDirectionVector('left'),
    this.getDirectionVector('right'),
  ];
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


/*********************************
 * Collision Detection Functions *
 *********************************/
ThreeGen.prototype.getCollisionEntities = function(entity, directionVector) {
  var ray = new THREE.Raycaster(entity.position, directionVector, 0, 3);
  return ray.intersectObjects(this.entities);
};


ThreeGen.prototype.checkCollision = function(entity, directionVector) {
  var obstacles = this.getCollisionEntities(entity, directionVector);
  return this.utils.containsItem(obstacles);
};


ThreeGen.prototype.checkCollisionVectors = function(entity, collisionVectors) {
  for (var i in collisionVectors) {
    if (this.checkCollision(entity, collisionVectors[i])) {return true;}
  }
  return false;
};


ThreeGen.prototype.findCollisionObstacles = function(entity, collisionVectors) {
  var obstacles = [];
  for (var v in collisionVectors) {
    obstacles = this.getCollisionEntities(entity, collisionVectors[v]);
    if (this.utils.containsItem(obstacles)) {break;}
  }
  return obstacles;
};


ThreeGen.prototype.applyProjectileCollision = function(projectile, obstacle) {
  // [TODO] Display damage indicators
  // [TODO] Playback collision sound effects
  // [TODO] Clean up stats checking
  var entity = obstacle.object;
  for (var stat in projectile.collisionEffect) {
    switch (stat) {
    case 'health':
      this.modifyHealth(entity, projectile.collisionEffect[stat]);
      break;
    default:
      entity.stats[stat] += projectile.collisionEffect[stat];
    }
  }
};
