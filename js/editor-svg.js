/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains functions for work w/ SVG canvas 
 * 	via jQuery SVG library  
 * */

var activeDiagram;
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function init(svg){
	/*Initial actions to be done
	 * right after the svg canvas is created*/
	var diagram = svg.group("sd");
	activeDiagram = "sd";
}

$(document).ready(function(){
	$(".canvas").svg({onLoad: init});
});

var objId = 0
function addObject(){
	objId++;
	var svg = $(".canvas").svg("get");
	var obj = svg.group($("#"+activeDiagram), "obj"+objId, {transform: 'matrix(1 0 0 1 0 0)'});
	xpos = randomFromTo(90, 1150);
	ypos = randomFromTo(5, 420);
	svg.rect(obj, xpos, ypos, 110, 70, {fill: 'white', stroke: 'limeGreen', strokeWidth: '2'});
	svg.text(obj, xpos+26, ypos+42, "Object "+objId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
	
	//Binding methods to object
	$(obj)
		.mousedown(select)
		.mouseover(pointer);
}

var procId = 0;
function addProcess(){
	procId++;
	var svg = $(".canvas").svg("get");
	var proc = svg.group($("#"+activeDiagram), "proc"+procId, {transform: 'matrix(1 0 0 1 0 0)'});
	xpos = randomFromTo(90, 1150);
	ypos = randomFromTo(20, 420);
	svg.ellipse($("#proc"+procId), xpos, ypos, 60, 40, {fill: 'white', stroke: 'RoyalBlue', strokeWidth: '2'});
	svg.text($("#proc"+procId), xpos-33, ypos+6, "Process "+procId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
	
	//Binding methods to process
	$(proc)
		.mousedown(select)
		.mouseover(pointer);
}

var selectedElement;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
function select(evt){
	$(this).bind('mousemove', dragging);
	selectedElement = evt.target;
	currentX = evt.pageX;
	currentY = evt.pageY;
	currentMatrix = $(this).attr('transform').slice(7, -1).split(' ');
	for (var i=0; i<currentMatrix.length; i++)	{ currentMatrix[i] = parseFloat(currentMatrix[i]); }

}
function dragging(evt){
	$(this).bind('mouseup', deselect);
	dx = evt.pageX - currentX;
	dy = evt.pageY - currentY;
	currentMatrix[4] += dx;
	currentMatrix[5] += dy;
	var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
	$(this).attr('transform', newMatrix);
	currentX = evt.pageX;
	currentY = evt.pageY;
}
function deselect(evt){
	$(this).unbind('mousemove');
}
function pointer(){
	$(this).css('cursor', 'pointer');
}