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

// Add crates entities
var crate = new THREE.Mesh( smallBoxGeometry, crateTexture );
engine.addEntity(crate, {posX: 0, posZ: 20});

var crate2 = new THREE.Mesh( smallBoxGeometry, crateTexture );
engine.addEntity(crate2, {posX: 20, posY: 40});

var crate3 = new THREE.Mesh( mediumBoxGeometry, crateTexture );
engine.addEntity(crate3, {posX: -20, posY: 40});

// Android model (file, model name)
var settings = {posZ : -40};
engine.loadModel('android', 'android-animation.js', engine.addModelEntity, settings);
