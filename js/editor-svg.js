/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of functions for work w/ SVG canvas
 * 
 * Author: Sergey N. Bolshchikov  
 * */

var svg = document.getElementsByTagName('svg')[0];
var svgNS = svg.getAttribute('xmlns');
var xlinkNS = svg.getAttribute('xmlns:xlink');

var activeDiagram = document.getElementById('sd');
var activeElement = null;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var objId = 0;
var prcId = 0;


function createSVGElement(root, element) {
	switch (element){
		case 'object':
			var rect = document.createElementNS(svgNS, 'rect');
			rect.setAttributeNS(null, 'x', randomFromTo(90, 1150));
			rect.setAttributeNS(null, 'y', randomFromTo(5, 420));
			rect.setAttributeNS(null, 'width', '110');
			rect.setAttributeNS(null, 'height', '70');
			rect.setAttributeNS(null, 'fill', 'white');
			rect.setAttributeNS(null, 'stroke', 'limeGreen');
			rect.setAttributeNS(null, 'stroke-width', '2');
			rect.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(rect);
			var rectName = document.createElementNS(svgNS, 'text');
			rectName.setAttributeNS(null, 'x', rect.x.baseVal.value + 26);
			rectName.setAttributeNS(null, 'y', rect.y.baseVal.value + 42);
			rectName.setAttributeNS(null, 'font-family', 'Helvetica');
			rectName.setAttributeNS(null, 'font-weight', 'bold');
			rectName.setAttributeNS(null, 'font-size', '15');	
			rectName.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			var caption = document.createTextNode('Object ' + objId);
			rectName.appendChild(caption);
			root.appendChild(rectName);
			var grip = document.createElementNS(svgNS, 'image');
			grip.setAttributeNS(null, 'x', rect.x.baseVal.value + 100);
			grip.setAttributeNS(null, 'y', rect.y.baseVal.value + 60);
			grip.setAttributeNS(null, 'width', '9');
			grip.setAttributeNS(null, 'height', '9');
			grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
			grip.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(grip);
			break;
		case 'process':
			var ellipse = document.createElementNS(svgNS, 'ellipse');
			ellipse.setAttributeNS(null, 'cx', randomFromTo(90, 1150));
			ellipse.setAttributeNS(null, 'cy', randomFromTo(5, 420));
			ellipse.setAttributeNS(null, 'rx', '60');
			ellipse.setAttributeNS(null, 'ry', '40');
			ellipse.setAttributeNS(null, 'fill', 'white');
			ellipse.setAttributeNS(null, 'stroke', 'RoyalBlue');
			ellipse.setAttributeNS(null, 'stroke-width', '2');
			ellipse.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(ellipse);
			var elName = document.createElementNS(svgNS, 'text');
			elName.setAttributeNS(null, 'x', ellipse.cx.baseVal.value - 33);
			elName.setAttributeNS(null, 'y', ellipse.cy.baseVal.value + 6);
			elName.setAttributeNS(null, 'font-family', 'Helvetica');
			elName.setAttributeNS(null, 'font-weight', 'bold');
			elName.setAttributeNS(null, 'font-size', '15');	
			elName.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			var caption = document.createTextNode('Process ' + prcId);
			elName.appendChild(caption);
			root.appendChild(elName);
			var grip = document.createElementNS(svgNS, 'image');
			grip.setAttributeNS(null, 'x', ellipse.cx.baseVal.value + 51);
			grip.setAttributeNS(null, 'y', ellipse.cy.baseVal.value + 31);
			grip.setAttributeNS(null, 'width', '9');
			grip.setAttributeNS(null, 'height', '9');
			grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
			grip.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(grip);
			break;
	}	 
}	
function addSVGObject() {
	objId++;
	var obj = document.createElementNS(svgNS, 'g');
	obj.setAttributeNS(null, 'id', 'obj' + objId);
	obj.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	obj.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(obj);
	createSVGElement(obj, 'object');
}

function addSVGProcess() {
	prcId++;
	var prc = document.createElementNS(svgNS, 'g');
	prc.setAttributeNS(null, 'id', 'prc' + prcId);
	prc.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	prc.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(prc);
	createSVGElement(prc, 'process');
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
		activeElement.setAttributeNS(null, 'onmousedown', 'pick(evt)');
	}
	else {
		alert('Error: Element is not selected');
	}
}
function deselect(evt) {
	activeElement.firstChild.setAttributeNS(null, 'fill', 'white');
	activeElement.setAttributeNS(null, 'onmousedown', null);
	activeElement.setAttributeNS(null, 'onmousemove', null);
	activeElement = null;
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
