var objectId = 0;
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
	$('.row').append("<div id='" + objectId + "' class='span1 object'><p>Object " + objectId + "</p></div>");
	$('#'+objectId).draggable({
		containment: "#container-model"
	});
	$('#'+objectId).resizable({
		ghost: true
	});
}


	