/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***********************
 * Rendering Functions *
 ***********************/
ThreeGen.prototype.renderScene = function() {
  this.renderer.render(this.scene, this.camera);
};


ThreeGen.prototype.updateScene = function() {
  if (this.renderer.running) {
    window.requestAnimationFrame(this.updateScene.bind(this));
    this.clock.delta = this.clock.getDelta();

    // Update stats
    if (this.stats) { this.stats.update(); }
    // Update player
    if (this.player) { this.updatePlayer(); }

    this.updateEntityPhysics();
    this.updateProjectilePhysics();
    this.camera.update();
    this.renderScene();
  }
};


/******************************
 * Camera Rendering Utilities *
 ******************************/
ThreeGen.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};


ThreeGen.prototype.setPlayerCamera = function(position) {
  var posX = this.utils.checkProperty(position, 'posX', 0);
  var posY = this.utils.checkProperty(position, 'posY', 0);
  var posZ = this.utils.checkProperty(position, 'posZ', 0);
  this.camera.addTarget({
    name: 'player',
    targetObject: this.player,
    cameraPosition: new THREE.Vector3(posX, posY, posZ),
    fixed: false,
    stiffness: 0.1,
    matchRotation: true
  });
  this.camera.setTarget('player');
};


ThreeGen.prototype.togglePOV = function() {
  // Set mode to 'pov'
  if (this.camera.mode === 0) {
    this.setPlayerCamera({posX: 0, posY: this.player.dimensions.height, posZ: -5});
    this.camera.mode = 1;
  }

  // Set mode to 'target'
  else if (this.camera.mode === 1) {
    this.setPlayerCamera(this.settings.CAMERA);
    this.camera.mode = 0;
  }
};
