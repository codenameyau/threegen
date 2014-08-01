(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*-------JSHint Directive---------*/
/* global THREE                   */
/*--------------------------------*/
'use strict';


module.exports = function(engine) {
  // [TODO] Separate entities from levels
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
  bunny.position.set(0, 1.5, 0);

  // Create ThreeGen Entity
  return engine.Entity(bunny, {
    posZ: 100,
    width: 5,
    height: 5,
    length: 5,
    health: 50,
    frontSpeed: 150,
    rotationMultiplier: 2.0
  });
};

},{}],2:[function(require,module,exports){
/*-------JSHint Directive---------*/
/* global THREE                   */
/*--------------------------------*/
'use strict';


var levelAlphaTest = {

  // Part 1: Define resources
  resources : {

    texture : {
      'crate' : 'crate-small.jpg',
    },

    model : {
      'android' : 'android-animation.js',
    },

    sound : {
      'jump' : 'effects/jump.ogg',
    },

    music : {
      'labtheme' : 'labtheme.ogg',
    },

  },


  // Part 2: Code your level
  level : function(engine) {

    var BunnyEntity = require('../entity/BunnyEntity.js');

    var lightAmbient = new THREE.HemisphereLight(0x8c8cac, 0x7c7c7c, 0.5);
    engine.scene.add(lightAmbient);

    var lightSource = new THREE.DirectionalLight( 0x888888 );
    lightSource.position.set(0, 0.2, 0.5);
    engine.scene.add(lightSource);

    // Enable floor grid (scene, size, gridsize, color)
    engine.debug.enableFloorGrid(engine.scene, 200, 10, 0x22AA22);

    // Play music theme
    engine.playMusic('labtheme');

    // Define crate properties
    var smallBoxGeometry = new THREE.BoxGeometry(6, 6, 6);
    var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var crateTexture = engine.getTexture('crate');
    var smallCrate = new THREE.Mesh( smallBoxGeometry, crateTexture );
    var mediumCrate = new THREE.Mesh( mediumBoxGeometry, crateTexture );

    // Add crates entities
    var crateA = engine.Entity(smallCrate.clone(), {posX: 0, posY: 20, posZ: 60});
    var crateB = engine.Entity(smallCrate.clone(), {posX:  0, posY: 80, posZ: 20});
    var crateC = engine.Entity(mediumCrate.clone(), {posX: 0, posY: 40, posZ: 20});
    engine.addEntity(crateA);
    engine.addEntity(crateB);
    engine.addEntity(crateC);

    // Add random medium crates
    // for (var i=0; i<5; i++) {
    //   var newCrate = engine.Entity(mediumCrate.clone(), {
    //     posX: engine.utils.randNumber(-20, 20),
    //     posY: engine.utils.randNumber(0, 100),
    //     posZ: engine.utils.randNumber(-20, 20)
    //   });
    //   engine.addEntity(newCrate);
    // }

    var bunny = new BunnyEntity(engine);
    engine.addEntity(bunny);
    engine.setPlayer(bunny);

    // Mouse input: create snowball projectile
    var sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
    var snowMaterial = new THREE.MeshLambertMaterial({color: 0xFAFAFA});
    var snowballMesh = new THREE.Mesh(sphereGeometry, snowMaterial);
    engine.mouseClickListener(function(event) {

      // (1) Create entity
      var pos = engine.player.position;
      var snowball = engine.Entity(snowballMesh.clone(),
        {posX: pos.x, posY: pos.y+5, posZ: pos.z, base: 1});

      // (2) Specifiy projectile parameters
      var parameters = {
        direction : engine.getMouseVector(event),
        velocity : 120,
        effects : {health: -10},
      };

      // (3) Invoke launch projectile with callback
      engine.launchProjectile(snowball, parameters, function() {
        engine.playSound('jump');
      });
    });

    // Load android model and set it to player
    // var modelName = 'android';
    // engine.loadModel(modelName, 'android-animation.js', function() {
    //   var android = engine.addEntity(engine.getModel(modelName),
    //     {posY: 0, height: 10, base: 0});
    //   // engine.setPlayer(android);
    // });
  },

};

module.exports = levelAlphaTest;

},{"../entity/BunnyEntity.js":1}],3:[function(require,module,exports){
/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


// Browserify is optional, but recommended
var levelAlphaTest = require('./level/AlphaTest.js');


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();
engine.start();

// Load resources and level
engine.loadLevel(levelAlphaTest);

},{"./level/AlphaTest.js":2}]},{},[3]);
