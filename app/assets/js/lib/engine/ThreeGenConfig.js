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


    // Resources paths
    PATHS : {
      texture : 'assets/js/game/res/texture/',
      model   : 'assets/js/game/res/model/',
      sound   : 'assets/js/game/res/sound/',
      music   : 'assets/js/game/res/music/',
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
