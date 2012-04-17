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
	$('.drag').draggable({
		containment: "#container-model"
	});
	$('.resize').resizable({
		ghost: true
	});
	$(".btn-slide").click(function() {
		$("#opl-panel").slideToggle("slow");
	});
});

function rename() {
	$('#model-rename').modal('show');
}

	