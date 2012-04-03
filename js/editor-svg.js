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

var activeDiagram = document.getElementById('sd');
var objId = 0;

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function createSVGElement(root, element) {
	switch (element){
		case 'object':
			var element = document.createElementNS(svgNS, 'rect');
			element.setAttributeNS(null, 'x', randomFromTo(90, 1150));
			element.setAttributeNS(null, 'y', randomFromTo(5, 420));
			element.setAttributeNS(null, 'width', '110');
			element.setAttributeNS(null, 'height', '70');
			element.setAttributeNS(null, 'fill', 'white');
			element.setAttributeNS(null, 'stroke', 'limeGreen');
			element.setAttributeNS(null, 'stroke-width', '2');
			element.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(element);
			var elementName = document.createElementNS(svgNS, 'text');
			elementName.setAttributeNS(null, 'x', element.x.baseVal.value + 26);
			elementName.setAttributeNS(null, 'y', element.y.baseVal.value + 42);
			elementName.setAttributeNS(null, 'font-family', 'Helvetica');
			elementName.setAttributeNS(null, 'font-weight', 'bold');
			elementName.setAttributeNS(null, 'font-size', '15');	
			elementName.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			var caption = document.createTextNode('Object ' + objId);
			elementName.appendChild(caption);
			root.appendChild(elementName);
			var grip = document.createElementNS(svgNS, 'image');
			grip.setAttributeNS(null, 'x', element.x.baseVal.value + 100);
			grip.setAttributeNS(null, 'y', element.y.baseVal.value + 60);
			grip.setAttributeNS(null, 'width', '9');
			grip.setAttributeNS(null, 'height', '9');
			grip.setAttributeNS(xlinkNS, 'xlink:href', 'img/gripsmall-se.png');
			grip.setAttributeNS(null, 'onmouseover', 'cursorChange(evt)');
			root.appendChild(grip);
			break;
	}	 
}	
function addSVGObject() {
	objId++;
	var obj = document.createElementNS(svgNS, 'g');
	obj.setAttributeNS(null, 'id', 'obj' + objId);
	activeDiagram.appendChild(obj);
	createSVGElement(obj, 'object');
}

function cursorChange(evt) {
	var element = evt.target;
	switch (element.nodeName) {
		case 'rect':
			element.setAttributeNS(null, 'style', 'cursor: move');
			break;
		case 'image':
			element.setAttributeNS(null, 'style', 'cursor: se-resize');
			break;
		case 'text':
			element.setAttributeNS(null, 'style', 'cursor: pointer');
			break;
	}
}

/*
function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function init(svg) {
	/*Initial actions to be done
	 * right after the svg canvas is created
	var diagram = svg.group("sd");
	activeDiagram = "sd";
}

$(document).ready(function() {
//	$(".canvas").svg({onLoad: init});
});

var objId = 0;
function addObject() {
	alert("I see you");
	objId++;
	var svg = $(".canvas").svg("get");
	var obj = svg.group($("#" + activeDiagram), "obj" + objId, {transform: 'matrix(1 0 0 1 0 0)'});
	alert(obj);
	var xpos = randomFromTo(90, 1150);
	var ypos = randomFromTo(5, 420);
	svg.rect(obj, xpos, ypos, 110, 70, {fill: 'white', stroke: 'limeGreen', strokeWidth: '2'});
	svg.text(obj, xpos + 26, ypos + 42, "Object " + objId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
	svg.image(obj, xpos + 100, ypos + 60, 9, 9, 'img/gripsmall-se.png');
	
	//Binding methods to object
	$('#obj' + objId)
		.mousedown(draggingStart)
		.mouseover(cursorDragging);
	
	//Bind methods to resize icon
	$('#obj' + objId + ' image')
		.mousedown(resizingStart)
		.mouseover(cursorResizing);
	$('#obj' + objId + ' text').editable("", {
		event: 'dblclick'
	})
}

var prcId = 0;
function addProcess() {
	prcId++;
	var svg = $(".canvas").svg("get");
	var prc = svg.group($("#" + activeDiagram), "prc" + prcId, {transform: 'matrix(1 0 0 1 0 0)'});
	var xpos = randomFromTo(90, 1150);
	var ypos = randomFromTo(20, 420);
	svg.ellipse(prc, xpos, ypos, 60, 40, {fill: 'white', stroke: 'RoyalBlue', strokeWidth: '2'});
	svg.text(prc, xpos - 33, ypos + 6, "Process "+prcId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
	
	//Binding methods to process
	$('#prc' + prcId)
		.mousedown(draggingStart)
		.mouseover(cursorDragging);
}

var currentElement = null;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
function draggingStart(evt) {
	$(this).bind('mousemove', dragging);								//Bind method to enable dragging
	$('#' + this.id + ' rect').attr('fill', 'whiteSmoke');				//Change rect bg to represent activity
	$('#' + this.id + ' ellipse').attr('fill', 'whiteSmoke');			//Change rect bg to represent activity
	currentX = evt.pageX;												//Prepare for dragging
	currentY = evt.pageY;
	currentMatrix = $(this).attr('transform').slice(7, -1).split(' ');
	for (var i = 0; i < currentMatrix.length; i++)	{ currentMatrix[i] = parseFloat(currentMatrix[i]); }
}
function dragging(evt) {
	$(this).bind('mouseup', draggingStop);
	dx = evt.pageX - currentX;
	dy = evt.pageY - currentY;
	currentMatrix[4] += dx;
	currentMatrix[5] += dy;
	var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
	$(this).attr('transform', newMatrix);
	currentX = evt.pageX;
	currentY = evt.pageY;
}
function draggingStop(evt) {
	$(this).unbind('mousemove');
	$('#' + this.id + ' rect').attr('fill', 'white');
	$('#' + this.id + ' ellipse').attr('fill', 'white');	
}
function resizingStart() {
	var g  = $(this).parent();
	alert(g);
	alert(g.x.animVal.value);
}
function cursorDragging() {
	$(this).css('cursor', 'move');
}
function cursorResizing() {
	$(this).css('cursor', 'se-resize');
}
*/