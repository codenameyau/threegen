/*-------JSHint Directive---------*/
/* global THREE, THREEx           */
/* global ThreeGen, Stats         */
/*--------------------------------*/
'use strict';


/***********************
 * Rendering Functions *
 ***********************/
ThreeGen.prototype.renderScene = function() {
  this.renderer.render(this.scene, this.camera);
};

ThreeGen.prototype.updateScene = function() {
  this.stats.update();
  this.delta = this.clock.getDelta();

  // Check for keyboard
  this.updatePlayer();

};

ThreeGen.prototype.animateScene = function() {
  window.requestAnimationFrame(this.animateScene.bind(this));
  this.updateScene();
  this.renderScene();
};

ThreeGen.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};


/*********************
 * Utility Functions *
 *********************/
ThreeGen.prototype.degToRad = function(degrees) {
  return Math.PI/180 * degrees;
};

ThreeGen.prototype.floorGrid = function(lines, steps, gridColor) {
  lines = lines || 20;
  steps = steps || 2;
  gridColor = gridColor || 0xFFFFFF;
  var floorGrid = new THREE.Geometry();
  var gridLine = new THREE.LineBasicMaterial( {color: gridColor} );
  for (var i = -lines; i <= lines; i += steps) {
    floorGrid.vertices.push(new THREE.Vector3(-lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, -lines));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, lines));
  }
  return new THREE.Line(floorGrid, gridLine, THREE.LinePieces);
};


/*************************
 * Core Engine Functions *
 *************************/
ThreeGen.prototype.updatePlayer = function() {
  var moveDistance = 20 * this.delta;
  var rotationAngle = Math.PI / 1.5 * this.delta;

  if (this.keyboard.pressed('w')) {
    this.player.translateZ(-moveDistance);
  }
  if (this.keyboard.pressed('s')) {
    this.player.translateZ(moveDistance);
  }
  if (this.keyboard.pressed('a')) {
    this.player.rotation.y += rotationAngle;
  }
  if (this.keyboard.pressed('d')) {
    this.player.rotation.y -= rotationAngle;
  }
  // Update player chase-cam
  // var relativeCameraOffset = new THREE.Vector3(
  //   this.settings.CAMERA.zoomX,
  //   this.settings.CAMERA.zoomY,
  //   this.settings.CAMERA.zoomZ);
  // var cameraOffset = relativeCameraOffset.applyMatrix4(this.player.matrixWorld);
  // this.camera.position.x = cameraOffset.x;
  // this.camera.position.y = cameraOffset.y;
  // this.camera.position.z = cameraOffset.z;
  // this.camera.lookAt( this.player.position );

  // Update children of player
};


/******************
 * Public Methods *
 ******************/
ThreeGen.prototype.addToDOM = function(object) {
  var container = document.getElementById(this.settings.META.domElement);
  container.appendChild(object);
};

// Starts engine and render scene
ThreeGen.prototype.start = function() {
  // Initialize: Load settings
  var settings = this.settings;
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var aspectRatio  = canvasWidth/canvasHeight;

  // Initialize: Threejs Scene
  this.scene = new THREE.Scene();
  window.addEventListener('resize', this.resizeWindow.bind(this), false);

  // Initialize: Threejs Camera
  this.camera = new THREE.PerspectiveCamera(
    settings.CAMERA.fov,
    aspectRatio,
    settings.CAMERA.near,
    settings.CAMERA.far
  );
  this.camera.position.set(
    settings.CAMERA.zoomX,
    settings.CAMERA.zoomY,
    settings.CAMERA.zoomZ
  );
  this.camera.lookAt(this.scene.position);
  this.scene.add(this.camera);

  // Initialize: Clock
  this.clock = new THREE.Clock();
  this.delta = this.clock.getDelta();

  // Initialize: Threejs Renderer
  this.renderer = new THREE.WebGLRenderer(settings.RENDERER);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.addToDOM(this.renderer.domElement);

  // Initialize: Keyboard controls
  this.keyboard = new THREEx.KeyboardState();

  // Initialize: FPS/ms moniter
  this.stats = new Stats();
  this.stats.setMode(0); // 0 -> fps, 1 -> ms
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.bottom = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);

  // Custom code
  var lightAmbient = new THREE.AmbientLight(0x666666);
  this.scene.add(lightAmbient);
  this.scene.add(this.floorGrid(60, 4));

  // Run scene
  this.renderScene();
  this.animateScene();
};

// Adds player entity which camera follows
ThreeGen.prototype.setPlayer = function(object, s) {
  this.scene.add(object);
  this.player = object;
  this.player.position.set(s.posX, s.posY+s.height/2, s.posZ);
};
