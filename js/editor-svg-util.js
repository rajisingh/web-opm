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

var randomFromTo =  function(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

//Set of utility function to identify source and destination elements to draw the link
var setSrc = function(evt) {
	if (linkOn.status) {
		src = null;							//Make it null if it wasn't
		src = activeUIDiagram.returnElement(evt.currentTarget.id);
	}
}
var setDest = function(evt) {
	if (linkOn.status) {
		dest = null;
		dest = activeUIDiagram.returnElement(evt.currentTarget.id);
		addLink(src, dest);
	}
}
//End

var select = function(evt) {
	if (evt.currentTarget !== activeSVGElement) {
		if (activeSVGElement == null) {
			activeSVGElement = evt.currentTarget;
			activeUIElement = activeUIDiagram.returnElement(evt.currentTarget.id);
		}
		else {
			deselect();
			activeSVGElement = evt.currentTarget;
			activeUIElement = activeUIDiagram.returnElement(evt.currentTarget.id);
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
var deselect =  function(evt) {
	if (activeSVGElement !== null) {
		activeSVGElement.firstChild.setAttributeNS(null, 'fill', 'white');
		var grip = activeSVGElement.getElementsByTagNameNS(svgNS, 'image').item(0);
		grip.setAttributeNS(null, 'visibility', 'hidden');
		activeSVGElement.setAttributeNS(null, 'onmousedown', 'setSrc(evt)');
		activeSVGElement.setAttributeNS(null, 'onmousemove', null);
		activeSVGElement = null;
		activeUIElement = null;
	}
}

//Set of utility function for dragging mechanism
var pick = function(evt) {
	activeSVGElement.setAttributeNS(null, 'onmousemove', 'dragging(evt)');
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentMatrix = activeSVGElement.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < currentMatrix.length; i++) { currentMatrix[i] = parseFloat(currentMatrix[i]); }
}
var dragging = function(evt) {
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
var drop = function(evt) {
	/* Update element coordinates of UI Element
	 * Algorithm:
	 * 1. Extract matrix transformation from SVG Element
	 * 2. Update element XY coordinates
	 * 3. Update element name XY coordinates
	 * 4. If type is object and statesAmount is not 0
	 * 5. 	Run the loop over all states
	 * 6. 		Change XY of states*/
	
	var coord_change = activeSVGElement.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	activeUIElement.updateLocation(parseInt(activeUIElement.x) + parseInt(coord_change[4]), parseInt(activeUIElement.y) + parseInt(coord_change[5]));
	activeUIElement.name.updateLocation(parseInt(activeUIElement.name.x) + parseInt(coord_change[4]), parseInt(activeUIElement.name.y) + parseInt(coord_change[5]));

	if (activeUIElement.statesAmount !== 0 && activeUIElement.id.slice(0,3) === 'obj' ) {
		for (var i in activeUIElement.states) {
			activeUIElement.states[i].updateLocation(parseInt(activeUIElement.states[i].x) + parseInt(coord_change[4]), parseInt(activeUIElement.states[i].y) + parseInt(coord_change[5]))
		}
	}
	activeSVGElement.setAttributeNS(null, 'onmouseup', 'setDest(evt)');
	deselect()
}
//End

//LSSB algorithm for line segment clipping
//Function is needed in order to connect nearest borders of objects instead of centers
var lssbClipping = function(srcCenter, destCenter, rectSizeMin, rectSizeMax) {
	//Utility function for LSSB alg to identify code of code of quadrant
	var c = 0;
	var code = function(point) {
		if (point[0] < rectSizeMin[0]) { c = 1; }
		else if (point[0] > rectSizeMax[0]) { c = 2; }
		if (point[1] < rectSizeMin[1]) { c += 4; }
		else if (point[1] > rectSizeMax[1]) { c += 8; }
		return c
	}
	var ca = code(srcCenter);
	var cb = code(destCenter);
	var dx = destCenter[0] - srcCenter[0];
	var dy = destCenter[1] - srcCenter[1];
	switch(ca + cb) {
	case 1: 
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
	case 13:
	case 14:
	case 15:
	}

}
