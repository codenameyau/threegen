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
  this.player.stats.airSpeed = sp.airMultiplier;
  this.player.stats.rotationSpeed = sp.rotationMultiplier;
  this.player.stats.jumpBoost = sp.jumpMultiplier;
  this.player.stats.frontSpeed = sp.frontSpeed;
  this.player.stats.backSpeed = sp.backSpeed;

  // Bind camera to player
  this.setPlayerCamera(this.settings.CAMERA);
};


ThreeGen.prototype.updatePlayer = function() {

  // Key: 'up' - move front
  if (this.keyboard.pressed(this.settings.KEYS.up)) {
    if (!this.player.falling) {
      this.moveEntity(this.player,
        this.player.stats.frontSpeed * this.clock.delta,
        this.player.direction( new THREE.Vector3(0, 0, -1) ));
    }
    else {
      this.moveEntity(this.player,
        this.player.stats.frontSpeed * this.player.stats.airSpeed * this.clock.delta,
        this.player.direction( new THREE.Vector3(0, 0, -1) ));
    }
  }

  // Key: 'down' - move back
  if (this.keyboard.pressed(this.settings.KEYS.down)) {
    if (!this.player.falling) {
      this.moveEntity(this.player,
        this.player.stats.backSpeed * this.clock.delta,
        this.player.direction( new THREE.Vector3(0, 0, 1) ));
    }
    else {
      this.moveEntity(this.player,
        this.player.stats.backSpeed * this.player.stats.airSpeed * this.clock.delta,
        this.player.direction( new THREE.Vector3(0, 0, 1) ));
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
    this.player.velocity.y += this.player.dimensions.height * this.player.stats.jumpBoost;
    this.player.falling = true;
  }

  // Update children of player
};

