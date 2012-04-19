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

function UIName(x, y) {
	//Class holding the name of any element
	this.x = x;
	this.y = y;
	this.fill = black;
	this.fontFamily = 'Helvetica';
	this.fontWeight = 'bold';
	this.fontSize = '15';
	this.value = null;
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
 
function UIObject(x, y) {}
function UIProcess(cx, cy, rx, ry) {}
function UIState() {}
function UILink() {}