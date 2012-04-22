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

//FIXME: Extract common methods into one function and inherit from her

function UIDiagram(id) {
	this.id = id;
	this.width = null;
	this.height = null;
	this.transform = null;
	this.elements = { };
}
UIDiagram.prototype.addElement = function(element) {
	this.elements[element.id] = element;
}

function UIGroup(id) {
	//Group consist of 3 elements: shape(obj, prc, stt), name and grip icon
	this.id = id;
	this.tranform = null;
	this.shape = null;
	this.name = null;
	this.grip = 'img/gripsmall-se.png';
}
UIGroup.prototype.setShape = function(shape) {
	this.shape = shape;
}
UIGroup.prototype.setName = function(name) {
	this.name = name;
}

function UIName(obj) {
	//Class holding the name of any element
	this.x = obj.x + 26;
	this.y = obj.y + 42;
	this.fill = 'black';
	this.fontFamily = 'Helvetica';
	this.fontWeight = 'bold';
	this.fontSize = '15';
	switch(obj.id.slice(0, 3)){
	case 'obj':
		this.value = 'Object ' + obj.id.slice(3);
		break;
	case 'prc':
		this.value = 'Process ' + obj.id.slice(3);
		break;
	case 'stt':
		this.value = 'State ' + obj.id.slice(3);
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
}
UIObject.prototype.draw = function() {
	//Draw a group first
	var group = document.createElementNS(svgNS, 'g');
	group.setAttributeNS(null, 'id', 'obj' + objId);
	group.setAttributeNS(null, 'type', 'object');
	group.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
	group.setAttributeNS(null, 'onclick', 'select(evt)');
	activeDiagram.appendChild(group);
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

function UIProcess(cx, cy) {
	this.cx = cx;
	this.cy = cy;
	this.rx = 60;
	this.ry = 40;
	this.fill = 'white';
	this.stroke = 'RoyalBlue';
	this.strokeWidth = 2
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
function UIState(x, y) {
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