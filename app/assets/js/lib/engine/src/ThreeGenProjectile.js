/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*****************************
 * Projectile Public Methods *
 *****************************/
ThreeGen.prototype.launchProjectile = function(entity, parameters, callback) {
  // Create projector and cast ray
  var direction = parameters.direction;
  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( direction.clone(), this.camera );
  var raydirection = raycaster.ray.direction;
  raydirection.y = direction.y;
  this.addProjectile(entity, raydirection, parameters, callback);
};


ThreeGen.prototype.addProjectile = function(entity, rayVector, parameters, callback) {
  if (!this.renderer.running) {return;}

  // Load parameters
  var vInitial = this.utils.checkProperty(parameters, 'velocity', 100);
  var effects  = this.utils.checkProperty(parameters, 'effects', {});

  // Find projection vector to XZ plane
  rayVector.normalize();
  var planeNormalXZ = new THREE.Vector3( 0, 1, 0 );
  var projectionXZ = rayVector.clone().projectOnPlane(planeNormalXZ);

  // Compute surface angle and projection angle
  var unitVectorI = new THREE.Vector3( 1, 0, 0 );
  var surfaceAngle = projectionXZ.angleTo(unitVectorI);
  var projectionAngle = rayVector.angleTo(projectionXZ);

  // Compute sign changes: limit y to pos, reverse direction of z
  var signY = (rayVector.y >= 0) ? 1 : 0;
  var signZ = (rayVector.z >= 0) ? 1 : -1;

  // Compute entity vX, vY, vZ velocities from angles
  entity.velocity.x = vInitial * Math.cos(surfaceAngle);
  entity.velocity.y = signY * vInitial * Math.sin(projectionAngle);
  entity.velocity.z = signZ * vInitial * Math.sin(surfaceAngle);

  // Add collision effects to projectile
  entity.collisionEffect = effects;
  this.projectiles.push(entity);
  this.scene.add(entity);
  callback();
};


ThreeGen.prototype.deleteProjectile = function(entity) {
  if (!this.renderer.running) {return;}
  this.removeFromScene(entity);
  this.utils.removeObjectInArray(this.projectiles, 'id', entity.id);
};
