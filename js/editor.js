/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * File context description:
 * Bindings of initial events for interactive GUI,
 * Initial class instantiation
 *
 * Author: Sergey N. Bolshchikov
 * */

//User class instantiation
var currentUser = new User('sergey@bolshchikov.net', null);

//OPM classes instantiation
var activeOPMModel = new OPMModel(currentUser);
activeOPMModel.share(currentUser);
currentUser.addModel(activeOPMModel);
var activeOPMDiagram = activeOPMModel.sd;
activeOPMModel.addDiagram(activeOPMDiagram);


//UI classes instantiation
var activeUIDiagram = new UIDiagram('sd');
UIDiagramList.addDiagram(activeUIDiagram);
var activeUIElement = null;

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
	//Rename Model
	$('#model-rename').modal('show');
}

	