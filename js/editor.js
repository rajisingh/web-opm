var objectId = 0;
var processId = 0;
$(document).ready(function(){
	$('.dropdown-toggle').dropdown();
	$(".collapse").collapse();
	$('a[data-toggle="tab"]').on('shown', function (e) {
		  e.target // activated tab
		  e.relatedTarget // previous tab
	});
	$('.drag').draggable({
		containment: "#container-model"
	});
	$('.resize').resizable({
		ghost: true
	});
	$(".btn-slide").click(function(){
		$("#opl-panel").slideToggle("slow");
	});
	$(".header h2").editable("", {
		event: "dblclick",
		tooltip: "Double click to change the name"
	});
});

function addObject(){
	objectId++;
	$('.canvas').append("<div id='obj" + objectId + "' class='span1 object'><div><p>Object " + objectId + "</p></div></div>");
	$('#obj'+objectId).draggable({
		containment: "#container-model"
	});
	$('#obj'+objectId).resizable({
		ghost: true
	});
	$('#obj'+objectId+' p').editable("", {
		event: "dblclick",
		tooltip: "Double click to change the name"
	});
}

function addProcess(){
	processId++;
	$('.canvas').append("<div id='proc" + processId + "' class='span1 process'><div><p>Process " + processId + "</p></div></div>");
	$('#proc'+processId).draggable({
		// FIXME: bug of draggin' to the top
		containment: "#container-model"
	});
	$('#proc'+processId).resizable({
		ghost: true
	});
	$('#proc'+processId+' p').editable("", {
		event: "dblclick",
		tooltip: "Double click to change the name"
	});
}

function addState(){}

	