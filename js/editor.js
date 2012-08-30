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


//OPM classes initiation
var currentUser = new User('sergey@bolshchikov.net', null);						//User class instantiation
var partyOrder = new PartyOrder();												//Main DS
var testModelData = { creatorId: currentUser.id, loaderType: "empty" }//TODO: switch with LOAD request option here
var activeOPMModel = new OPMModel(testModelData);
activeOPMModel.share(currentUser.id);
currentUser.addModel(activeOPMModel.id);
var diagramData = { modelId: activeOPMModel.id, loaderType: "empty" }  //TODO: switch with LOAD request option here
var activeOPMDiagram = new OPMDiagram(diagramData);

//UI classes instantiation
var activeUIDiagram = new UIDiagram(activeOPMDiagram.id);
activeUIDiagram.draw();
//UIDiagramList.addDiagram(activeUIDiagram);
var activeUIElement = null;

var activeSVGDiagram = document.getElementById(activeOPMDiagram.id);
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
	//Rename Model
	$('#model-rename').modal('show');
}

/**@function
 * @description Load Model.
 */
function loadSpecModel(){
	//loads specific model from list
	var sel = document.getElementById("innerList");
	var sel2 = sel.options[sel.selectedIndex].value;
	currentUser.loadModel(sel2);
}