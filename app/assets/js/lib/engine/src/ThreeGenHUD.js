/*-------JSHint Directive---------*/
/* global ThreeGen, Stats         */
/*--------------------------------*/
'use strict';


/*************************
 * HUD FPS Stats Moniter *
 *************************/
ThreeGen.prototype.enableStatsMoniter = function() {
  this.stats = new Stats();
  this.stats.setMode(this.settings.HUD.FPS.mode);
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top  = '0';
  this.stats.domElement.style.left = '0';
  this.stats.domElement.style.zIndex = 100;
  this.addToDOM(this.stats.domElement);
};


/*************************
 * HUD Game Instructions *
 *************************/
ThreeGen.prototype.enableInstructionsHUD = function() {
  // [TODO] Make Help HUD into an customizable API
  var instructions = this.settings.HUD.HELP;

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
  label.style.color = 'rgba(180, 180, 180, 0.5)';
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
  this.addToDOM(container);
  this.HUD.instructions = container;
};


/************************
 * HUD Game Paused Menu *
 ************************/
ThreeGen.prototype.enablePausedHUD = function() {
  var settings = this.settings.HUD.PAUSE;
  var container = document.createElement('div');
  container.className = 'threegen-paused';
  container.style.display = 'none';
  container.style.zIndex = '125';
  container.style.width = '100%';
  container.style.position = 'absolute';
  container.style.top = '40%';
  container.style.textAlign = 'center';
  container.style.color = 'rgba(200, 200, 200, 0.5)';
  container.style.textTransform = 'uppercase';
  container.style.fontSize = '30px';
  container.style.letterSpacing = '8px';
  container.innerText = settings.message;
  this.addToDOM(container);
  this.HUD.paused = container;
};
