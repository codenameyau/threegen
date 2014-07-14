/*-------JSHint Directive---------*/
/* global THREE, THREEx           */
/* global ThreeGen, Stats         */
/*--------------------------------*/
'use strict';


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
  window.addEventListener('resize', this.resizeWindow.bind(this), false);

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

  // Initialize: Clock
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();

  // Initialize: Threejs Renderer
  this.renderer = new THREE.WebGLRenderer(settings.RENDERER);
  this.renderer.setSize(canvasWidth, canvasHeight);
  this.addToDOM(this.renderer.domElement);

  // Initialize: Keyboard controls
  this.keyboard = new THREEx.KeyboardState();

  // Initialize: FPS/ms moniter
  this.stats = new Stats();
  this.stats.setMode(this.settings.META.statsMode); // 0 -> fps, 1 -> ms
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);

  // Initialize: JSON loader
  this.jsonLoader = new THREE.JSONLoader();

  // Setup entities
  this.entities = {};
  this.entityCount = 0;

  // Setup physics
  this.enablePhysics();

  // Custom code
  var lightAmbient = new THREE.AmbientLight(0x666666);
  this.scene.add(lightAmbient);

  // Run scene
  this.renderScene();
  this.animateScene();
};




ThreeGen.prototype.addModel = function(modelFile) {
  var filePath = this.settings.PATHS.models + modelFile;

  // var callbackModel = function(geometry, materials, engine) {
  //   var material = new THREE.MeshFaceMaterial(materials);
  //   for (var i = 0; i < materials.length; i++) {materials[i].morphTargets = true;}
  //   var model = new THREE.Mesh(geometry, material);
  //   engine.scene.add(model);
  // };
  // var addModel = function(filePath, engine) {
  //   loader(filePath, callback);
  // };
  // addModel(filePath, this);

};
