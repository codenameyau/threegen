/*-------JSHint Directive---------*/
/* global ThreeGen                */
/* global levelAlphaTest          */
/*--------------------------------*/
'use strict';


/***********************
 * Game Initialization *
 ***********************/
var engine = new ThreeGen();
engine.start();

// Load resources and level
engine.loadLevel(levelAlphaTest);
