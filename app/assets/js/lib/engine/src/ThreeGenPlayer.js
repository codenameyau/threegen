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
  this.player.caster = new THREE.Raycaster();

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
  if (this.keyboard.pressed('w') || this.keyboard.pressed('s')) {
    this.player.animation.walking = true;
  }
  else {
    this.player.animation.walking = false;
  }

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
    this.player.velocity.y += this.player.dimensions.height *
      this.settings.PLAYER.jumpMultiplier;
    this.player.falling = true;
  }

  // Update children of player
};


ThreeGen.prototype.checkPlayerCollision = function() {
  var localVertex, globalVertex, directionVector, collisions;
  var originPoint = this.player.position.clone();

  for (var i=0; i < this.player.geometry.vertices.length; i++) {
    localVertex = this.player.geometry.vertices[i].clone();
    globalVertex = localVertex.applyMatrix4( this.player.matrix );
    directionVector = globalVertex.sub( this.player.position );
    this.player.caster = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    collisions = this.player.caster.intersectObjects(this.entities);
    if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
      console.log('hit');
    }
  }

};
