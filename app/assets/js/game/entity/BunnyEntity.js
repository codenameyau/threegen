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
