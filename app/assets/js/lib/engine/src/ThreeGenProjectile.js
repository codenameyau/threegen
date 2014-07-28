/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


ThreeGen.prototype.addProjectile = function(entity, collisionEffect) {
  if (!this.renderer.running) {return;}
  entity.collisionEffect = collisionEffect;
  this.projectiles.push(entity);
  this.scene.add(entity);
};


ThreeGen.prototype.deleteProjectile = function(entity) {
  if (!this.renderer.running) {return;}
  this.removeFromScene(entity);
  this.utils.removeObjectInArray(this.projectiles, 'id', entity.id);
};
