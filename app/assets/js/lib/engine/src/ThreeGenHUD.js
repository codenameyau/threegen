/*-------JSHint Directive---------*/
/* global ThreeGen                */
/*--------------------------------*/
'use strict';


/*************************
 * HUD Game Instructions *
 *************************/
ThreeGen.prototype.enableInstructionsHUD = function() {
  // [TODO] Make Help HUD into an customizable API
  var instructions = this.settings.HELP;

  // HUD Container style
  var container = document.createElement('div');
  container.className = 'threegen-help-container';
  container.style.width = '180px';
  container.style.zIndex = '120';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  container.style.position = 'fixed';
  container.style.right = '0';
  container.style.top = '0';
  container.style.padding = '0 15px 10px 15px';
  container.style.letterSpacing = '1px';
  container.style.fontFamily = 'Helvetica';

  // HUD Label style
  var label = document.createElement('h5');
  label.className = 'threegen-help-label';
  label.innerHTML = 'Instructions';
  label.style.letterSpacing = '2px';
  label.style.textTransform = 'uppercase';
  label.style.textAlign = 'center';
  label.style.color = 'rgba(180, 180, 180, 0.2)';
  label.style.cursor = 'pointer';
  container.appendChild(label);

  // HUD body style
  var body = document.createElement('div');
  body.className = 'threegen-help-body';
  body.innerText = instructions.description;
  body.style.color = 'rgba(160, 160, 160, 0.8)';
  body.style.lineHeight = '30px';
  body.style.fontSize = '13px';
  body.style.display = 'none';
  container.appendChild(body);

  // HUD Container events
  container.onclick = function() {
    console.log('clicked');
  };

  // HUD Label events
  label.onmouseenter = function() {
    this.style.color = 'rgba(200, 200, 200, 0.9)';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    body.style.display = 'block';
  };

  label.onmouseleave = function() {
    this.style.color = 'rgba(150, 150, 150, 0.5)';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    body.style.display = 'none';
  };

  // Add container to dom
  this.addToDOM(this.settings.META.domElement, container);
};
