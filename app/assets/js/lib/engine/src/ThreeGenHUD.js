/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/*************************
 * HUD Game Instructions *
 *************************/
ThreeGen.prototype.enableInstructionsHUD = function() {
  var instructions = this.settings.HELP;
  console.log(instructions.description);
};
