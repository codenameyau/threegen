/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*******************************
 * Core Engine Input Listeners *
 *******************************/
ThreeGen.prototype.keyboardInput = function() {

  // Listener: Toggle pov
  if (this.keyboard.pressed(this.settings.KEYS.pov)) {
    this.togglePOV();
  }

  // Listener: Pause game and open menu
  else if (this.keyboard.pressed(this.settings.KEYS.menu)) {
    this.togglePause();
  }

};


ThreeGen.prototype.mouseClickListener = function(callback) {
  // [TODO] Encapsulate in game code
  window.addEventListener('click', callback.bind(this), false);
};


ThreeGen.prototype.getMouseVector = function(event) {
  var mouseVector = new THREE.Vector3();
  mouseVector.x = 2 * (event.clientX / window.innerWidth) - 1;
  mouseVector.y = 1 - 2 * (event.clientY / window.innerHeight);
  return mouseVector;
};
