/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for GUI
 * 
 *  Author: Sergey N. Bolshchikov
 * */


function UIDiagram(id) {
	this.id = id;
	this.transform = 'matrix(1 0 0 1 0 0)';
	this.active = true;
	this.elements = { };
}
UIDiagram.prototype.draw = function() {
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'type', 'diagram');
	group.setAttributeNS(null, 'transform', this.transform);
	svg.appendChild(group);
}
UIDiagram.prototype.addElement = function(element) {
	this.elements[element.id] = element;
}

function UIName(el) {
	//Class holding the name of any element
	this.x = null;
	this.y = null;
	this.fill = 'black';
	this.fontFamily = 'Helvetica';
	this.fontWeight = 'bold';
	this.fontSize = '15';
	switch(el.id.slice(0, 3)){
	case 'obj':
		this.value = 'Object ' + el.id.slice(3);
		break;
	case 'prc':
		this.value = 'Process ' + el.id.slice(3);
		break;
	case 'stt':
		this.value = 'State ' + el.id.slice(3);
	}
}
UIName.prototype.rename = function(newName) {
	this.value = newName;
}
UIName.prototype.updateLocation = function(newX, newY) {
	this.x = newX;
	this.y = newY;
}
UIName.prototype.updateFont = function(newFont) {
	this.fontFamily = newFont;
}
UIName.prototype.updateSize = function(newSize) {
	this.fontSize = newSize;
}
 
function UIObject(id) {
	this.id = 'obj' + id;
	this.x = randomFromTo(90, 1150);
	this.y = randomFromTo(5, 420);
	this.width = 110;
	this.height = 70;
	this.fill = 'white';
	this.stroke = 'limeGreen';
	this.strokeWidth = 2;
	this.name = new UIName(this);
	this.states = { }
}
UIObject.prototype.addState = function(state) {
	this.states[state.id] = state;
}
UIObject.prototype.draw = function() {
	//Draw a group first
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'type', 'object');
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
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
UIObject.prototype.updateLocation = function(newX, newY) {
	this.x = newX;
	this.y = newY;
}
UIObject.prototype.updateSize = function(newWidth, newHeight) {
	this.width = newWidth;
	this.height = newHeight;
}
UIObject.prototype.updateColor = function(color) {
	this.fill = color
}
UIObject.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	this.stroke = newStroke;
	if(newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}

function UIProcess(id) {
	this.id = 'prc'+ id;
	this.x = randomFromTo(90, 1150);
	this.y = randomFromTo(5, 420);
	this.rx = 60;
	this.ry = 40;
	this.fill = 'white';
	this.stroke = 'RoyalBlue';
	this.strokeWidth = 2;
	this.name = new UIName(this);
}
UIProcess.prototype.draw = function() {
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', this.id);
	group.setAttributeNS(null, 'type', 'process');
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
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
UIProcess.prototype.updateLocation = function(newX, newY) {
	this.cx = newX;
	this.cy = newY;
}
UIProcess.prototype.updateSize = function(newRx, newRy) {
	this.rx = newRx;
	this.ry = newRy;
}
UIProcess.prototype.updateColor = function(color) {
	this.fill = color
}
UIProcess.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	this.stroke = newStroke;
	if(newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}

function UIState(id) {
	this.id = 'stt' + id;
	this.x = x;
	this.y = y;
	this.rx = null;			//Change
	this.ry = null;			//Change
	this.width = null;		//Change to real digits
	this.height = null; 	//Change to real digits
	this.fill = 'white';
	this.stroke = null;
	this.strokeWidth = 2
}
UIState.prototype.updateLocation = function(newX, newY) {
	this.x = newX;
	this.y = newY;
}
UIState.prototype.updateSize = function(newRx, newRy, newWidth, newHeight) {
	this.rx = newRx;
	this.ry = newRy;
	this.width = newWidth;
	this.height = newHeight;
}
UIState.prototype.updateColor = function(color) {
	this.fill = color;
}
UIState.prototype.updateBorder = function(newStroke, newStrokeWidth) {
	this.stroke = newStroke;
	if(newStrokeWidth) { this.strokeWidth = newStrokeWidth; }
}
function UILink(d) {
	this.d = d;
	this.fill = 'none';
	this.stroke = 'black';
	this.strokeWidth = 3;
}
UILink.prototype.updateLink = function(newD) {
	this.d = newD;
}
UILink.prototype.updateColor = function(color) {
	this.stroke = color;
}

//Data Structure Implementation
//Data Structure 
var UIDiagramList = { };
//Data Structure Methods
UIDiagramList.addDiagram = function(diagram) {	
	this[diagram.id] = diagram;
}
UIDiagramList.returnActive = function() {
	for (d in this) {
		if (this[d].active === true) { return this[d]; }
	}
}
// Data Structure Initialization
var diag = new UIDiagram('sd');
UIDiagramList[diag.id] = diag;