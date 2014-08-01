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
