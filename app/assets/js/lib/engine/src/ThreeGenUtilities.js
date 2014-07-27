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


ThreeGen.prototype.removeObjectInArray = function(array, property, match) {
  for (var i in array) {
    if (array[i][property] === match) {
      array.splice(i, 1);
      return;
    }
  }
};
