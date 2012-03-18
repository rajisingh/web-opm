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

	