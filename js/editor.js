/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context:bindings of initial events for interactive GUI
 *
 * Author: Sergey N. Bolshchikov
 * */

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

	