/*-------JSHint Directive-------------*/
/* global THREE, ThreeGen, Stats, dat */
/*------------------------------------*/
'use strict';



/***********************
 * Rendering Functions *
 ***********************/
function renderScene(renderer, scene, camera) {
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
  this.scene = new THREE.Scene();
  window.addEventListener('resize', resizeWindow, false);

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
  for (var k in settings.ORBIT_CONTROLS) {this.controls[k] = settings.ORBIT_CONTROLS[k];}
  this.controls.addEventListener('change', renderScene);

  // Initialize: FPS/ms moniter
  this.stats = new Stats();
  this.stats.setMode(0); // 0 -> fps, 1 -> ms
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.bottom = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);

  // Initialize: Dat gui
  this.gui = new dat.GUI( {height: 5 * 32 - 1} );

  // Custom code
  var lightAmbient = new THREE.AmbientLight(0x666666);
  this.scene.add(lightAmbient);

  // Example: basic floor grid
  this.scene.add(this.floorGrid(20, 2));
  console.log(this);

  // Run scene
  renderScene(this.renderer, this.scene, this.camera);
};

// Adds player entity which camera follows
ThreeGen.prototype.setPlayer = function(object) {
  console.log(this);
  console.log(object);
  this.scene.add(object);
};
