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
	var activeOPMModel = null;
	var activeOPMDiagram = null;
	var activeUIDiagram = null;
	var activeSVGDiagram = null;
	var activeSVGElement = null;
	var activeUIElement = null;

function loadMain(pageLoader){
	if(pageLoader === null){
		pageLoader = new Object();
		pageLoader.type = 'newPage';
	}
	switch(pageLoader.type){
	case 'newPage':
		//OPM classes initiation
		var testModelData = new Object();
		testModelData.creatorId = currentUser.id;
		testModelData.loaderType = null;
		activeOPMModel = new OPMModel(testModelData);
		activeOPMModel.share(currentUser.id);
		currentUser.addModel(activeOPMModel.id);
		var diagramData = new Object();
		diagramData.modelId = activeOPMModel.id;
		diagramData.loaderType = null;
		activeOPMDiagram = new OPMDiagram(diagramData);		
		//UI classes instantiation
		var UIDiagramData = new Object();
		UIDiagramData.id = activeOPMDiagram.id;
		activeUIDiagram = new UIDiagram(UIDiagramData);
		activeUIDiagram.draw();
		//UIDiagramList.addDiagram(activeUIDiagram);
		var activeUIElement = null;
		
		activeSVGDiagram = document.getElementById(activeOPMDiagram.id);
		activeSVGElement = null;
		break;
	
	case "load":
		clearMain();
		 activeOPMModel = pageLoader.activeOPMModel;
		 activeOPMDiagram = pageLoader.activeOPMDiagram;
		
		 activeUIDiagram = new UIDiagram(activeOPMDiagram.id);
		 activeUIDiagram.draw();
		 activeUIElement = null;
		
		 activeSVGDiagram = document.getElementById(activeOPMDiagram.id);
		//loadElements();
		 activeSVGElement = null;
		break;
	}

}

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

function clearMain(){
	activeOPMModel = null;
	activeOPMDiagram = null;
	activeUIDiagram = null;
	activeSVGDiagram = null;
	activeSVGElement = null;
	activeUIElement = null;
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