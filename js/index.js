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
	});;
});

function addObject(){
	objectId++;
	$('.row').append("<div id='obj" + objectId + "' class='span1 object'><p>Object " + objectId + "</p></div>");
	$('#obj'+objectId).draggable({
		containment: "#container-model"
	});
	$('#obj'+objectId).resizable({
		ghost: true
	});
}

function addProcess(){
	processId++;
	$('.row').append("<div id='proc" + processId + "' class='span1 process'><p>Process " + processId + "</p></div>");
	$('#proc'+processId).draggable({
		containment: "#container-model"
	});
}

function addState(){}

	