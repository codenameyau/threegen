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

// Enable floor grid (size, gridsize, color)
engine.enableFloorGrid(200, 10, 0x22AA22);

// Define crate properties
var smallBoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
var crateTexture = engine.loadTexture('crate-small.jpg');
var smallCrate = new THREE.Mesh( smallBoxGeometry, crateTexture );
var mediumCrate = new THREE.Mesh( mediumBoxGeometry, crateTexture );

// Add crates entities
engine.addEntity(smallCrate.clone(), {posX: 20, posY: 40, posZ: 30});
engine.addEntity(smallCrate.clone(), {posX:  0, posY: 60, posZ: 20});
engine.addEntity(mediumCrate.clone(), {posX: 0, posY: 60, posZ: 20});

// Add random small crates
for (var i=0; i<10; i++) {
  engine.addEntity(smallCrate.clone(), {
    posX: engine.randNumber(-25, 25),
    posY: engine.randNumber(0, 250),
    posZ: engine.randNumber(-25, 25)
  });
}

// Add random medium crates
for (var i=0; i<4; i++) {
  engine.addEntity(mediumCrate.clone(), {
    posX: engine.randNumber(-20, 20),
    posY: engine.randNumber(0, 100),
    posZ: engine.randNumber(-20, 20)
  });
}


// Create bunny
var bunny = new THREE.Object3D();
var bunnySphere = new THREE.SphereGeometry(1, 16, 16);
var bunnyMaterial = new THREE.MeshLambertMaterial({color: 0xFAFAFA});
var bunnyHead = new THREE.Mesh(bunnySphere, bunnyMaterial);
var bunnyBody = new THREE.Mesh(bunnySphere, bunnyMaterial);
var bunnyTail = new THREE.Mesh(bunnySphere, bunnyMaterial);
var bunnyEarL = new THREE.Mesh(bunnySphere, bunnyMaterial);
var bunnyEarR = new THREE.Mesh(bunnySphere, bunnyMaterial);
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
var bunnyEntity = engine.addEntity(bunny, {posZ: 120, width: 5, height: 3, length: 10});
engine.setPlayer(bunnyEntity);

// Load android model and set it to player
// var modelName = 'android';
// engine.loadModel(modelName, 'android-animation.js', function() {
//   var android = engine.addEntity(engine.getModel(modelName),
//     {posY: 0, height: 10});
//   // engine.setPlayer(android);
// });
