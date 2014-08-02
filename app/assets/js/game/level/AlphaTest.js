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

    // Import Entities
    var BunnyModule = require('../entity/BunnyEntity');
    var CrateEntity = require('../entity/CrateEntity');
    var BunnyEntity = BunnyModule.BunnyEntity;
    var SnowballProjectile = BunnyModule.SnowballProjectile;

    // Define Level lighting
    var lightAmbient = new THREE.HemisphereLight(0x8c8cac, 0x7c7c7c, 0.5);
    engine.scene.add(lightAmbient);
    var lightSource = new THREE.DirectionalLight( 0x888888 );
    lightSource.position.set(0, 0.2, 0.5);
    engine.scene.add(lightSource);

    // Enable floor grid (scene, size, gridsize, color)
    engine.debug.enableFloorGrid(engine.scene, 200, 10, 0x22AA22);

    // Play music theme
    engine.playMusic('labtheme');

    // Add crates entities
    var crateA = new CrateEntity(engine, {posX: 0, posY: 20, posZ: 60});
    var crateB = new CrateEntity(engine, {posX:  0, posY: 80, posZ: 20});
    var crateC = new CrateEntity(engine, {posX: 0, posY: 40, posZ: 20});
    engine.addEntity(crateA);
    engine.addEntity(crateB);
    engine.addEntity(crateC);

    // Add bunny entity and set to player
    var bunny = new BunnyEntity(engine,
      {posZ: 100, width: 5, height: 5, length: 5, health: 50, frontSpeed: 150, rotationMultiplier: 2.0});
    engine.addEntity(bunny);
    engine.setPlayer(bunny);
    // Mouse input: create snowball projectile
    engine.mouseClickListener(function(event) {

      // (1) Create entity
      var pos = engine.player.position;
      var snowball = new SnowballProjectile(engine,
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
