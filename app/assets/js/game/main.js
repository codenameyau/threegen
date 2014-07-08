/*-------JSHint Directives-----*/
/* global THREE, ThreeGen      */
/*-----------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();

// Create box
var size = 5;
var textureImage = engine.settings.PATHS.textures + 'crate-small.jpg';
var geometry = new THREE.BoxGeometry( size, size, size );
var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
var crate = new THREE.Mesh( geometry, crateMaterial );

engine.setPlayer(crate);
engine.start();
