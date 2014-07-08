/*-------JSHint Directive-------------*/
/* global THREE, ThreeGen, Stats, dat */
/*------------------------------------*/
'use strict';


/********************
 * Global Variables *
 ********************/
var scene, camera, renderer;
var controls, stats, gui;


/***********************
 * Rendering Functions *
 ***********************/
function renderScene() {
  renderer.render(scene, camera);
}

function updateScene() {
  stats.update();
  controls.update();
}

function animateScene() {
  window.requestAnimationFrame(animateScene);
  renderScene();
  updateScene();
}

function resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


/*********************
 * Utility Functions *
 *********************/
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
  scene = new THREE.Scene();
  window.addEventListener('resize', resizeWindow, false);

  // Initialize: Threejs Camera
  camera = new THREE.PerspectiveCamera(
    settings.CAMERA.fov,
    aspectRatio,
    settings.CAMERA.near,
    settings.CAMERA.far
  );
  camera.position.set(
    settings.CAMERA.zoomX,
    settings.CAMERA.zoomY,
    settings.CAMERA.zoomZ
  );
  camera.lookAt(scene.position);
  scene.add(camera);

  // Initialize: Threejs Renderer
  renderer = new THREE.WebGLRenderer(settings.RENDERER);
  renderer.setSize(canvasWidth, canvasHeight);
  this.addToDOM(renderer.domElement);

  // Initialize: Orbit Controls
  controls = new THREE.OrbitControls(camera);
  for (var k in settings.ORBIT_CONTROLS) {controls[k] = settings.ORBIT_CONTROLS[k];}
  controls.addEventListener('change', renderScene);

  // Initialize: FPS/ms moniter
  stats = new Stats();
  stats.setMode(0); // 0 -> fps, 1 -> ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  this.addToDOM(stats.domElement);

  // Initialize: Dat gui
  gui = new dat.GUI( {height: 5 * 32 - 1} );

  // Custom code
  var lightAmbient = new THREE.AmbientLight(0x666666);
  scene.add(lightAmbient);

  // Example: basic floor grid
  scene.add(this.floorGrid(20, 2));

  // Example: crate with texture
  var floorCrate = this.basicCrate(5);
  scene.add(floorCrate);

  // Run scene
  renderScene();
  animateScene();
};

// Adds player entity which camera follows
ThreeGen.prototype.setPlayer = function(object) {
  console.log(stats);
  console.log(object);
  scene.add(object);
};
