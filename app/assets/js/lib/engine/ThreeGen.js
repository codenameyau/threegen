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
  this.updatePlayer();
  this.applyPhysics();
  this.camera.update();
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

ThreeGen.prototype.hasProperty = function(object, property, value) {
  if (object && typeof object[property] !== 'undefined') {value = object[property];}
  return value;
};

ThreeGen.prototype.enableFloorGrid = function(lines, steps, gridColor) {
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
  this.scene.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces));
};

/****************************
 * Physics Engine Functions *
 ****************************/
ThreeGen.prototype.enablePhysics = function() {
  this.gravity = this.settings.PHYSICS.gravity;
};

ThreeGen.prototype.applyPhysics = function() {
  // Apply gravity
  // for (var item in this.entities) {
  //   var entity = this.entities[item];

  //   // Update positions of movable objects
  //   if (entity.collision > 0) {

  //     // Object is falling -> update position
  //     if (entity.mesh.position.y > 0) {
  //       entity.mesh.position.x += entity.velocity.x;
  //       entity.mesh.position.y += entity.velocity.y;
  //       entity.mesh.position.z += entity.velocity.z;
  //     }

  //     // Object hits ground -> delete
  //     else {
  //       this.destroy(item);
  //       continue;
  //     }

  //     // Increase acceleration
  //     entity.velocity.x += entity.acceleration.x * this.delta;
  //     entity.velocity.y += entity.acceleration.y * this.delta;
  //     entity.velocity.z += entity.acceleration.z * this.delta;

  //   }
  // }

};

/*************************
 * Core Engine Functions *
 *************************/
ThreeGen.prototype.updatePlayer = function() {
  var moveDistance  = this.settings.PLAYER.movementSpeed * this.delta;
  var rotationAngle = this.settings.PLAYER.rotationSpeed * this.delta;

  // Keyboard event handlers
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
  if (this.keyboard.pressed('space')) {
    this.player.position.y += 1;
  }

  // Update children of player
};


/******************
 * Public Methods *
 ******************/
ThreeGen.prototype.addToDOM = function(object) {
  var container = document.getElementById(this.settings.META.domElement);
  container.appendChild(object);
};

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

  // Check to enable floor grid
  if (this.settings.META.floorGrid) {
    this.enableFloorGrid(80, 5, 0x22AA22);
  }

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
  this.stats.setMode(this.settings.META.statsMode); // 0 -> fps, 1 -> ms
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top = '0px';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);

  // Setup entities
  this.entities = [];

  // Setup physics
  this.enablePhysics();

  // Custom code
  var lightAmbient = new THREE.AmbientLight(0x666666);
  this.scene.add(lightAmbient);

  // Run scene
  this.renderScene();
  this.animateScene();
};


ThreeGen.prototype.addEntity = function(object, options) {

  // Default velocity (x,y,z)
  var vX = this.hasProperty(options, 'vX', 0);
  var vY = this.hasProperty(options, 'vY', 0);
  var vZ = this.hasProperty(options, 'vZ', 0);

  // Default acceleration (x,y,z)
  var aX = this.hasProperty(options, 'aX', 0);
  var aY = this.hasProperty(options, 'aY', this.gravity);
  var aZ = this.hasProperty(options, 'aZ', 0);

  // Extend Threejs object
  object.velocity = new THREE.Vector3(vX, vY, vZ);
  object.acceleration = new THREE.Vector3(aX, aY, aZ);
  object.collision = this.hasProperty(options, 'collision', 1);

  // Define entity properties
  this.entities.push(object);

  // Add entity to scene
  this.scene.add(object);
};


ThreeGen.prototype.setPlayer = function(object, options) {
  // Bind player to object
  this.player = new THREE.Object3D();
  this.player.add(object);
  this.addEntity(this.player);

  // Focus target cam on player
  var view = this.settings.CAMERA;
  this.camera.addTarget({
    name: 'player',
    targetObject: this.player,
    cameraPosition: new THREE.Vector3(view.distX, view.distY, view.distZ),
    fixed: false,
    stiffness: 0.1,
    matchRotation: true
  });
  this.camera.setTarget('player');
};
