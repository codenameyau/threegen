/*************************************
 * ThreeGen - Settings Configuration *
 *************************************/
'use strict';

/* exported ThreeGen */
function ThreeGen() {

  this.settings = {

    // Settings: Meta data
    META : {
      domElement : 'canvas-body',
      statsMode : 1, // 0 -> fps, 1 -> ms
    },

    // Settings: Files paths
    PATHS : {
      textures : 'assets/js/game/res/texture/',
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
      movementSpeed : 35,
      rotationSpeed : 2.5,
    },

  };
}
