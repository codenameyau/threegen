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

    // Settings: Mouse Controls
    ORBIT_CONTROLS : {
      enabled : true,
      userPan : true,
      userPanSpeed : 1,
      minDistance : 10.0,
      maxDistance : 200.0,
      maxPolarAngle : (Math.PI/180) * 80,
    },

    // Settings: Renderer
    RENDERER : {
      antialias : false,
    },

  };
}
