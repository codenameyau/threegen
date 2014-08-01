/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.setPlayer = function(entity) {
  // Bind player reference to entity
  this.player = entity;

  // Bind target camera to entity
  this.setPlayerCamera(this.settings.CAMERA);
};


ThreeGen.prototype.updatePlayer = function() {

  // Key: 'up' - move front
  if (this.keyboard.pressed(this.settings.KEYS.up)) {
    if (this.player.falling) {
      this.moveEntity(this.player, this.player.movement.airFrontSpeed, 'front');
    }
    else {
      this.moveEntity(this.player, this.player.movement.frontSpeed, 'front');
    }
  }

  // Key: 'down' - move back
  if (this.keyboard.pressed(this.settings.KEYS.down)) {
    if (this.player.falling) {
      this.moveEntity(this.player, this.player.movement.airBackSpeed, 'back');
    }
    else {
      this.moveEntity(this.player, this.player.movement.backSpeed, 'back');
    }
  }

  // Key: 'left' - rotate left
  if (this.keyboard.pressed(this.settings.KEYS.left)) {
    if (this.player.falling) {
      this.rotateEntity(this.player, this.player.movement.airRotation);
    }
    else {
      this.rotateEntity(this.player, this.player.movement.rotationSpeed);
    }
  }

  // Key: 'right' - rotate right
  if (this.keyboard.pressed(this.settings.KEYS.right)) {
    if (this.player.falling) {
      this.rotateEntity(this.player, -this.player.movement.airRotation);
    }
    else {
      this.rotateEntity(this.player, -this.player.movement.rotationSpeed);
    }
  }

  // Key: 'space' - jump
  if (this.keyboard.pressed(this.settings.KEYS.jump)) {
    // [TODO] Create Entity jump method
    if (!this.player.falling) {
      this.player.velocity.y += this.player.movement.jumpDistance;
      this.moveEntity(this.player, this.player.velocity.y, 'up');
      this.player.falling = true;
    }
  }

  // [TODO] Update children of player
};
