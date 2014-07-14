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
var settings = {animated: true};

// Android model
engine.addModel('android-animation.js', {posZ: -20});

// Create crate
var geometry = new THREE.BoxGeometry(5, 5, 5);
var crateTexture = engine.loadTexture('crate-small.jpg');
var crate = new THREE.Mesh( geometry, crateTexture );
var entityID = engine.addEntity(crate, settings);
engine.setPlayer(entityID);
