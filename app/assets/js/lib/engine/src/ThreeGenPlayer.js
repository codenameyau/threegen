/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***************************
 * Player Entity Functions *
 ***************************/
ThreeGen.prototype.setPlayer = function(entity) {
  // Bind player to object
  this.player = entity;

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

  // Update animation for walking
  if (this.keyboard.pressed(this.settings.KEYS.up) || this.keyboard.pressed(this.settings.KEYS.down)) {
    this.player.animation.walking = true;
  }
  else {
    this.player.animation.walking = false;
  }

  // Check for camera pov
  if (this.keyboard.pressed(this.settings.KEYS.pov)) {
    console.log(this.camera);
    this.camera.addTarget({
      name: 'player',
      targetObject: this.player,
      cameraPosition: new THREE.Vector3(0, 20, 0),
      fixed: false,
      stiffness: 0.1,
      matchRotation: true
    });
    this.camera.setTarget('player');
  }

  // Key: 'up' - move front
  if (this.keyboard.pressed(this.settings.KEYS.up)) {
    if (!this.player.falling) {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.settings.PLAYER.airMultiplier * this.clock.delta);
    }
    else {
      this.player.translateZ(-this.settings.PLAYER.frontSpeed *
        this.clock.delta);
    }
  }

  // Key: 'down' - move back
  if (this.keyboard.pressed(this.settings.KEYS.down)) {
    if (this.player.falling) {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.settings.PLAYER.airMultiplier * this.clock.delta);
    }
    else {
      this.player.translateZ(this.settings.PLAYER.backSpeed *
        this.clock.delta);
    }
  }

  // Key: 'left' - rotate left
  if (this.keyboard.pressed(this.settings.KEYS.left)) {
    if (this.player.falling) {
      this.player.rotation.y += this.settings.PLAYER.rotationMultiplier *
        this.settings.PLAYER.airRotationMultiplier * this.clock.delta;
    }
    else {
      this.player.rotation.y += this.settings.PLAYER.rotationMultiplier *
        this.clock.delta;
    }
  }

  // Key: 'right' - rotate right
  if (this.keyboard.pressed(this.settings.KEYS.right)) {
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
  if (this.keyboard.pressed(this.settings.KEYS.jump) && !this.player.falling) {
    this.player.velocity.y += this.player.dimensions.height *
      this.settings.PLAYER.jumpMultiplier;
    this.player.falling = true;
  }

  // Update children of player
};


ThreeGen.prototype.checkPlayerCollision = function() {
  var localVertex, globalVertex, directionVector, collisions;

  for (var i=0; i < this.player.geometry.vertices.length; i++) {
    // Perform ray casting collision detection
    localVertex = this.player.geometry.vertices[i].clone();
    globalVertex = localVertex.applyMatrix4( this.player.matrix );
    directionVector = globalVertex.sub( this.player.position );
    this.player.caster = new THREE.Raycaster(this.player.position, directionVector.normalize());
    collisions = this.player.caster.intersectObjects(this.entities);

    // Case: collision detected
    if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
      console.log('hit');
    }

  }
};
