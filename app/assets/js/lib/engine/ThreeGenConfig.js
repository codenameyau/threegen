/*************************************
 * ThreeGen - Settings Configuration *
 *************************************/
'use strict';

/* exported ThreeGen */
function ThreeGen() {

  this.SETTINGS = {

    // Settings: Camera
    CAMERA : {
      fov : 45,
      near : 1,
      far : 1000,
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
