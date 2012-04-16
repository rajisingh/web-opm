/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of functions for work w/ SVG canvas
 * 
 * Author: Sergey N. Bolshchikov  
 * */

/*FIXME:
 * 1. Rewrite function addSVG... w/ try and catch()
 * 2. Create basic OPM classes
 * 3. Finish function addSVGState()*/

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
var sttId = 0;


function createSVGElement(root, element) {
	if (activeElement !== null) { deselect(); }
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
			root.appendChild(rect);
			var rectName = document.createElementNS(svgNS, 'text');
			rectName.setAttributeNS(null, 'x', rect.x.baseVal.value + 26);
			rectName.setAttributeNS(null, 'y', rect.y.baseVal.value + 42);
			rectName.setAttributeNS(null, 'font-family', 'Helvetica');
			rectName.setAttributeNS(null, 'font-weight', 'bold');
			rectName.setAttributeNS(null, 'font-size', '15');	
			var caption = document.createTextNode('Object ' + objId);
			rectName.appendChild(caption);
			root.appendChild(rectName);
			var grip = document.createElementNS(svgNS, 'image');
			grip.setAttributeNS(null, 'x', rect.x.baseVal.value + 100);
			grip.setAttributeNS(null, 'y', rect.y.baseVal.value + 60);
			grip.setAttributeNS(null, 'width', '9');
			grip.setAttributeNS(null, 'height', '9');
			grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
			grip.setAttributeNS(null, 'visibility', 'hidden');
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
			root.appendChild(ellipse);
			var elName = document.createElementNS(svgNS, 'text');
			elName.setAttributeNS(null, 'x', ellipse.cx.baseVal.value - 33);
			elName.setAttributeNS(null, 'y', ellipse.cy.baseVal.value + 6);
			elName.setAttributeNS(null, 'font-family', 'Helvetica');
			elName.setAttributeNS(null, 'font-weight', 'bold');
			elName.setAttributeNS(null, 'font-size', '15');	
			var caption = document.createTextNode('Process ' + prcId);
			elName.appendChild(caption);
			root.appendChild(elName);
			var grip = document.createElementNS(svgNS, 'image');
			grip.setAttributeNS(null, 'x', ellipse.cx.baseVal.value + 51);
			grip.setAttributeNS(null, 'y', ellipse.cy.baseVal.value + 31);
			grip.setAttributeNS(null, 'width', '9');
			grip.setAttributeNS(null, 'height', '9');
			grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
			grip.setAttributeNS(null, 'visibility', 'hidden');
			root.appendChild(grip);
			break;
		case 'state':
			var paddingX = 10;
			var paddingY = 5
			var state = document.createElementNS(svgNS, 'rect');
			var x = activeElement.x.baseVal.value + paddingX;
			var y = activeElement.y.baseVal.value + activeElement.height.baseVal.value - paddingY;
			state.setAttributeNS(null, 'x', x);
			state.setAttributeNS(null, 'y', y);
			state.setAttributeNS(null, 'width', '85');
			state.setAttributeNS(null, 'height', '25');
			state.setAttributeNS(null, 'fill', 'white');
			state.setAttributeNS(null, 'stroke', 'limeGreen');
			state.setAttributeNS(null, 'stroke-width', '1');
			root.appendChild(state);
			var stateName = document.createElementNS(svgNS, 'text');
			stateName.setAttributeNS(null, 'x', state.x.baseVal.value + 6);
			stateName.setAttributeNS(null, 'y', state.y.baseVal.value + 3);
			stateName.setAttributeNS(null, 'font-family', 'Helvetica');
			stateName.setAttributeNS(null, 'font-weight', 'bold');
			stateName.setAttributeNS(null, 'font-size', '15');	
			var caption = document.createTextNode('State ' + sttId);
			stateName.appendChild(caption);
			root.appendChild(stateName);
			
			break;
	}	 
}	
function addSVGObject() {
	objId++;
	var obj = document.createElementNS(svgNS, 'g');
	obj.setAttributeNS(null, 'id', 'obj' + objId);
	obj.setAttributeNS(null, 'type', 'object');
	obj.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	obj.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(obj);
	createSVGElement(obj, 'object');
}

function addSVGProcess() {
	prcId++;
	var prc = document.createElementNS(svgNS, 'g');
	prc.setAttributeNS(null, 'id', 'prc' + prcId);
	prc.setAttributeNS(null, 'type', 'process');
	prc.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	prc.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(prc);
	createSVGElement(prc, 'process');
}

function addSVGState() {
	try {
		//Check
		if (activeElement === null) {
			var msg = "Please, click on the relevant object first";
			var err = new Error(msg);
			if (!err.message) {
				err.message = msg;
			}
			throw err;
		}
		else {
			var type = activeElement.getAttributeNS(null, 'type');
			if (type == 'process') {
				var msg = "Process cannot have a state";
				var err = new Error(msg);
				if (!err.message) {
					err.message = msg;
				}
				throw err;
			}
			
			//Execute this if error are caught
			sttId++;
			var stt = document.createElementNS(svgNS, 'g');
			stt.setAttributeNS(null, 'id', 'stt' + sttId);
			stt.setAttributeNS(null, 'type', 'state');
			activeElement.appendChild(stt);
			createSVGElement(stt, 'state');
		}		
		
	}
	catch(e) {
		alert(e.message);
	}
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
function diagramSVGzoom(scale) {
	deselect();
	var diagramWidth = activeDiagram.getBBox().width + 2;
	var diagramHeight = activeDiagram.getBBox().height + 2;
	var scaleMatrix = activeDiagram.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] = parseFloat(scaleMatrix[i]); }
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] *= scale; }
	scaleMatrix[4] += (1 - scale) * diagramWidth/2;
	scaleMatrix[5] += (1 - scale) * diagramHeight/2;
	var newMatrix = "matrix(" + scaleMatrix.join(' ') + ")";
	activeDiagram.setAttributeNS(null, 'transform', newMatrix);
}