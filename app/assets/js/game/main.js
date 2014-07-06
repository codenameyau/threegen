/*-------JSHint Directives-----*/
/* global THREEGEN             */
/*-----------------------------*/
'use strict';


/********************
 * Global Variables *
 ********************/

// Built-in
var game;


/***********************
 * Game Initialization *
 ***********************/

function initializeGame() {

  game = new THREEGEN.Game();
  game.start();

}


/**********************
 * Render and Animate *
 **********************/
initializeGame();
