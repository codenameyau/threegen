/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.setPlayer = function(entity) {
  // Load player settings
  var sp = this.settings.PLAYER;
  this.player = entity;
  this.player.stats.airRotation = 0.5 * sp.rotationMultiplier;
  this.player.stats.rotationSpeed = sp.rotationMultiplier;
  this.player.stats.jumpDistance = this.player.dimensions.height * sp.jumpMultiplier;
  this.player.stats.frontSpeed = this.player.dimensions.length * sp.frontSpeed;
  this.player.stats.backSpeed = this.player.dimensions.length * sp.backSpeed;
  this.player.stats.airSpeed = this.player.stats.frontSpeed * sp.airMultiplier;

  // Bind camera to player
  this.setPlayerCamera(this.settings.CAMERA);
};


ThreeGen.prototype.updatePlayer = function() {

  // Key: 'up' - move front
  if (this.keyboard.pressed(this.settings.KEYS.up)) {
    if (this.player.falling) {
      this.moveEntity(this.player,
        this.player.stats.airSpeed * this.clock.delta,
        this.player.direction( this.directions.front ));
    }
    else {
      this.moveEntity(this.player,
        this.player.stats.frontSpeed * this.clock.delta,
        this.player.direction( this.directions.front ));
    }
  }

  // Key: 'down' - move back
  if (this.keyboard.pressed(this.settings.KEYS.down)) {
    if (this.player.falling) {
      this.moveEntity(this.player,
        this.player.stats.airSpeed * this.clock.delta,
        this.player.direction( this.directions.back ));
    }
    else {
      this.moveEntity(this.player,
        this.player.stats.backSpeed * this.clock.delta,
        this.player.direction( this.directions.back ));
    }
  }

  // Key: 'left' - rotate left
  if (this.keyboard.pressed(this.settings.KEYS.left)) {
    if (this.player.falling) {
      this.player.rotation.y += this.player.stats.airRotation * this.clock.delta;
    }
    else {
      this.player.rotation.y += this.player.stats.rotationSpeed * this.clock.delta;
    }
  }

  // Key: 'right' - rotate right
  if (this.keyboard.pressed(this.settings.KEYS.right)) {
    if (this.player.falling) {
      this.player.rotation.y -= this.player.stats.airRotation * this.clock.delta;
    }
    else {
      this.player.rotation.y -= this.player.stats.rotationSpeed * this.clock.delta;
    }
  }

  // Key: 'space' - jump
  if (this.keyboard.pressed(this.settings.KEYS.jump) && !this.player.falling) {
    this.player.velocity.y += this.player.stats.jumpDistance;
    this.moveEntity(this.player, this.player.velocity.y*this.clock.delta, this.directions.up);
    this.player.falling = true;
  }

  // [TODO] Update children of player
};
