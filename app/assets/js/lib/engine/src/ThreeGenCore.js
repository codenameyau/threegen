/*-------JSHint Directive---------*/
/* global THREE, THREEx           */
/* global ThreeGen, Stats         */
/*--------------------------------*/
'use strict';


/******************************
 * Core Engine Public Methods *
 ******************************/
ThreeGen.prototype.start = function() {

  // Initialize: Load settings
  var settings = this.settings;
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var aspectRatio  = canvasWidth/canvasHeight;

  // Initialize: Clock
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();

  // Initialize: Threejs Scene
  this.scene = new THREE.Scene();

  // Initialize: Threejs Renderer
  this.renderer = new THREE.WebGLRenderer(settings.RENDERER);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.addToDOM(this.settings.META.domElement, this.renderer.domElement);
  this.renderer.running = true;

  // Initialize: Threejs Camera
  this.camera = new THREE.TargetCamera(
    settings.CAMERA.fov,
    aspectRatio,
    settings.CAMERA.near,
    settings.CAMERA.far
  );
  this.camera.position.set(
    settings.CAMERA.startX,
    settings.CAMERA.startY,
    settings.CAMERA.startZ
  );
  this.camera.lookAt(this.scene.position);
  this.scene.add(this.camera);
  this.camera.mode = 0;

  // Initialize: Keyboard controls
  this.keyboard = new THREEx.KeyboardState();

  // Initialize: Event listeners
  this._enableEventListeners();

  // Initialize: FPS/ms moniter
  this.stats = new Stats();
  this.stats.setMode(this.settings.META.statsMode);
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.settings.META.domElement, this.stats.domElement);

  // Initialize: game instructions HUD
  if (this.settings.HELP.enabled) { this.enableInstructionsHUD(); }

  // Initialize: JSON loader
  this.jsonLoader = new THREE.JSONLoader();

  // Setup entities
  this.entities = [];

  // Setup models
  this.models = {};

  // Setup physics
  this.directions = {
    up    : new THREE.Vector3( 0,  1,  0 ),
    down  : new THREE.Vector3( 0, -1,  0 ),
    front : new THREE.Vector3( 0,  0, -1 ),
    back  : new THREE.Vector3( 0,  0,  1 ),
  };
  this.enablePhysics();

  // Run scene
  this.animateScene();
};


/*****************************
 * Core Engine Clock Methods *
 *****************************/
ThreeGen.prototype.resumeClock = function() {
  this.clock.start();
};


ThreeGen.prototype.pauseClock = function() {
  this.clock.stop();
};


ThreeGen.prototype.resumeGame = function() {
  this.renderer.running = true;
  this.resumeClock();
  window.requestAnimationFrame(this.animateScene.bind(this));
};


ThreeGen.prototype.pauseGame = function() {
  this.renderer.running = false;
  this.pauseClock();
};


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


ThreeGen.prototype.togglePOV = function() {
  // Set mode to 'pov'
  if (this.camera.mode === 0) {
    this.setPlayerCamera({posX: 0, posY: this.player.dimensions.height+2, posZ: 0});
    this.camera.mode = 1;
  }

  // Set mode to 'target'
  else if (this.camera.mode === 1) {
    this.setPlayerCamera(this.settings.CAMERA);
    this.camera.mode = 0;
  }
};


ThreeGen.prototype.togglePause = function() {
  if (this.renderer.running) {
    this.pauseGame();
  }
  else {
    this.resumeGame();
  }
};


/********************************
 * Core Engine Internal Methods *
 ********************************/
ThreeGen.prototype._enableEventListeners = function() {
  window.addEventListener('resize', this.resizeWindow.bind(this), false);
  window.addEventListener('focus', this.resumeClock.bind(this), false);
  window.addEventListener('blur', this.pauseClock.bind(this), false);
  window.addEventListener('keydown', this.keyboardInput.bind(this), false);
};
