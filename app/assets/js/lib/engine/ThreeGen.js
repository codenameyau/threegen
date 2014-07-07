/*-------JSHint Directive-------------*/
/* global THREE, ThreeGen, Stats, dat */
/*------------------------------------*/
'use strict';


/********************
 * Global Variables *
 ********************/


/*********************
 * Utility Functions *
 *********************/

function basicFloorGrid(lines, steps, gridColor) {
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
}

function basicCrate(size) {
  size = size || 5;
  var textureImage = 'assets/js/game/res/texture/crate-small.jpg';
  var geometry = new THREE.BoxGeometry( size, size, size );
  var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
  var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
  var crate = new THREE.Mesh( geometry, crateMaterial );
  return crate;
}

/***********************
 * Rendering Functions *
 ***********************/

// function renderScene() {
//   renderer.render( scene, camera );
// }

// function updateScene() {
//   stats.update();
//   controls.update();
// }

// function animateScene() {
//   window.requestAnimationFrame( animateScene );
//   renderScene();
//   updateScene();
// }

ThreeGen.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};

ThreeGen.prototype.addToDOM = function(object) {
  var container = document.getElementById('canvas-body');
  container.appendChild(object);
};

/******************
 * Public Methods *
 ******************/
ThreeGen.prototype.start = function() {

  // Initialize: Load settings
  var settings = this.settings;
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var aspectRatio  = canvasWidth/canvasHeight;

  // Initialize: Threejs Scene
  this.scene = new THREE.Scene();
  window.addEventListener('resize', this.resizeWindow, false);

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

  // Initialize: Threejs Renderer
  this.renderer = new THREE.WebGLRenderer(settings.RENDERER);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.addToDOM(this.renderer.domElement);

  // Initialize: Orbit Controls
  this.controls = new THREE.OrbitControls(this.camera);
  for (var k in settings.CONTROLS) {this.controls[k] = settings.CONTROLS[k];}
  this.controls.addEventListener('change', this.renderScene);

  // Initialize: FPS/ms moniter
  this.stats = new Stats();
  this.stats.setMode(0); // 0 -> fps, 1 -> ms
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.bottom = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);

  // Initialize: Dat gui
  this.gui = new dat.GUI( {height: 5 * 32 - 1} );


};







/************************
 * Scene Initialization *
 ************************/

// function initializeScene() {

  /***************
   * Custom Code *
   ***************/

  // Example: light sources
  // var lightAmbient = new THREE.AmbientLight(0x666666);
  // var lightSource = new THREE.PointLight(0x888888);
  // lightSource.position.set(0, 50, 80);
  // scene.add(lightAmbient);
  // scene.add(lightSource);

  // // Example: basic floor grid
  // scene.add(basicFloorGrid(20, 2));

  // // Example: crate with texture
  // var crateSize = 5;
  // crate = basicCrate(crateSize);
  // crate.position.set(0, crateSize/2, 0);
  // scene.add(crate);

// }
