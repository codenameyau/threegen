/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.setPlayer = function(entityID) {
  // Bind player to object
  this.player = this.getEntity(entityID);

  // Set target cam on player
  var cam = this.settings.CAMERA;
  this.camera.addTarget({
    name: 'player',
    targetObject: this.player,
    cameraPosition: new THREE.Vector3(cam.distX, cam.distY, cam.distZ),
    fixed: false,
    stiffness: 0.1,
    matchRotation: true
  });
  this.camera.setTarget('player');
};


ThreeGen.prototype.updatePlayer = function() {

  // Key: 'w' - move front
  if (this.keyboard.pressed('w')) {
    if (!this.player.falling) {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.settings.PLAYER.airMultiplier * this.clock.delta);
    }
    else {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.clock.delta);
    }
  }

  // Key: 's' - move back
  if (this.keyboard.pressed('s')) {
    if (this.player.falling) {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.settings.PLAYER.airMultiplier * this.clock.delta);
    }
    else {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.clock.delta);
    }
  }

  // Key: 'a' - rotate left
  if (this.keyboard.pressed('a')) {
    if (this.player.falling) {
      this.player.rotation.y += this.settings.PLAYER.rotationMultiplier *
        this.settings.PLAYER.airRotationMultiplier * this.clock.delta;
    }
    else {
      this.player.rotation.y += this.settings.PLAYER.rotationMultiplier *
        this.clock.delta;
    }
  }

  // Key: 'w' - rotate right
  if (this.keyboard.pressed('d')) {
    if (this.player.falling) {
      this.player.rotation.y -= this.settings.PLAYER.rotationMultiplier *
        this.settings.PLAYER.airRotationMultiplier * this.clock.delta;
    }
    else {
      this.player.rotation.y -= this.settings.PLAYER.rotationMultiplier *
        this.clock.delta;
    }
  }

  // Key: 'space' - jump
  if (this.keyboard.pressed('space') && !this.player.falling) {
    this.player.velocity.y += this.player.dimensions.height * this.settings.PLAYER.jumpMultiplier;
    this.player.falling = true;
  }
  // Update children of player
};
