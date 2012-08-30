/**@fileOverview	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * File context description:
 * Bindings of initial events for interactive GUI,
 * Initial class instantiation
 *
 * @author Sergey N. Bolshchikov
 * */


var currentUser = new User('sergey@bolshchikov.net', null);						//User class instantiation
var partyOrder = new PartyOrder();												//Main DS
var activeOPMModel = new OPMModel(currentUser.id);
activeOPMModel.share(currentUser);
currentUser.addModel(activeOPMModel);
var activeOPMDiagram = new OPMDiagram(activeOPMModel.id);
activeOPMModel.addDiagram(activeOPMDiagram);


//UI classes instantiation
var activeUIDiagram = new UIDiagram('sd');
UIDiagramList.addDiagram(activeUIDiagram);
var activeUIElement = null;

var activeSVGDiagram = document.getElementById('sd');
var activeSVGElement = null;

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
/**@function
 * @description Rename Model.
 */
function rename() {
	$('#model-rename').modal('show');
}

	