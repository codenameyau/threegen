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
var lightAmbient = new THREE.HemisphereLight(0x8c8cac, 0x7c7c7c, 0.5);
engine.scene.add(lightAmbient);

var lightSource = new THREE.DirectionalLight( 0x888888 );
lightSource.position.set(0, 0.2, 0.5);
engine.scene.add(lightSource);

// Enable floor grid
engine.enableFloorGrid(140, 10, 0x22AA22);

// Define crate properties
var smallBoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
var crateTexture = engine.loadTexture('crate-small.jpg');
var smallCrate = new THREE.Mesh( smallBoxGeometry, crateTexture );
var mediumCrate = new THREE.Mesh( mediumBoxGeometry, crateTexture );

// Add crates entities
var crate = engine.addEntity(smallCrate, {posX: 0, posZ: 20});
engine.addEntity(smallCrate.clone(), {posX: 20, posY: 40});
engine.addEntity(mediumCrate, {posX: -20, posY: 40});
engine.setPlayer(crate);

// Load android model and set it to player
// var modelName = 'android';
// engine.loadModel(modelName, 'android-animation.js', function() {
//   var settings = {posY: 0, posZ: -20, base: 0};
//   engine.addEntity(engine.getModel(modelName), settings);
// });
