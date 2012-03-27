/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for GUI 
 * */

function selectedThing(id, type){
	this.id = id;
	this.type = type;
	this.x = null;
	this.y = null;
	this.rx = null;
	this.ry = null;
	this.width = null;
	this.height = null;
	this.transform = new Array(1, 0, 0, 1, 0, 0);
}
//Getters
selectedThing.prototype.getId = function(){
	return this.id
}
selectedThing.prototype.getX = function(){
	return this.x
}
selectedThing.prototype.getY = function(){
	return this.y
}
selectedThing.prototype.getRx = function(){
	return this.rx
}
selectedThing.prototype.getRy = function(){
	return this.ry
}
selectedThing.prototype.getWidth = function(){
	return this.width
}
selectedThing.prototype.getHeight = function(){
	return this.height
}

//Setters
selectedThing.prototype.setX = function(value){
	this.x = value
}
selectedThing.prototype.setY = function(value){
	this.y = value
}
selectedThing.prototype.setRx = function(value){
	this.rx = value
}
selectedThing.prototype.setRy = function(value){
	this.ry = value
}
selectedThing.prototype.setWidth = function(value){
	this.width = value
}
selectedThing.prototype.setHeight = function(value){
	this.height = value
}


function selectedLink(){}