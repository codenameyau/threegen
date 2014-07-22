/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.setPlayer = function(entity) {
  // Load player settings
  this.player    = entity;
  var settings   = this.settings.PLAYER;
  var dimensions = this.player.dimensions;

  // Setup player movement stats
  this.player.movement = {
    airRotation : 0.5 * settings.rotationMultiplier,
    rotationSpeed : settings.rotationMultiplier,
    jumpDistance : dimensions.height * settings.jumpMultiplier,
    frontSpeed : dimensions.length * settings.frontSpeed,
    backSpeed : dimensions.length * settings.backSpeed,
    airSpeed : dimensions.length * settings.frontSpeed * settings.airMultiplier,
  };

  // Bind target camera to player
  this.setPlayerCamera(this.settings.CAMERA);
};


ThreeGen.prototype.updatePlayer = function() {

  // Key: 'up' - move front
  if (this.keyboard.pressed(this.settings.KEYS.up)) {
    if (this.player.falling) {
      this.moveEntity(this.player, this.player.movement.airSpeed,
        this.player.direction( this.directions.front ));
    }
    else {
      this.moveEntity(this.player, this.player.movement.frontSpeed,
        this.player.direction( this.directions.front ));
    }
  }

  // Key: 'down' - move back
  if (this.keyboard.pressed(this.settings.KEYS.down)) {
    if (this.player.falling) {
      this.moveEntity(this.player, this.player.movement.airSpeed,
        this.player.direction( this.directions.back ));
    }
    else {
      this.moveEntity(this.player, this.player.movement.backSpeed,
        this.player.direction( this.directions.back ));
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
  if (this.keyboard.pressed(this.settings.KEYS.jump) && !this.player.falling) {
    this.player.velocity.y += this.player.movement.jumpDistance;
    this.moveEntity(this.player, this.player.velocity.y, this.directions.up);
    this.player.falling = true;
  }

  // [TODO] Update children of player
};
