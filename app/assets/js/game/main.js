/*-------JSHint Directives-----*/
/* global THREE, ThreeGen      */
/*-----------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();
engine.start();

// Create crate
var playerSettings = {height: 5, width: 5, length: 5};
var textureImage = engine.settings.PATHS.textures + 'crate-small.jpg';
var geometry = new THREE.BoxGeometry( playerSettings.width, playerSettings.height, playerSettings.length );
var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
var crate = new THREE.Mesh( geometry, crateMaterial );

// Add crate to scene and set it be the player
var entity = engine.addEntity(crate, playerSettings);
engine.setPlayer(entity.entityID);
