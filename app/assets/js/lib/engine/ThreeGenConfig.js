/*************************************
 * ThreeGen - Settings Configuration *
 *************************************/
'use strict';

/* exported ThreeGen */
function ThreeGen() {

  this.settings = {

    // Settings: Game
    META : {
      // DOM element name
      domElement : 'canvas-body',

      // Stats: 0 -> fps, 1 -> ms
      statsMode : 1,
    },


    // Settings: Files paths
    PATHS : {
      textures : 'assets/js/game/res/texture/',
      models : 'assets/js/game/res/models/',
    },


    // Settings: Camera
    CAMERA : {
      fov : 45,
      near : 1,
      far : 3000,
      startX : 0,
      startY : 50,
      startZ : 50,
      distX : 0,
      distY : 10,
      distZ : 50,
    },


    // Settings: Renderer
    RENDERER : {
      antialias : false,
    },


    // Settings: Player
    PLAYER : {
      frontSpeed : 35,
      backSpeed : 25,
      jumpMultiplier : 3.0,
      airMultiplier : 1.0,
      rotationMultiplier : 2.5,
      airRotationMultiplier : 0.2,
    },


    // Settings: Entities
    ENTITIES : {

      // Add any type of stats
      stats : {
        health : 10,
        stamina : 10,
      },

    },


    // Setting: Physics
    PHYSICS : {
      gravity : -60,
    },


  };
}
