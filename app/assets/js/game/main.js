/*-------JSHint Directives-----*/
/* global THREE, ThreeGen      */
/*-----------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();
engine.start();

// Enable floor grid
engine.enableFloorGrid(120, 5, 0x22AA22);

// Create crate
var playerSettings = {height: 12, width: 5, length: 5};
var textureImage = engine.settings.PATHS.textures + 'crate-small.jpg';
var geometry = new THREE.BoxGeometry( playerSettings.width, playerSettings.height, playerSettings.length );
var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
var crate = new THREE.Mesh( geometry, crateMaterial );

// Add crate to scene and set it be the player
var entityID = engine.addEntity(crate, playerSettings);
engine.setPlayer(entityID);
