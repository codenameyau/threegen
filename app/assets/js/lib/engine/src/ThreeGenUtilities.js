/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/*********************
 * Utility Functions *
 *********************/
ThreeGen.prototype.utils = {

  // Adds element to DOM
  addToDOM : function(parent, element) {
    var container = document.getElementById(parent);
    container.appendChild(element);
  },

  // Checks if object has property, otherwise give it a value
  checkProperty : function(object, property, value) {
    if (object && typeof object[property] !== 'undefined') {value = object[property];}
    return value;
  },

  // Converts radians to degrees
  degToRad : function(degrees) {
    return Math.PI/180 * degrees;
  },

  // Returns a random number between min and max
  randNumber : function(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Returns bool whether array contains an item
  containsItem : function(array) {
    return (array.length > 0) ? true : false;
  },

  // Removes object that has matching property value
  removeObjectInArray : function(array, property, match) {
    for (var i in array) {
      if (array[i][property] === match) {
        array.splice(i, 1);
        return;
      }
    }
  },

};
