/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * File context description:
 * Set of util functions for work w/ SVG canvas
 * 
 * Author: Sergey N. Bolshchikov  
 * */

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function select(evt) {
	if (evt.currentTarget !== activeElement) {
		if (activeElement == null) {
			activeElement = evt.currentTarget;
		}
		else {
			deselect();
			activeElement = evt.currentTarget;
		}
	}
	if (activeElement) {
		activeElement.firstChild.setAttributeNS(null, 'fill', 'whiteSmoke');
		var grip = activeElement.getElementsByTagNameNS(svgNS, 'image').item(0);
		grip.setAttributeNS(null, 'visibility', 'visable');
		activeElement.setAttributeNS(null, 'onmousedown', 'pick(evt)');
	}
	else {
		alert('Error: Element is not selected');
	}
}
function deselect(evt) {
	if (activeElement !== null) {
		activeElement.firstChild.setAttributeNS(null, 'fill', 'white');
		var grip = activeElement.getElementsByTagNameNS(svgNS, 'image').item(0);
		grip.setAttributeNS(null, 'visibility', 'hidden');
		activeElement.setAttributeNS(null, 'onmousedown', null);
		activeElement.setAttributeNS(null, 'onmousemove', null);
		activeElement = null;
	}
}
function pick(evt) {
	activeElement.setAttributeNS(null, 'onmousemove', 'dragging(evt)');
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentMatrix = activeElement.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < currentMatrix.length; i++) { currentMatrix[i] = parseFloat(currentMatrix[i]); }
}
function dragging(evt) {
	activeElement.setAttributeNS(null, 'onmouseup', 'drop(evt)');
	dx = evt.clientX - currentX;
	dy = evt.clientY - currentY;
	currentMatrix[4] += dx;
	currentMatrix[5] += dy;
	var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
	activeElement.setAttributeNS(null, 'transform', newMatrix);
	currentX = evt.clientX;
	currentY = evt.clientY;
}
function drop(evt) {
	return deselect()
}