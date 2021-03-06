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


  // Returns value of property if in object, otherwise return value
  checkProperty : function(object, property, value) {
    if (object && typeof object[property] !== 'undefined') { value = object[property]; }
    return value;
  },


  // Converts degrees to radians
  degToRad : function(degrees) {
    return Math.PI/180 * degrees;
  },


  // Converts radians to degrees
  radToDeg : function(degrees) {
    return 180/Math.PI * degrees;
  },


  // Returns angle between two Vector3
  angleBetweenVectors : function(vectorA, vectorB) {
    return vectorA.angleTo(vectorB);
  },


  // Returns a random number between min and max
  randNumber : function(min, max) {
    return Math.random() * (max - min) + min;
  },


  // Returns bool whether array contains an item
  containsItem : function(array) {
    return array.length > 0;
  },


  // Returns the size of objects
  objectSize : function(object) {
    var count = 0;
    if (Object.keys) {count = Object.keys(object).length;}
    else {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {++count;}
      }
    }
    return count;
  },


  // Removes object that has matching property value
  removeObjectInArray : function(array, property, match) {
    for (var i=array.length-1; i>=0; --i) {
      if (array[i][property] === match) {
        array.splice(i, 1);
        return;
      }
    }
  },


  // Quickly deletes all items in array
  clearArray : function(array) {
    while (array.length) { array.pop(); }
  },

};
