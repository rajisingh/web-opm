/**@fileOverview	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * File context description:
 * Set of util functions for work w/ SVG canvas
 * 
 * @author Sergey N. Bolshchikov  
 * */

var randomFromTo =  function(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

//Set of utility function to identify source and destination elements to draw the link
/**@function
 * @description identify source elements to draw a link.
 * @param {event} evt
 */
var setSrc = function(evt) {
	if (linkOn.status) {
		src = null;							//Make it null if it wasn't
		src = activeUIDiagram.returnElement(evt.currentTarget.id);
	}
}
/**@function
 * @description identify destination elements to draw a link.
 * @param {event} evt
 */
var setDest = function(evt) {
	if (linkOn.status) {
		dest = null;
		dest = activeUIDiagram.returnElement(evt.currentTarget.id);
		addLink(src, dest);
	}
}
//End

/**@function
 * @description select an element.
 * @param {event} evt
 */
var select = function(evt) {
	if (evt.currentTarget !== activeSVGElement) {
		if (activeSVGElement === null) {
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
/**@function
 * @description deselect an element.
 * @param {event} evt
 */
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
/**@function
 * @description pick an element.
 * @param {event} evt
 */
var pick = function(evt) {
	activeSVGElement.setAttributeNS(null, 'onmousemove', 'dragging(evt)');
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentMatrix = activeSVGElement.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < currentMatrix.length; i++) { currentMatrix[i] = parseFloat(currentMatrix[i]); }
}
/**@function
 * @description drag an element.
 * @param {event} evt
 */
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
	/**@function
	 * @description drop an element.
	 * Update element coordinates of UI Element
		 * Algorithm:
		 * 1. Extract matrix transformation from SVG Element
		 * 2. Update element XY coordinates
		 * 3. Update element name XY coordinates
		 * 4. If type is object and statesAmount is not 0
		 * 5. 	Run the loop over all states
		 * 6. 		Change XY of states
	 * @param {event} evt
	 */
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

/**@function
 * @description LSSB algorithm for line segment clipping. 
 * @description Function is needed in order to connect nearest borders of objects instead of centers.
 * @param {number} srcCenter
 * @param {number} destCenter
 * @param {number} rectSizeMin
 * @param {number} rectSizeMax
 */
var lssbClipping = function(srcCenter, destCenter, rectSizeMin, rectSizeMax) {
	/**@function
	 * @description Utility function for LSSB alg to identify code of code of quadrant.
	 * @param {number} point
	 */
	var code = function(point) {
		var c = 0;
		if (point[0] < rectSizeMin[0]) { c = 1; }
		else if (point[0] > rectSizeMax[0]) { c = 2; }
		if (point[1] < rectSizeMin[1]) { c += 4; }
		else if (point[1] > rectSizeMax[1]) { c += 8; }
		return c
	}
	var ca = code(srcCenter);
	
	var cb = code(destCenter);
	if (window.console) {
		console.log('lssb ca component = ' + ca);
		console.log('lssb cb component = ' + cb);
	}
	var dx = destCenter[0] - srcCenter[0];
	var dy = destCenter[1] - srcCenter[1];
	switch(ca + cb) {
	case 1: 
		if (ca === 1) {
			destCenter[0] = rectSizeMin[0];
			destCenter[1] = (rectSizeMin[0] - srcCenter[0]) * dy / dx + srcCenter[1];
			return destCenter;
		}
		else {
			srcCenter[0] = rectSizeMin[0];
			srcCenter[1] = (rectSizeMin[0] - destCenter[0]) * dy / dx + destCenter[1];
			return srcCenter;
		}
	case 2:
		if (ca === 2) {
			destCenter[0] = rectSizeMax[0];
			destCenter[1] = (rectSizeMax[0] - srcCenter[0]) * dy / dx + srcCenter[1];
			return destCenter;
		}
		else {
			srcCenter[0] = rectSizeMax[0];
			srcCenter[1] = (rectSizeMax[0] - destCenter[0]) * dy / dx + destCenter[1];
			return srcCenter;
		}
	case 4:
		if (ca === 4) {
			destCenter[0] = (rectSizeMin[1] - srcCenter[1]) * dx / dy + srcCenter[0];
			destCenter[1] = rectSizeMin[1];
			return destCenter;
		}
		else {
			srcCenter[0] = (rectSizeMin[1] - destCenter[1]) * dx / dy + destCenter[0];
			srcCenter[1] = rectSizeMin[1];
			return srcCenter;
		}
	case 5:
		var r = (rectSizeMin[0] - srcCenter[0]) * dy / dx + srcCenter[1];
		if (r < rectSizeMin[1]) {
			if (ca === 5) {
				destCenter[0] = destCenter[0] + (rectSizeMin[1] - destCenter[1]) * dx / dy; 
				destCenter[1] = rectSizeMin[1];
				return destCenter;
			}
			else {
				srcCenter[0] = srcCenter[0] + (rectSizeMin[1] - srcCenter[1]) * dx / dy; 
				srcCenter[1] = rectSizeMin[1];
				return srcCenter;
			}
		}
		else {
			if (ca === 5) {
				destCenter[0] = rectSizeMin[0];
				destCenter[1] = r;
				return destCenter;
			}
			else {
				srcCenter[0] = rectSizeMin[0];
				srcCenter[1] = r;
				return srcCenter;
			}
		}
	case 6:
		var r = (rectSizeMax[0] - srcCenter[0]) * dy / dx + srcCenter[1];
		if (r < rectSizeMin[1]) {
			if (ca === 6) {
				destCenter[0] = destCenter[0] + (rectSizeMin[1] - destCenter[1]) * dx / dy; 
				destCenter[1] = rectSizeMin[1];
				return destCenter;
			}
			else {
				srcCenter[0] = srcCenter[0] + (rectSizeMin[1] - srcCenter[1]) * dx / dy; 
				srcCenter[1] = rectSizeMin[1];
				return srcCenter;
			}
		}
		else {
			if (ca === 6) {
				destCenter[0] = rectSizeMax[0];
				destCenter[1] = r;
				return destCenter;
			}
			else {
				srcCenter[0] = rectSizeMax[0];
				srcCenter[1] = r;
				return srcCenter;
			}
		}
	case 8:
		if (ca === 8) {
			destCenter[0] = (rectSizeMax[1] - srcCenter[1]) * dx / dy + srcCenter[0];
			destCenter[1] = rectSizeMax[1];
			return destCenter;
		}
		else {
			srcCenter[0] = (rectSizeMax[1] - destCenter[1]) * dx / dy + destCenter[0];
			srcCenter[1] = rectSizeMax[1];
			return srcCenter;
		}
	case 9:
		var r = (rectSizeMin[0] - srcCenter[0]) * dy / dx + srcCenter[1];
		if (r > rectSizeMax[1]) {
			if (ca === 9) {
				destCenter[0] = destCenter[0] + (rectSizeMax[1] - destCenter[1]) * dx / dy; 
				destCenter[1] = rectSizeMax[1];
				return destCenter;
			}
			else {
				srcCenter[0] = srcCenter[0] + (rectSizeMax[1] - srcCenter[1]) * dx / dy; 
				srcCenter[1] = rectSizeMax[1];
				return srcCenter;
			}
		}
		else {
			if (ca === 9) {
				destCenter[0] = rectSizeMin[0];
				destCenter[1] = r;
				return destCenter;
			}
			else {
				srcCenter[0] = rectSizeMin[0];
				srcCenter[1] = r;
				return srcCenter;
			}
		}
	case 10:
		var r = (rectSizeMax[0] - srcCenter[0]) * dy / dx + srcCenter[1];
		if (r > rectSizeMax[1]) {
			if (ca === 10) {
				destCenter[0] = destCenter[0] + (rectSizeMax[1] - destCenter[1]) * dx / dy; 
				destCenter[1] = rectSizeMax[1];
				return destCenter;Crossrider
			}
			else {
				srcCenter[0] = srcCenter[0] + (rectSizeMax[1] - srcCenter[1]) * dx / dy; 
				srcCenter[1] = rectSizeMax[1];
				return srcCenter;
			}
		}
		else {
			if (ca === 10) {
				destCenter[0] = rectSizeMax[0];
				destCenter[1] = r;
				return destCenter;
			}
			else {
				srcCenter[0] = rectSizeMax[0];
				srcCenter[1] = r;
				return srcCenter;
			}
		}
	}
}
var ellipClipping = function(srcCenter, destCenter, params) {
	/**@function
	 * @description Ellipse clipping algorithm intended to find intersection.
	 * @description point between line and ellipse and return coordinates of the point.
	 * @param {number} srcCenter
	 * @param {number} destCenter
	 * @param {number[]} params
	 */

	try {

		if ( srcCenter[0] === params.cx && srcCenter[1] === params.cy ) {
			var intersection = [srcCenter[0], srcCenter[1]];
			var OnTheLeft = (srcCenter[0] > destCenter[0]) ? true : false;
		}
		else if ( destCenter[0] === params.cx && destCenter[1] === params.cy ) {
			var intersection = [destCenter[0], destCenter[1]];
			var OnTheLeft = (destCenter[0] > srcCenter[0]) ? true : false;
		}
		else {
			var err = new Error("Error in ellip clipping alg: no center of ellipse is found");
			throw err;
		}
		if (!OnTheLeft) {
			var teta = Math.atan( (destCenter[1] - srcCenter[1]) / (destCenter[0] - srcCenter[0]) );
		}
		else {
			var teta = Math.PI + Math.atan( (destCenter[1] - srcCenter[1]) / (destCenter[0] - srcCenter[0]) );
		}
		var x = ( params.rx * params.ry * Math.cos(teta) ) / ( Math.sqrt(Math.pow((params.ry*Math.cos(teta)),2) + Math.pow((params.rx*Math.sin(teta)),2)) );
		var y = ( params.rx * params.ry * Math.sin(teta) ) / ( Math.sqrt(Math.pow((params.ry*Math.cos(teta)),2) + Math.pow((params.rx*Math.sin(teta)),2)) );
		
		intersection[0] += x;
		intersection[1] += y;
		
		if (window.console) {
			console.log('Teta: ' + teta);
			console.log('x: ' + x);
			console.log('y: ' + y);
		}
		
		return intersection
		
	}
	catch(e) {
		alert(e.message);
	}
	
/*
	var rx = 60;			//default radius of ellipse over axis x
	var ry = 40;			//default radius of ellipse over axis y
	var code = function(point) {
		var c = 0;		
		if (point[0] == x && point[1] == y) { return c; }
		if (point[0] < x) { c = (point[1] < y) ? 2 : 3; }
		else { c = (point[1] < y) ? 1 : 4; }
		return c;
	}
	var ca = code(srcCenter);
	var cb = code(destCenter);
	if (window.console) { 
		console.log('ellipse clipping component ca = ' + ca); 
		console.log('ellipse clipping component cb = ' + cb); 
	}
	switch (ca + cb) {
	case 1:
		if (ca == 1) {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(destCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(destCenter[0],2)) ));
			var point = [destCenter[0] + multiplier * destCenter[0], destCenter[1] - multiplier * destCenter[1]];
			return point;
		}
		else {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(srcCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(srcCenter[0],2)) ));
			var point = [srcCenter[0] + multiplier * srcCenter[0], srcCenter[1] - multiplier * srcCenter[1]];
			return point;
		}
		break;
	case 4:
		if (ca == 4) {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(destCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(destCenter[0],2)) ));
			var point = [destCenter[0] + multiplier * destCenter[0], destCenter[1] + multiplier * destCenter[1]];
			return point;
		}
		else {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(srcCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(srcCenter[0],2)) ));
			var point = [srcCenter[0] + multiplier * srcCenter[0], srcCenter[1] + multiplier * srcCenter[1]];
			return point;
		}
		break;
	case 3:
		if (ca == 3) {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(destCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(destCenter[0],2)) ));
			var point = [destCenter[0] - multiplier * destCenter[0], destCenter[1] + multiplier * destCenter[1]];
			return point;
		}
		else {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(srcCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(srcCenter[0],2)) ));
			var point = [srcCenter[0] - multiplier * srcCenter[0], srcCenter[1] + multiplier * srcCenter[1]];
			return point;
		}
		break;
	case 2:
		if (ca == 2) {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(destCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(destCenter[0],2)) ));
			var point = [destCenter[0] - multiplier * destCenter[0], destCenter[1] - multiplier * destCenter[1]];
			return point;
		}
		else {
			var multiplier = (rx*ry)/(Math.sqrt( (Math.pow(rx, 2))*(Math.pow(srcCenter[1],2)) + (Math.pow(ry,2))*(Math.pow(srcCenter[0],2)) ));
			var point = [srcCenter[0] - multiplier * srcCenter[0], srcCenter[1] - multiplier * srcCenter[1]];
			return point;
		}
		break;
	}
*/
}
