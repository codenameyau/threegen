/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


ThreeGen.prototype.addProjectile = function(entity, vInitial, direction, effects) {
  if (!this.renderer.running) {return;}

  // Compute angle between ground vector and direction vector
  var groundVector = new THREE.Vector3( direction.x, 0, direction.z );
  var theta = groundVector.angleTo(direction);

  // Use theta and vInitial to compute vX, vY, and vZ
  console.log(entity);

  entity.collisionEffect = effects;
  this.projectiles.push(entity);
  this.scene.add(entity);
};


ThreeGen.prototype.deleteProjectile = function(entity) {
  if (!this.renderer.running) {return;}
  this.removeFromScene(entity);
  this.utils.removeObjectInArray(this.projectiles, 'id', entity.id);
};
