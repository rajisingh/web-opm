/**	@fileOverview
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for GUI
 * 
 *  @author: Sergey N. Bolshchikov
 * */

/**
 * @Class
 * @description User Interface Diagram
 * @constructor
 * @this {UIDiagram}
 * @param {string} id
*/
function UIDiagram(id) {
	/** @field *//** holds the id's to the UI diagram .*/
	this.id = id;
	/** @field *//** holds a matrix for location usage.*/
	this.transform = 'matrix(1 0 0 1 0 0)';
	/** @field *//** indicates if the UI diagram is active.*/
	this.active = true; 
	/** @field *//** holds the elements of the UI diagram.*/
	this.elements = { }; 
}
/**
 * create a new diagram.
 * @this {UIDiagram}
 */
UIDiagram.prototype.draw = function() {
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'transform', this.transform);
	svg.appendChild(group);
}
/**
 * adds an element to the diagram.
 * @this {UIDiagram}
 * @param {OPMElement} element
 */
UIDiagram.prototype.addElement = function(element) {
	this.elements[element.id] = element;
}
/**
 * removes an element from the diagram.
 * @this {UIDiagram}
 * @param {string} id
 */
UIDiagram.prototype.returnElement = function(id) {
	for (el in this.elements) {
		if (this.elements[el].id == id) { return this.elements[el]; }
	}
}

/**
 * @Class
 * @description Class holding the name of any element
 * @constructor
 * @this {UIName}
 * @param {OPMElement} el
*/
function UIName(el) {
	/** @field *//** holds the X axis of the element.*/
	this.x = null; 
	/** @field *//** holds the Y axis of the element.*/
	this.y = null;
	/** @field *//** Indicates the color of the element's name.*/
	this.fill = 'black';
	/** @field *//** Indicates the font of the element's name.*/
	this.fontFamily = 'Helvetica'; 
	/** @field *//** Indicates the weight of the element's name.*/
	this.fontWeight = 'bold'; 
	/** @field *//** Indicates the size of the element's name.*/
	this.fontSize = '15'; 
	switch(el.id.slice(0, 3)){
	case 'obj':
		this.value = 'Object ' + el.id.slice(3); 	/** @field *//** Indicates the type of the element.*/
		break;
	case 'prc':
		this.value = 'Process ' + el.id.slice(3);
		break;
	case 'stt':
		this.value = 'State ' + el.id.slice(3);
	}
}
/**
 * rename an element.
 * @this {UIDiagram}
 * @param {string} newName
 */
UIName.prototype.rename = function(newName) {
	this.value = newName;
}
/**
 * updates the location of an element.
 * @this {UIDiagram}
 * @param {number} newX
 * @param {number} newY
 */
UIName.prototype.updateLocation = function(newX, newY) {
	this.x = newX;
	this.y = newY;
}
/**
 * updates the font of an element.
 * @this {UIDiagram}
 * @param {string} newFont
 */
UIName.prototype.updateFont = function(newFont) {
	this.fontFamily = newFont;
}
/**
 * updates the size of an element.
 * @this {UIDiagram}
 * @param {number} newSize
 */
UIName.prototype.updateSize = function(newSize) {
	this.fontSize = newSize;
}

/**
 * @Class
 * @description User Interface Object
 * @constructor
 * @this {UIObject}
 * @param {number} id
*/
function UIObject(id) {
	/** @field *//** Indicates the ID of the object.*/
	this.id = 'obj' + id; 	
	/** @field *//** Indicates the X axis for the object.*/
	this.x = randomFromTo(90, 1150); 
	/** @field *//** Indicates the Y axis for the object.*/
	this.y = randomFromTo(5, 420);
	/** @field *//** Indicates the width of the object.*/
	this.width = 110; 
	/** @field *//** Indicates the height of the object.*/
	this.height = 70; 	
	/** @field *//** Indicates the fill color of the object.*/
	this.fill = 'white'; 	
	/** @field *//** Indicates the stroke color of the object.*/
	this.stroke = 'limeGreen'; 
	/** @field *//** Indicates the stroke width of the object.*/
	this.strokeWidth = 2; 
	/** @field *//** Indicates the name of the object.*/
	this.name = new UIName(this); 	
	/** @field *//** Holds the states for the object.*/
	this.states = { } 	
	/** @field *//** Indicates the amount of states for the object.*/
	this.statesAmount = 0; 	
	/** @field *//** Holds the icon of the object.*/
	this.icon = null; 	
}
/**
 * adds a state to the object.
 * @this {UIObject}
 * @param {UIState} state
 */
UIObject.prototype.addState = function(state) {
	this.states[state.id] = state;
	this.statesAmount++;
}
/**
 * draws an object.
 * @this {UIObject}
 */
UIObject.prototype.draw = function() {
	//Draw a group first
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	group.setAttributeNS(null, 'onmousedown', 'setSrc(evt)');
	group.setAttributeNS(null, 'onmouseup', 'setDest(evt)');
	group.setAttributeNS(null, 'onclick', 'select(evt)');
	activeSVGDiagram.appendChild(group);
	//Draw rectangle, appended to the group
	var rect = document.createElementNS(svgNS, 'rect');
	rect.setAttributeNS(null, 'x', this.x);
	rect.setAttributeNS(null, 'y', this.y);
	rect.setAttributeNS(null, 'width', this.width);
	rect.setAttributeNS(null, 'height', this.height);
	rect.setAttributeNS(null, 'fill', this.fill);
	rect.setAttributeNS(null, 'stroke', this.stroke);
	rect.setAttributeNS(null, 'stroke-width', this.strokeWidth);
	group.appendChild(rect);
	//Draw grip
	var grip = document.createElementNS(svgNS, 'image');
	grip.setAttributeNS(null, 'x', this.x + 100);
	grip.setAttributeNS(null, 'y', this.y + 60);
	grip.setAttributeNS(null, 'width', '9');
	grip.setAttributeNS(null, 'height', '9');
	grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
	grip.setAttributeNS(null, 'visibility', 'hidden');
	group.appendChild(grip);
	//Draw name
	this.name.updateLocation(this.x + 26, this.y + 42);
	var rectName = document.createElementNS(svgNS, 'text');
	rectName.setAttributeNS(null, 'x', this.name.x);
	rectName.setAttributeNS(null, 'y', this.name.y);
	rectName.setAttributeNS(null, 'font-family', this.name.fontFamily);
	rectName.setAttributeNS(null, 'font-weight', this.name.fontWeight);
	rectName.setAttributeNS(null, 'font-size', this.name.fontSize);	
	var caption = document.createTextNode(this.name.value);
	rectName.appendChild(caption);
	group.appendChild(rectName);
}
/**
 * updates the location of an object.
 * @this {UIObject}
 * @param {number} newX
 * @param {number} newY
 */
UIObject.prototype.updateLocation = function(newX, newY) {
	if (newX) { this.x = newX; }
	if (newY) { this.y = newY; }
}
/**
 * updates the size of an object.
 * @this {UIObject}
 * @param {number} newWidth
 * @param {number} newHeight
 */
UIObject.prototype.updateSize = function(newWidth, newHeight) {
	if (newWidth) { this.width = newWidth; }
	if (newHeight) { this.height = newHeight; }
}
/**
 * updates the color of an object.
 * @this {UIObject}
 * @param {string} color
 */
UIObject.prototype.updateColor = function(color) {
	this.fill = color
}
/**
 * updates the border for an object.
 * @this {UIObject}
 * @param {string} newStroke
 * @param {number} newStrokeWidth
 */
UIObject.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	if (newStroke) { this.stroke = newStroke; }
	if (newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}
/**
 * @Class
 * @description User Interface Process
 * @constructor
 * @this {UIProcess}
 * @param {number} id
*/
function UIProcess(id) {
	/** @field *//** Indicates the ID of the process.*/
	this.id = 'prc'+ id; 
	/** @field *//** Indicates the X axis for the process.*/
	this.x = randomFromTo(90, 1150);
	/** @field *//** Indicates the Y axis for the process.*/
	this.y = randomFromTo(5, 420);
	/** @field *//** Indicates the X axis radios for the process.*/
	this.rx = 60;
	/** @field *//** Indicates the Y axis radios for the process.*/
	this.ry = 40;
	/** @field *//** Indicates the fill color of the process.*/
	this.fill = 'white';
	/** @field *//** Indicates the stroke of the process.*/
	this.stroke = 'RoyalBlue';
	/** @field *//** Indicates the stroke width of the process.*/
	this.strokeWidth = 2;
	/** @field *//** Holds the name of the process.*/
	this.name = new UIName(this);
	/** @field *//** Holds the icon of the process.*/
	this.icon = null;
}
/**
 * draws a process.
 * @this {UIProcess}
 */
UIProcess.prototype.draw = function() {
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	group.setAttributeNS(null, 'onmousedown', 'setSrc(evt)');
	group.setAttributeNS(null, 'onmouseup', 'setDest(evt)');
	group.setAttributeNS(null, 'onclick', 'select(evt)');
	activeSVGDiagram.appendChild(group);
	var ellipse = document.createElementNS(svgNS, 'ellipse');
	ellipse.setAttributeNS(null, 'cx', this.x);
	ellipse.setAttributeNS(null, 'cy', this.y);
	ellipse.setAttributeNS(null, 'rx', this.rx);
	ellipse.setAttributeNS(null, 'ry', this.ry);
	ellipse.setAttributeNS(null, 'fill', this.fill);
	ellipse.setAttributeNS(null, 'stroke', this.stroke);
	ellipse.setAttributeNS(null, 'stroke-width', this.strokeWidth);
	group.appendChild(ellipse);
	var grip = document.createElementNS(svgNS, 'image');
	grip.setAttributeNS(null, 'x', this.x + 51);
	grip.setAttributeNS(null, 'y', this.y + 31);
	grip.setAttributeNS(null, 'width', '9');
	grip.setAttributeNS(null, 'height', '9');
	grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
	grip.setAttributeNS(null, 'visibility', 'hidden');
	group.appendChild(grip);
	this.name.updateLocation(this.x - 33, this.y + 6);
	var elName = document.createElementNS(svgNS, 'text');
	elName.setAttributeNS(null, 'x', this.name.x);
	elName.setAttributeNS(null, 'y', this.name.y);
	elName.setAttributeNS(null, 'font-family', this.name.fontFamily);
	elName.setAttributeNS(null, 'font-weight', this.name.fontWeight);
	elName.setAttributeNS(null, 'font-size', this.name.fontSize);	
	var caption = document.createTextNode(this.name.value);
	elName.appendChild(caption);
	group.appendChild(elName);
}
/**
 * updates the location of a process.
 * @this {UIProcess}
 * @param {number} newX
 * @param {number} newY
 */
UIProcess.prototype.updateLocation = function(newX, newY) {
	if (newX) { this.x = newX; }
	if (newY) { this.y = newY; }
}
/**
 * updates the size of a process.
 * @this {UIProcess}
 * @param {number} newRx
 * @param {number} newRy
 */
UIProcess.prototype.updateSize = function(newRx, newRy) {
	if (newRx) { this.rx = newRx; }
	if (newRy) { this.ry = newRy; }
}
/**
 * updates the color of a process.
 * @this {UIProcess}
 * @param {string} color
 */
UIProcess.prototype.updateColor = function(color) {
	this.fill = color
}
/**
 * updates the border for a process.
 * @this {UIProcess}
 * @param {string} newStroke
 * @param {number} newStrokeWidth
 */
UIProcess.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	if (newStroke) { this.stroke = newStroke; }
	if(newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}

var objHeightStep = 35;					//Amount of pixels to enlarge the object height when a new state is added
var stateYDelta = 10;					//Distance between states
/**
 * @Class
 * @description User Interface State
 * @constructor
 * @this {UIState}
 * @param {UIObject} parent
*/
function UIState(parent) {
	/** @field *//** Indicates the ID of the state.*/
	this.id = 'stt' + (parent.statesAmount + 1).toString() ;
	/** @field *//** Indicates the X axis for the state.*/
	this.x = activeSVGElement.firstChild.x.baseVal.value + 20;
	/** @field *//** Indicates the Y axis for the state.*/	
	this.y = activeSVGElement.firstChild.y.baseVal.value + 55;
	/** @field *//** Indicates the X axis radios for the state.*/
	this.rx = 6;
	/** @field *//** Indicates the Y axis radios for the state.*/
	this.ry = 6;
	/** @field *//** Holds the width of the state. */
	this.width = 70;	
	/** @field *//** Holds the height of the state. */
	this.height = 25;
	/** @field *//** Indicates the fill color of the state. */
	this.fill = 'white';
	/** @field *//** Indicates the stroke of the process.*/
	this.stroke = '#002e00';
	/** @field *//** Indicates the stroke width of the process.*/
	this.strokeWidth = 1;
	/** @field *//** Indicates the name of the process.*/
	this.name = new UIName(this);
	/** @field *//** Holds the parent object of the state. */
	this.parent = parent;
	/** @field *//** Holds the icon of the process.*/
	this.icon = null;
}
/**
 * draws a state.
 * @this {UIState}
 */
UIState.prototype.draw = function(){
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	activeSVGElement.appendChild(group);
	
	//Increase height of parent rect
	var oldHeight = this.parent.height;
	var newHeight = oldHeight + objHeightStep;
	activeSVGElement.firstChild.setAttributeNS(null, 'height', newHeight);
	this.parent.updateSize(null, newHeight);
	var grip = activeSVGElement.getElementsByTagNameNS(svgNS, 'image').item(0);
	var gripY = grip.y.baseVal.value;
	grip.setAttributeNS(null, 'y', gripY + (newHeight - oldHeight));
	
	//Update and y coordinate of state rect
	this.y = this.y + (this.parent.statesAmount - 1) * this.height + (this.parent.statesAmount - 1) * stateYDelta;
	
	//Drawing	
	var rect = document.createElementNS(svgNS, 'rect');
	rect.setAttributeNS(null, 'x', this.x);
	rect.setAttributeNS(null, 'y', this.y);
	rect.setAttributeNS(null, 'rx', this.rx);
	rect.setAttributeNS(null, 'ry', this.ry)
	rect.setAttributeNS(null, 'width', this.width);
	rect.setAttributeNS(null, 'height', this.height);
	rect.setAttributeNS(null, 'fill', this.fill);
	rect.setAttributeNS(null, 'stroke', this.stroke);
	rect.setAttributeNS(null, 'stroke-width', this.strokeWidth);
	group.appendChild(rect);

	this.name.updateLocation(this.x + 14, this.y + 17);
	this.name.updateSize(13);
	var rectName = document.createElementNS(svgNS, 'text');
	rectName.setAttributeNS(null, 'x', this.name.x);
	rectName.setAttributeNS(null, 'y', this.name.y);
	rectName.setAttributeNS(null, 'font-family', this.name.fontFamily);
	rectName.setAttributeNS(null, 'font-weight', this.name.fontWeight);
	rectName.setAttributeNS(null, 'font-size', this.name.fontSize);	
	var caption = document.createTextNode(this.name.value);
	rectName.appendChild(caption);
	group.appendChild(rectName);
}
/**
 * updates the location of a state.
 * @this {UIState}
 * @param {number} newX
 * @param {number} newY
 */
UIState.prototype.updateLocation = function(newX, newY) {
	this.x = newX;
	this.y = newY;
}
/**
 * updates the size of a state.
 * @this {UIState}
 * @param {number} newRx
 * @param {number} newRy
 * @param {number} newWidth
 * @param {number} newHeight
 */
UIState.prototype.updateSize = function(newRx, newRy, newWidth, newHeight) {
	this.rx = newRx;
	this.ry = newRy;
	this.width = newWidth;
	this.height = newHeight;
}
/**
 * updates the color of a state.
 * @this {UIState}
 * @param {string} color
 */
UIState.prototype.updateColor = function(color) {
	this.fill = color;
}
/**
 * updates the border for a state.
 * @this {UIState}
 * @param {string} newStroke
 * @param {string} newStrokeWidth
 */
UIState.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	this.stroke = newStroke;
	if(newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}
/**
 * @Class
 * @description User Interface Link
 * @constructor
 * @this {UILink}
 * @param {string} id
*/
function UILink(id) {
	/** @field *//** Indicates the ID of the link.*/
	this.id = id;
	/** @field *//** Indicates the destination of the link.*/
	this.d = null;
	/** @field *//** Indicates the fill of the link.*/
	this.fill = 'none';
	/** @field *//** Indicates the stroke of the link.*/
	this.stroke = 'DimGrey';
	/** @field *//** Indicates the stroke width of the link.*/
	this.strokeWidth = 2;
	/** @field *//** Indicates the name of the link.*/
	this.name = null;
}
/**
 * updates link.
 * @this {UILink}
 * @param {UIObject} newD
 */
UILink.prototype.updateLink = function(newD) {
	this.d = newD;
}
/**
 * updates the color of a link.
 * @this {UILink}
 * @param {string} color
 */
UILink.prototype.updateColor = function(color) {
	this.stroke = color;
}
/**
 * draws a link.
 * @this {UILink}
 * @param {UIObject} src
 * @param {UIObject} dest
 */
UILink.prototype.draw = function(src, dest) {
	//Calculating coordinates of connection point
	switch(linkOn.type) {
	case 'udr':
		var srcCenter = [src.x + src.width / 2, src.y + src.height / 2];
		var destCenter = [dest.x + dest.width / 2, dest.y + dest.height / 2];
		
		var srcSizeMin = [src.x, src.y];
		var srcSizeMax = [src.x + src.width, src.y + src.height];
		var destSizeMin = [dest.x, dest.y];
		var destSizeMax = [dest.x + dest.width, dest.y + dest.height];
		var srcBorderPoint = lssbClipping(srcCenter, destCenter, srcSizeMin, srcSizeMax);
		var destBorderPoint = lssbClipping(srcCenter, destCenter, destSizeMin, destSizeMax);
		
		var group = document.createElementNS(svgNS, 'g');
		group.setAttributeNS(null, 'id', this.id);
		activeSVGDiagram.appendChild(group);
		
		var newD = 'M ' + srcBorderPoint.join(',') + ' L ' + destBorderPoint.join(',');
		this.updateLink(newD);
		//Drawing a link
		var path = document.createElementNS(svgNS, 'path');
		path.setAttributeNS(null, 'marker-end', 'url(#udr)');
		path.setAttributeNS(null, 'd', this.d);
		path.setAttributeNS(null, 'stroke', this.stroke);
		path.setAttributeNS(null, 'stroke-width', this.strokeWidth);
		path.setAttributeNS(null, 'fill', this.fill);
		group.appendChild(path);
		break;
	
	case 'rcl':

		if (src.id.slice(0,3) === 'prc') { var srcCenter = [src.x, src.y]; }
		else { 
			var srcCenter = [src.x + src.width / 2, src.y + src.height / 2]; 
			var srcSizeMin = [src.x, src.y];
			var srcSizeMax = [src.x + src.width, src.y + src.height];
		}
		if (dest.id.slice(0,3) === 'prc') { var destCenter = [dest.x, dest.y]; }
		else { 
			var destCenter = [dest.x + dest.width / 2, dest.y + dest.height / 2]; 
			var destSizeMin = [dest.x, dest.y];
			var destSizeMax = [dest.x + dest.width, dest.y + dest.height];
		}

		
		if (src.id.slice(0,3) === 'prc') { 
			var params = { cx: src.x, cy: src.y, rx: src.rx, ry: src.ry }
			var srcBorderPoint = ellipClipping(srcCenter, destCenter, params);
		}
		else {
			var srcBorderPoint = lssbClipping(srcCenter, destCenter, srcSizeMin, srcSizeMax);
		}
		
		if (dest.id.slice(0,3) === 'prc') { 
			var params = { cx: dest.x, cy: dest.y, rx: dest.rx, ry: dest.ry }
			var destBorderPoint = ellipClipping(srcCenter, destCenter, params);
		}
		else {
			var destBorderPoint = lssbClipping(srcCenter, destCenter, destSizeMin, destSizeMax);
		}
		

		var group = document.createElementNS(svgNS, 'g');
		group.setAttributeNS(null, 'id', this.id);
		activeSVGDiagram.appendChild(group);
		
		var newD = 'M ' + srcBorderPoint.join(',') + ' L ' + destBorderPoint.join(',');
		this.updateLink(newD);
		//Drawing a link
		var path = document.createElementNS(svgNS, 'path');
		path.setAttributeNS(null, 'marker-end', 'url(#rcl)');
		path.setAttributeNS(null, 'd', this.d);
		path.setAttributeNS(null, 'stroke', this.stroke);
		path.setAttributeNS(null, 'stroke-width', this.strokeWidth);
		path.setAttributeNS(null, 'fill', this.fill);
		group.appendChild(path);
		
		break;
	}

}

/** @description Data Structure Implementation */
//Data Structure 
var UIDiagramList = { };+
//Data Structure Methods
/**@function
 * @description add diagram.
 * @param {UIDiagram} diagram
 */
UIDiagramList.addDiagram = function(diagram) {	
	this[diagram.id] = diagram;
}
/**@function
 * @description returns the active diagram.
 * @returns {UIDiagram} d
 */
UIDiagramList.returnActive = function() {
	for (d in this) {
		if (this[d].active === true) { return this[d]; }
	}
}