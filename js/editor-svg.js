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

var activeSVGDiagram = document.getElementById('sd');
var activeSVGElement = null;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var objId = 0;
var prcId = 0;


function addObject() {
	try {
		if (activeSVGElement !== null) { deselect(); }
		objId++;
		var obj = new UIObject(objId);
		obj.draw();
		var activeUIDiagram = UIDiagramList.returnActive();
		activeUIDiagram.addElement(obj);
	}
	catch(e) {
		alert(e.message);
	}
}

function addProcess() {
	try {
		if (activeSVGElement !== null) { deselect(); }
		prcId++;
		var prc = new UIProcess(prcId);
		prc.draw();
		var activeUIDiagram = UIDiagramList.returnActive();
		activeUIDiagram.addElement(prc);
	}
	catch(e) {
		alert(e.message);
	}
}

function addState() {
	try {
		//Check
		if (activeSVGElement === null) {
			var msg = "Please, click on the relevant object first";
			var err = new Error(msg);
			if (!err.message) {
				err.message = msg;
			}
			throw err;
		}
		else {
			var type = activeSVGElement.getAttributeNS(null, 'type');
			if (type == 'process') {
				var msg = "Process cannot have a state";
				var err = new Error(msg);
				if (!err.message) {
					err.message = msg;
				}
				throw err;
			}
			
			//Execute this if error are caught
			var activeUIDiagram = UIDiagramList.returnActive();
			var activeUIObject = activeUIDiagram.returnActive(activeSVGElement.id);
			var stt = new UIState(activeUIObject);
			activeUIObject.addState(stt);
			stt.draw();
		}			
	}
	catch(e) {
		alert(e.message);
	}
} 


function diagramZoom(scale) {
	deselect();
	var diagramWidth = activeSVGDiagram.getBBox().width + 2;
	var diagramHeight = activeSVGDiagram.getBBox().height + 2;
	var scaleMatrix = activeSVGDiagram.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] = parseFloat(scaleMatrix[i]); }
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] *= scale; }
	scaleMatrix[4] += (1 - scale) * diagramWidth/2;
	scaleMatrix[5] += (1 - scale) * diagramHeight/2;
	var newMatrix = "matrix(" + scaleMatrix.join(' ') + ")";
	activeSVGDiagram.setAttributeNS(null, 'transform', newMatrix);
}