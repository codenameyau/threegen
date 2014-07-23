/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*********************
 * Utility Functions *
 *********************/
ThreeGen.prototype.addToDOM = function(object) {
  var container = document.getElementById(this.settings.META.domElement);
  container.appendChild(object);
};


ThreeGen.prototype.degToRad = function(degrees) {
  return Math.PI/180 * degrees;
};


ThreeGen.prototype.checkProperty = function(object, property, value) {
  if (object && typeof object[property] !== 'undefined') {value = object[property];}
  return value;
};


ThreeGen.prototype.randNumber = function(min, max) {
  return Math.random() * (max - min) + min;
};

ThreeGen.prototype.enableFloorGrid = function(lines, steps, gridColor) {
  lines = lines || 20;
  steps = steps || 2;
  gridColor = gridColor || 0xFFFFFF;
  var floorGrid = new THREE.Geometry();
  var gridLine = new THREE.LineBasicMaterial( {color: gridColor} );
  for (var i = -lines; i <= lines; i += steps) {
    floorGrid.vertices.push(new THREE.Vector3(-lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, -lines));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, lines));
  }
  this.scene.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces),
    {posY: 0});
};

