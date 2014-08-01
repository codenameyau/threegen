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

    // Import modules
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
