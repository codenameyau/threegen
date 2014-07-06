/*-------JSHint Directive-------------*/
/* global THREE, THREEGEN, Stats, dat */
/*------------------------------------*/
'use strict';


/********************
 * Global Variables *
 ********************/



/******************
 * Public Methods *
 ******************/
THREEGEN.prototype.Game = function() {

  // Initialize: Load settings
  var settings = THREEGEN.SETTINGS;

  // Initialize: Scene and window resize listener
  var initScene = function() {
    this.scene = new THREE.Scene();
    var canvasWidth  = window.innerWidth;
    var canvasHeight = window.innerHeight;
    window.addEventListener('resize', resizeWindow, false);
  };

  // Initialize: Threejs Camera
  var initScene = function() {
    var aspectRatio  = canvasWidth/canvasHeight;
    camera = new THREE.PerspectiveCamera( CAMERA.fov, aspectRatio, CAMERA.near, CAMERA.far );
    camera.position.set( CAMERA.zoomX, CAMERA.zoomY, CAMERA.zoomZ );
    camera.lookAt(scene.position);
    scene.add(camera);
  };

  // Threejs Essentials
  initScene();
  initCamera();
  initRenderer();

  // Third party plugins
  initControls();
  initStats();
  initGui();
};


/********************
 * Helper Utitilies *
 ********************/

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

function renderScene() {
  renderer.render( scene, camera );
}

function updateScene() {
  stats.update();
  controls.update();
}

function animateScene() {
  window.requestAnimationFrame( animateScene );
  renderScene();
  updateScene();
}

function resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addToDOM(object) {
  var container = document.getElementById('canvas-body');
  container.appendChild(object);
}


/************************
 * Scene Initialization *
 ************************/

function initializeScene() {


  // Camera and set initial view
  var aspectRatio  = canvasWidth/canvasHeight;
  camera = new THREE.PerspectiveCamera( CAMERA.fov, aspectRatio, CAMERA.near, CAMERA.far );
  camera.position.set( CAMERA.zoomX, CAMERA.zoomY, CAMERA.zoomZ );
  camera.lookAt(scene.position);
  scene.add(camera);

  // Add WebGL renderer to DOM
  renderer = new THREE.WebGLRenderer(RENDERER);
  renderer.setSize(canvasWidth, canvasHeight);
  addToDOM(renderer.domElement);


  /**********************
   * Initialize Plugins *
   **********************/

  // OrbitControls using mouse
  controls = new THREE.OrbitControls(camera);
  for (var key in CONTROLS) { controls[key] = CONTROLS[key]; }
  controls.addEventListener('change', renderScene);

  // Stats fps/ms box
  stats = new Stats();
  stats.setMode(0); // 0 -> fps, 1 -> ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  addToDOM(stats.domElement);

  // Dat gui (top right controls)
  gui = new dat.GUI( {height: 5 * 32 - 1} );


  /***************
   * Custom Code *
   ***************/

  // Example: light sources
  var lightAmbient = new THREE.AmbientLight(0x666666);
  var lightSource = new THREE.PointLight(0x888888);
  lightSource.position.set(0, 50, 80);
  scene.add(lightAmbient);
  scene.add(lightSource);

  // Example: basic floor grid
  scene.add(basicFloorGrid(20, 2));

  // Example: crate with texture
  var crateSize = 5;
  crate = basicCrate(crateSize);
  crate.position.set(0, crateSize/2, 0);
  scene.add(crate);

}


/**********************
 * Render and Animate *
 **********************/

initializeScene();
animateScene();
