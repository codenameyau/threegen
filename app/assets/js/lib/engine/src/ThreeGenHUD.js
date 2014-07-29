/*-------JSHint Directive---------*/
/* global ThreeGen, Stats         */
/*--------------------------------*/
'use strict';


/*************************
 * HUD FPS Stats Moniter *
 *************************/
ThreeGen.prototype.enableStatsMoniter = function() {
  var container = document.createElement('div');
  container.className = 'threegen-fps-stats';
  this.stats = new Stats();
  this.stats.setMode(this.settings.HUD.FPS.mode);
  container.appendChild(this.stats.domElement);
  this.utils.addToDOM(this.settings.META.domElement, container);
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

  // HUD Label style
  var label = document.createElement('h5');
  label.className = 'threegen-help-label';
  label.innerText = 'Instructions';
  container.appendChild(label);

  // HUD body style
  var body = document.createElement('div');
  body.className = 'threegen-help-body';
  body.innerText = instructions.description;
  container.appendChild(body);

  // HUD Container events
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
  this.utils.addToDOM(this.settings.META.domElement, container);
  this.HUD.instructions = container;
};


/******************
 * HUD Game Pause *
 ******************/
ThreeGen.prototype.enablePausedHUD = function() {
  var settings = this.settings.HUD.PAUSE;
  var container = document.createElement('div');
  container.className = 'threegen-paused';
  container.innerText = settings.message;
  this.utils.addToDOM(this.settings.META.domElement, container);
  this.HUD.paused = container;
};
