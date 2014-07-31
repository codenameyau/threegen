/*-------JSHint Directive---------*/
/* global THREE, THREEx, ThreeGen */
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

  // Initialize: Internal Clock
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();

  // Initialize: Threejs Scene
  this.scene = new THREE.Scene();

  // Initialize: Threejs Renderer
  this.renderer = new THREE.WebGLRenderer(settings.RENDERER);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.utils.addToDOM(this.settings.META.domElement, this.renderer.domElement);
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

  // Initialize: JSON loader
  this.jsonLoader = new THREE.JSONLoader();

  // Initialize: Event listeners
  this._initializeEventListeners();

  // Initialize: HUD
  this._initializeHUD();

  // Initialize: data structures
  this._initializeDataStructures();

  // Setup physics
  this._initializeDirections();
  this._initializePhysics();

  // Run scene
  this.updateScene();
};


ThreeGen.prototype.loadLevel = function(gameLevel) {
  var error = false;
  if (!gameLevel.resources) {
    console.error('Error: You must define the resources for this level!');
    error = true;
  }
  if (!gameLevel.level) {
    console.error('Error: You must define a callback function for your level');
    error = true;
  }
  if (error) {return;}
  this.preloadResources(gameLevel.resources, gameLevel.level.bind(this));
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
  this.HUD.paused.style.display = 'none';
  this.renderer.running = true;
  this.resumeClock();
  window.requestAnimationFrame(this.updateScene.bind(this));
};


ThreeGen.prototype.pauseGame = function() {
  this.HUD.paused.style.display = 'block';
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


ThreeGen.prototype.mouseClickListener = function(callback) {
  window.addEventListener('click', callback.bind(this), false);
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
 * Core Engine Internal Startup *
 ********************************/
ThreeGen.prototype._initializeEventListeners = function() {
  window.addEventListener('resize', this.resizeWindow.bind(this), false);
  window.addEventListener('focus', this.resumeClock.bind(this), false);
  window.addEventListener('blur', this.pauseClock.bind(this), false);
  window.addEventListener('keydown', this.keyboardInput.bind(this), false);
};


ThreeGen.prototype._initializeHUD = function() {
  this.HUD = {};
  if (this.settings.HUD.FPS.enabled) { this.enableStatsMoniter(); }
  if (this.settings.HUD.HELP.enabled) { this.enableInstructionsHUD(); }
  if (this.settings.HUD.PAUSE.enabled) { this.enablePausedHUD(); }
};


ThreeGen.prototype._initializeDataStructures = function() {
  this.models = {};
  this.entities = [];
  this.projectiles = [];
};


ThreeGen.prototype._initializePhysics = function() {
  this.gravity = this.settings.PHYSICS.gravity;
  this.airFriction = 0.5;
};


ThreeGen.prototype._initializeDirections = function() {

  // For collision detection
  var directionVectors = {
    front : [
      new THREE.Vector3( 0,  0, -1 ),
      new THREE.Vector3( 1,  1, -1 ),
      new THREE.Vector3( 1,  0, -1 ),
      new THREE.Vector3( 1, -1, -1 ),
      new THREE.Vector3( 0, -1, -1 ),
      new THREE.Vector3(-1, -1, -1 ),
      new THREE.Vector3(-1,  0, -1 ),
      new THREE.Vector3(-1,  1, -1 ),
      new THREE.Vector3( 0,  1, -1 ),
    ],

    back : [
      new THREE.Vector3( 0,  0,  1 ),
      new THREE.Vector3( 1,  1,  1 ),
      new THREE.Vector3( 1,  0,  1 ),
      new THREE.Vector3( 1, -1,  1 ),
      new THREE.Vector3( 0, -1,  1 ),
      new THREE.Vector3(-1, -1,  1 ),
      new THREE.Vector3(-1,  0,  1 ),
      new THREE.Vector3(-1,  1,  1 ),
      new THREE.Vector3( 0,  1,  1 ),
    ],

    left : [
      new THREE.Vector3(-1,  0,  0 ),
    ],

    right : [
      new THREE.Vector3( 1,  0,  0 ),
    ],

    up : [
      new THREE.Vector3( 0,  1,  0 ),
      new THREE.Vector3( 1,  1, -1 ),
      new THREE.Vector3( 1,  1,  0 ),
      new THREE.Vector3( 1,  1,  1 ),
      new THREE.Vector3( 0,  1,  1 ),
      new THREE.Vector3(-1,  1,  1 ),
      new THREE.Vector3(-1,  1,  1 ),
      new THREE.Vector3(-1,  1, -1 ),
      new THREE.Vector3( 0,  1, -1 ),
    ],

    down : [
      new THREE.Vector3( 0, -1,  0 ),
      new THREE.Vector3( 1, -1, -1 ),
      new THREE.Vector3( 1, -1,  0 ),
      new THREE.Vector3( 1, -1,  1 ),
      new THREE.Vector3( 0, -1,  1 ),
      new THREE.Vector3(-1, -1,  1 ),
      new THREE.Vector3(-1, -1,  1 ),
      new THREE.Vector3(-1, -1, -1 ),
      new THREE.Vector3( 0, -1, -1 ),
    ],
  };

  // Bind directions to engine
  this.directions = {
    vectors : directionVectors,
    front   : directionVectors.front[0],
    back    : directionVectors.back[0],
    left    : directionVectors.left[0],
    right   : directionVectors.right[0],
    up      : directionVectors.up[0],
    down    : directionVectors.down[0],
  };
};
