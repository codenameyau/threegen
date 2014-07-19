/*-------JSHint Directive---------*/
/* exported ThreeGen              */
/*--------------------------------*/
'use strict';


/****************************
 * ThreeGen - Game Settings *
 ****************************/
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
      models   : 'assets/js/game/res/models/',
      sound    : 'assets/js/game/res/sound/',
    },


    // Settings: Camera
    CAMERA : {
      fov     : 35,
      near    : 0.5,
      far     : 3000,
      startX  : 0,
      startY  : 100,
      startZ  : 150,
      posX    : 0,
      posY    : 10,
      posZ    : 50,
    },


    // Settings: Renderer
    RENDERER : {
      antialias : false,
    },


    // Settings: Player
    PLAYER : {
      airMultiplier         : 1.0,
      airRotationMultiplier : 0.2,
      rotationMultiplier    : 2.0,
      jumpMultiplier        : 5.0,
      frontSpeed            : 35,
      backSpeed             : 25,
    },


    // Settings: Entities
    ENTITIES : {

      // Add any type of stats
      stats : {
        health  : 10,
        stamina : 10,
      },

    },


    // Setting: Physics
    PHYSICS : {
      gravity : -60,
    },


    // Settings: Key bindings
    KEYS : {
      up    : 'w',
      left  : 'a',
      down  : 's',
      right : 'd',
      jump  : 'space',
      pov   : 'f',
    }

  }; // End settings
}
