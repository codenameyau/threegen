/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.updatePlayer = function() {

  // Key: w - move front
  if (this.keyboard.pressed('w')) {
    if (!this.player.floating) {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.settings.PLAYER.airVelocity * this.clock.delta);
    }
    else {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.clock.delta);
    }
  }

  // Key: s - move back
  if (this.keyboard.pressed('s')) {
    if (this.player.floating) {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.settings.PLAYER.airVelocity * this.clock.delta);
    }
    else {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.clock.delta);
    }
  }

  // Key: a - rotate left
  if (this.keyboard.pressed('a')) {
    if (this.player.floating) {
      this.player.rotation.y += this.settings.PLAYER.rotationSpeed *
        this.settings.PLAYER.airRotation * this.clock.delta;
    }
    else {
      this.player.rotation.y += this.settings.PLAYER.rotationSpeed *
        this.clock.delta;
    }
  }

  // Key: w - rotate right
  if (this.keyboard.pressed('d')) {
    if (this.player.floating) {
      this.player.rotation.y -= this.settings.PLAYER.rotationSpeed *
        this.settings.PLAYER.airRotation * this.clock.delta;
    }
    else {
      this.player.rotation.y -= this.settings.PLAYER.rotationSpeed *
        this.clock.delta;
    }
  }

  // Key: space - jump
  if (this.keyboard.pressed('space') && !this.player.floating) {
    this.player.velocity.y += this.settings.PLAYER.jumpVelocity;
    this.player.floating = true;
  }

  // Update children of player
};
