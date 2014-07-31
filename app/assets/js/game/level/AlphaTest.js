/*-------JSHint Directive---------*/
/* global THREE                   */
/* exported levelAlphaTest        */
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
      'lab-theme' : 'music/lab.ogg',
    },

  },


  // Part 2: Code your level
  level : function(engine) {
    var lightAmbient = new THREE.HemisphereLight(0x8c8cac, 0x7c7c7c, 0.5);
    engine.scene.add(lightAmbient);

    var lightSource = new THREE.DirectionalLight( 0x888888 );
    lightSource.position.set(0, 0.2, 0.5);
    engine.scene.add(lightSource);

    // Enable floor grid (scene, size, gridsize, color)
    engine.debug.enableFloorGrid(engine.scene, 200, 10, 0x22AA22);

    // Define crate properties
    var smallBoxGeometry = new THREE.BoxGeometry(6, 6, 6);
    var mediumBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var crateTexture = engine.loadTexture('crate-small.jpg');
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
    bunny.position.set(0, 1.5, 0);
    var bunnyEntity = engine.Entity(bunny,
      {posZ: 100, width: 5, height: 5, length: 5, health: 50});
    engine.addEntity(bunnyEntity);
    engine.setPlayer(bunnyEntity);

    // Mouse input: snowball
    var snowballMesh = new THREE.Mesh(bunnySphere, bunnyMaterial);
    engine.mouseClickListener(function(event) {
      var projector = new THREE.Projector();
      var mouseVector = new THREE.Vector3();
      mouseVector.x = 2 * (event.clientX / window.innerWidth) - 1;
      mouseVector.y = 1 - 2 * ( event.clientY / window.innerHeight );

      var raycaster = projector.pickingRay( mouseVector.clone(), engine.camera );
      var raydirection = raycaster.ray.direction;
      raydirection.y = mouseVector.y;

      var pos = engine.player.position;
      var velocity = 100;
      var snowball = engine.Entity(snowballMesh.clone(),
        {posX: pos.x, posY: pos.y+5, posZ: pos.z, base: 1});
      engine.addProjectile(snowball, velocity, raydirection, {health: -10});
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
