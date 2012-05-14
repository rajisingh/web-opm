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
	if (evt.currentTarget !== activeSVGElement) {
		if (activeSVGElement == null) {
			activeSVGElement = evt.currentTarget;
		}
		else {
			deselect();
			activeSVGElement = evt.currentTarget;
		}
	}
	if (activeSVGElement) {
		activeSVGElement.firstChild.setAttributeNS(null, 'fill', 'whiteSmoke');
		var grip = activeSVGElement.getElementsByTagNameNS(svgNS, 'image').item(0);
		grip.setAttributeNS(null, 'visibility', 'visable');
		activeSVGElement.setAttributeNS(null, 'onmousedown', 'pick(evt)');
	}
	else {
		alert('Error: Element is not selected');
	}
}
function deselect(evt) {
	if (activeSVGElement !== null) {
		activeSVGElement.firstChild.setAttributeNS(null, 'fill', 'white');
		var grip = activeSVGElement.getElementsByTagNameNS(svgNS, 'image').item(0);
		grip.setAttributeNS(null, 'visibility', 'hidden');
		activeSVGElement.setAttributeNS(null, 'onmousedown', null);
		activeSVGElement.setAttributeNS(null, 'onmousemove', null);
		activeSVGElement = null;
	}
}
function pick(evt) {
	activeSVGElement.setAttributeNS(null, 'onmousemove', 'dragging(evt)');
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentMatrix = activeSVGElement.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < currentMatrix.length; i++) { currentMatrix[i] = parseFloat(currentMatrix[i]); }
}
function dragging(evt) {
	activeSVGElement.setAttributeNS(null, 'onmouseup', 'drop(evt)');
	dx = evt.clientX - currentX;
	dy = evt.clientY - currentY;
	currentMatrix[4] += dx;
	currentMatrix[5] += dy;
	var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
	activeSVGElement.setAttributeNS(null, 'transform', newMatrix);
	currentX = evt.clientX;
	currentY = evt.clientY;
}
function drop(evt) {
	return deselect()
}