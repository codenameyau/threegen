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
      zoomX : 0,
      zoomY : 20,
      zoomZ : 50,
    },

    // Settings: Renderer
    RENDERER : {
      antialias : false,
    },

  };
}
