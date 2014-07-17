/*-------JSHint Directives-----*/
/* global THREE, ThreeGen      */
/*-----------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();
engine.start();

// Add Lighting
var lightAmbient = new THREE.AmbientLight(0x9a9a9a);
engine.scene.add(lightAmbient);

// Enable floor grid
engine.enableFloorGrid(120, 5, 0x22AA22);

// Define crate properties
var smallBoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
var crateTexture = engine.loadTexture('crate-small.jpg');
var smallCrate = new THREE.Mesh( smallBoxGeometry, crateTexture );
var mediumCrate = new THREE.Mesh( mediumBoxGeometry, crateTexture );

// Add crates entities
engine.addEntity(smallCrate, {posX: 0, posZ: 20});
engine.addEntity(smallCrate.clone(), {posX: 20, posY: 40});
engine.addEntity(mediumCrate, {posX: -20, posY: 40});

// Load android model and set it to player
var modelName = 'android';
engine.loadModel(modelName, 'android-animation.js', function() {
  var settings = {animated: true, posY: 0, base: 0, scaleY: 0.5, scaleX: 0.5, scaleZ: 0.5};
  var android = engine.addEntity(engine.getModel(modelName), settings);
  engine.setPlayer(android);
});
