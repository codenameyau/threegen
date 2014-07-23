/*-------JSHint Directives-----*/
/* global THREE, ThreeGen      */
/*-----------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/

// [TODO] Full Three.js encapsulation
var engine = new ThreeGen();
engine.start();

// Add Lighting
var lightAmbient = new THREE.HemisphereLight(0x8c8cac, 0x7c7c7c, 0.5);
engine.scene.add(lightAmbient);

var lightSource = new THREE.DirectionalLight( 0x888888 );
lightSource.position.set(0, 0.2, 0.5);
engine.scene.add(lightSource);

// Enable floor grid (size, gridsize, color)
engine.enableFloorGrid(200, 10, 0x22AA22);

// Define crate properties
var smallBoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
var crateTexture = engine.loadTexture('crate-small.jpg');
var smallCrate = new THREE.Mesh( smallBoxGeometry, crateTexture );
var mediumCrate = new THREE.Mesh( mediumBoxGeometry, crateTexture );

// Add crates entities
var crate = engine.addEntity(smallCrate, {posX: -10, posZ: -15});
engine.addEntity(smallCrate.clone(), {posX: 20, posY: 40, posZ: -10});
engine.addEntity(smallCrate.clone(), {posX: 20, posY: 60, posZ: -10});
engine.addEntity(mediumCrate, {posX: -30, posY: 0, posZ: -30});
engine.setPlayer(crate);

// Create bunny
var bunny = new THREE.Object3D();
var bunnySphere = new THREE.SphereGeometry(1, 16, 16);
var bunnyHead = new THREE.Mesh(bunnySphere, crateTexture);
var bunnyBody = new THREE.Mesh(bunnySphere, crateTexture);
var bunnyTail = new THREE.Mesh(bunnySphere, crateTexture);
var bunnyEarL = new THREE.Mesh(bunnySphere, crateTexture);
var bunnyEarR = new THREE.Mesh(bunnySphere, crateTexture);
bunnyHead.scale.set(1.3, 1.3, 1.3);
bunnyBody.scale.set(1.5, 1.5, 1.8);
bunnyTail.scale.set(0.6, 0.6, 0.6);
bunnyEarL.scale.set(0.4, 1.2, 0.3);
bunnyEarR.scale.set(0.4, 1.2, 0.3);
bunnyEarL.rotation.set(0.2, 0, 0.2);
bunnyEarR.rotation.set(0.2, 0, -0.2);
bunnyHead.position.set(0, 2, -1.8);
bunnyTail.position.set(0, 1, 1.5);
bunnyEarL.position.set(-1, 4.2, -1.5);
bunnyEarR.position.set(1, 4.2, -1.5);
bunny.add(bunnyHead);
bunny.add(bunnyBody);
bunny.add(bunnyTail);
bunny.add(bunnyEarL);
bunny.add(bunnyEarR);
bunny.rotation.y = engine.degToRad(-180);
engine.scene.add(bunny);
// engine.addEntity(bunny);

// Load android model and set it to player
// var modelName = 'android';
// engine.loadModel(modelName, 'android-animation.js', function() {
//   var settings = {posY: 0, posZ: -20, base: 0};
//   var android = engine.addEntity(engine.getModel(modelName), settings);
//   engine.setPlayer(android);
// });
