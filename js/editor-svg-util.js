/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of utility functions for editor-svg.js
 * 
 * Author: Sergey N. Bolshchikov  
 * */

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function rectCorner(rect) {
	pt.x = rect.x.animVal.value + rect.width.animVal.value;
	pt.y = rect.y.animVal.value + rect.height.animVal.value;
	return pt.matrixTransform(rect.getTransformToElement(svg));
}
function pointIn(el,x,y) {
	pt.x = x; pt.y = y;
	return pt.matrixTransform(el.getTransformToElement(svg).inverse());
}

function cursorPoint(evt) {
	pt.x = evt.clientX; pt.y = evt.clientY;
	return pt.matrixTransform(svg.getScreenCTM().inverse());
}