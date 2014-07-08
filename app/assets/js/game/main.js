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
engine.enableFloorGrid(80, 5, 0x33FF33);

// Create box as player
var playerSettings = {height: 5, width: 5, length: 5, posX: 0, posY: 0, posZ: 0};
var textureImage = engine.settings.PATHS.textures + 'crate-small.jpg';
var geometry = new THREE.BoxGeometry( playerSettings.width, playerSettings.height, playerSettings.length );
var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
var crate = new THREE.Mesh( geometry, crateMaterial );
engine.setPlayer(crate, playerSettings);
