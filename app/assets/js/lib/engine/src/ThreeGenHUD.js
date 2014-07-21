/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/*************************
 * HUD Game Instructions *
 *************************/
ThreeGen.prototype.enableInstructionsHUD = function() {
  var instructions = this.settings.HELP;

  // HUD Container
  var container = document.createElement('div');
  container.style.width = '100px';
  container.style.height = '100px';
  container.style.zIndex = '120';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  container.style.position = 'fixed';
  container.style.right = '50px';
  container.style.top = '0';
  container.onclick = function() {
    console.log('clicked');
  };

  // HUD Label
  var label = document.createElement('h5');
  label.innerHTML = 'Instructions';
  label.style.letterSpacing = '2px';
  label.style.textTransform = 'uppercase';
  label.style.color = '#fafafa';
  container.appendChild(label);

  this.addToDOM(this.settings.META.domElement, container);
};
