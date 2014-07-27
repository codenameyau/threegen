/*-------JSHint Directive---------*/
/* exported ThreeGen              */
/*--------------------------------*/
'use strict';


/****************************
 * ThreeGen - Game Settings *
 ****************************/
function ThreeGen() {

  this.settings = {

    // Internal info
    META : {
      domElement : 'canvas-body',
    },


    // Files paths
    PATHS : {
      textures : 'assets/js/game/res/texture/',
      models   : 'assets/js/game/res/models/',
      sound    : 'assets/js/game/res/sound/',
    },


    // Camera
    CAMERA : {
      fov     : 35,
      near    : 1,
      far     : 3000,
      startX  : 0,
      startY  : 100,
      startZ  : 150,
      posX    : 0,
      posY    : 10,
      posZ    : 70,
    },


    // Renderer
    RENDERER : {
      antialias : false,
    },


    // Player
    PLAYER : {
      rotationMultiplier : 2.0,
      airMultiplier      : 2.0,
      jumpHeight         : 35.0,
      frontSpeed         : 40.0,
      backSpeed          : 30.0,
    },


    // Entities
    ENTITIES : {

      // Add any type of stats
      stats : {
        health  : 10,
        stamina : 10,
      },

    },


    // Physics
    PHYSICS : {
      gravity : -80,
    },


    // Key bindings
    KEYS : {
      up    : 'w',
      left  : 'a',
      down  : 's',
      right : 'd',
      jump  : 'space',
      menu  : 'escape',
      pov   : 'f',
    },


    // HTML HUD
    HUD : {

      FPS : {
        enabled : false,
        mode : 1, // 0 -> fps, 1 -> ms
      },

      HELP : {
        enabled : true,
        description : 'Welcome to ThreeGen! \nMove with WASD keys \nJump with spacebar \nToggle POV with `F` \nPause with `Esc`',
      },

      PAUSE : {
        enabled : true,
        message : 'Paused',
      },

    },

  };
}
