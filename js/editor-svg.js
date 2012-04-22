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
			//Draw state
			var paddingX = 10;
			var paddingY = 5
			var state = document.createElementNS(svgNS, 'rect');
			var x = activeElement.firstChild.x.baseVal.value + paddingX;
			var y = activeElement.firstChild.y.baseVal.value + activeElement.firstChild.height.baseVal.value - paddingY;
			state.setAttributeNS(null, 'x', x);
			state.setAttributeNS(null, 'y', y);
			state.setAttributeNS(null, 'rx', '6');
			state.setAttributeNS(null, 'ry', '6')
			state.setAttributeNS(null, 'width', '70');
			state.setAttributeNS(null, 'height', '25');
			state.setAttributeNS(null, 'fill', 'white');
			state.setAttributeNS(null, 'stroke', '#002e00');
			state.setAttributeNS(null, 'stroke-width', '1');
			root.appendChild(state);
			var stateName = document.createElementNS(svgNS, 'text');
			stateName.setAttributeNS(null, 'x', state.x.baseVal.value + 12);
			stateName.setAttributeNS(null, 'y', state.y.baseVal.value + 17);
			stateName.setAttributeNS(null, 'font-family', 'Helvetica');
			stateName.setAttributeNS(null, 'font-weight', 'bold');
			stateName.setAttributeNS(null, 'font-size', '13');	
			var caption = document.createTextNode('State ' + sttId);
			stateName.appendChild(caption);
			root.appendChild(stateName);
			
			//Resize the rect
			break;
	}	 
}	
function addSVGObject() {
	try {
		if (activeElement !== null) { deselect(); }
		objId++;
		var obj = new UIObject(objId);
		obj.draw();
	}
	catch(e) {
		alert(e.message);
	}
/*	
	var obj = document.createElementNS(svgNS, 'g');
	obj.setAttributeNS(null, 'id', 'obj' + objId);
	obj.setAttributeNS(null, 'type', 'object');
	obj.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	obj.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(obj);
	createSVGElement(obj, 'object');
*/
}

function addSVGProcess() {
	if (activeElement !== null) { deselect(); }
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