/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


ThreeGen.prototype.addProjectile = function(entity, vInitial, direction, effects) {
  if (!this.renderer.running) {return;}
  // [TODO] Apply for all directions

  // Normalize direction vector and find projection to XZ plane
  direction.normalize();
  console.log(direction);
  var planeNormalXZ = new THREE.Vector3( 0, 1, 0 );
  var projectionXZ = direction.clone().projectOnPlane(planeNormalXZ);
  var signX = (direction.x >= 0) ?  1 : -1;
  var signY = (direction.y >= 0) ?  1 : 0;
  var signZ = (direction.z >= 0) ?  1 : -1;

  // Compute surface angle and projection angle
  var unitVectorI = new THREE.Vector3( 1, 0, 0 );
  var surfaceAngle = projectionXZ.angleTo(unitVectorI);
  var projectionAngle = direction.angleTo(projectionXZ);
  // console.log(entity.faceDirection(this.directions.front));

  // Compute entity vX, vY, vZ velocities from angles
  entity.velocity.x =  signX * vInitial * Math.cos(surfaceAngle);
  entity.velocity.y =  signY * vInitial * Math.sin(projectionAngle);
  entity.velocity.z =  signZ * vInitial * Math.sin(surfaceAngle);

  // Add collision effects then add projectile
  entity.collisionEffect = effects;
  this.projectiles.push(entity);
  this.scene.add(entity);
};


ThreeGen.prototype.deleteProjectile = function(entity) {
  if (!this.renderer.running) {return;}
  this.removeFromScene(entity);
  this.utils.removeObjectInArray(this.projectiles, 'id', entity.id);
};
