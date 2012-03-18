var active_diagram;
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}
function init(svg){
	/*Initial actions to be done
	 * right after the svg canvas is created*/
	var diagram = svg.group("sd");
	active_diagram = "sd";
}

$(document).ready(function(){
	$(".canvas").svg({onLoad: init});
});

var objId = 0
function addObject(){
	objId++;
	var svg = $(".canvas").svg("get");
	svg.group($("#"+active_diagram), "obj"+objId);
	xpos = randomFromTo(90, 1150);
	ypos = randomFromTo(5, 420);
	svg.rect($("#obj"+objId), xpos, ypos, 110, 70, {fill: 'none', stroke: 'limeGreen', strokeWidth: '2'});
	svg.text($("#obj"+objId), xpos+26, ypos+42, "Object "+objId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
	
/*
	$("#obj"+objId)
		.draggable()
		.bind('mousedown', function(event, ui){
			$(event.target.parentElement).append(event.target);
		})
		.bind('drag', function(event, ui){
			event.target.setAttribute('x', ui.position.left);
			event.target.setAttribute('y', ui.position.top);
		})
*/
}

var procId = 0;
function addProcess(){
	procId++;
	var svg = $(".canvas").svg("get");
	svg.group($("#"+active_diagram), "proc"+procId);
	xpos = randomFromTo(90, 1150);
	ypos = randomFromTo(20, 420);
	svg.ellipse($("#proc"+procId), xpos, ypos, 60, 40, {fill: 'none', stroke: 'RoyalBlue', strokeWidth: '2'});
	svg.text($("#proc"+procId), xpos-33, ypos+6, "Process "+procId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
}