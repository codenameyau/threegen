/*-------JSHint Directive---------*/
/* global THREE, ThreeGen         */
/*--------------------------------*/
'use strict';


/***********************
 * Debugging Utilities *
 ***********************/
ThreeGen.prototype.debug = {

  enableFloorGrid : function(scene, lines, steps, gridColor) {
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
    scene.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces));
  },

};
