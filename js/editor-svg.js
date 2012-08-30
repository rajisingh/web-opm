/**@fileOverview	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of functions for work w/ SVG canvas
 * 
 * @author Sergey N. Bolshchikov  
 * */


var svg = document.getElementsByTagName('svg')[0];
var svgNS = svg.getAttribute('xmlns');
var xlinkNS = svg.getAttribute('xmlns:xlink');

var currentX = 0;
var currentY = 0;
var currentMatrix = 0;


/**@function
 * @description add object.
 */
var addObject = function() {
	try {
		var OPMObjectData = { parentId: activeOPMDiagram.id, loaderType: "test" }//TODO: change when LOADING
		var opmobj = new OPMObject(OPMObjectData);
		if (activeSVGElement !== null) { deselect(); }
		var obj = new UIObject(opmobj);
		obj.draw();
		activeUIDiagram.addElement(obj);
	}
	catch(e) {
		alert(e.message);
	}
}

/**@function
 * @description add process.
 */
var addProcess = function() {
	try {
		var OPMProcessData = { parentId: activeOPMDiagram.id, loaderType: "test" }//TODO: change when LOADING
		var opmprc = new OPMProcess(OPMProcessData);
		if (activeSVGElement !== null) { deselect(); }
		var prc = new UIProcess(opmprc);
		prc.draw();
		activeUIDiagram.addElement(prc);
	}
	catch(e) {
		alert(e.message);
	}
}
/**@function
 * @description add state.
 */
var addState = function() {
	try {
		//Check
		if (activeSVGElement === null) {
			var err = new Error("Please, click on the relevant object first");
			throw err;
		}
		else {
			var type = activeSVGElement.getAttributeNS(null, 'type');
			if (type == 'process') {
				var err = new Error("Process cannot have a state");
				throw err;
			}
			
			
			var parent = partyOrder.get(activeUIElement.id);
			var OPMStateData = { parentId: parent, loaderType: "test" }//TODO: add LOADING option here
			var opmstt = new OPMState(OPMStateData);
			
			var stt = new UIState(activeUIElement, opmstt);
			activeUIElement.addState(stt);
			stt.draw();
		}			
	}
	catch(e) {
		alert(e.message);
	}
}


/*Source and Destination are determined according to 
 * events of the mouse on elements*/
var src = null;
var dest = null;

/**@function
 * @description Flag that the link is on/off and its type.
 */
var linkOn = {
		status: false,
		type: null,
		off: function() {
			this.status = false;
			this.type = null;
			}
};
/**@function
 * @description change the state of link.
 */
var turnLinkOn = function(type) {
	if(activeSVGElement) { deselect(); }
	linkOn.status = true;
	linkOn.type = type;
}
/**@function
 * @description add link.
 * @param {OPMThing} src
 * @param {OPMThing} dest
 */
var addLink = function(src, dest) {
	try {		
		switch(linkOn.type) {
		case 'udr':
			var OPMStructLinkData = { parentId: activeOPMDiagram.id, loaderType: "test" }
			var opmlink = new OPMStructuralLink(OPMStructLinkData);
			opmlink.setType('Unidirectional');
			opmlink.setSource(partyOrder.get(src.id));
			opmlink.setDestination(partyOrder.get(dest.id));
			if (opmlink.verifyLink()) {
				var lnk = new UILink(opmlink);
				lnk.draw(src, dest);
				activeUIDiagram.addElement(lnk);
				opmlink.source.addLink(opmlink);
				opmlink.destination.addLink(opmlink);
				partyOrder.add(opmlink);
				var msg = new Message('createStructuralLinkInstance', opmlink, currentUser.id);
				msg.send();
				linkOn.off();
			}
			else {
				delete opmlink;
				linkOn.off();
				var err = new Error("You can't do it! Unidirectional relation can connect only objects or states.");
				throw err;
			}
			break;
			
		case 'rcl':
			var OPMProcLinkData = { parentId: activeOPMDiagram.id, loaderType: "test" }
			var opmlink = new OPMProceduralLink(OPMProcLinkData);
			opmlink.setType('Result-Consumption');
			opmlink.setSource(partyOrder.get(src.id));
			opmlink.setDestination(partyOrder.get(dest.id));			
			
			if (opmlink.verifyLink()) {
				var lnk = new UILink(opmlink);
				lnk.draw(src, dest);
				activeUIDiagram.addElement(lnk);
				opmlink.source.addLink(opmlink);
				opmlink.destination.addLink(opmlink);
				partyOrder.add(opmlink);
				var msg = new Message('createProceduralLinkInstance', opmlink, currentUser.id);
				msg.send();
				linkOn.off();
			}
			else {
				delete opmlink;
				linkOn.off();
				var err = new Error("You can't do it! Result-Consumption link connects only process with object or state");
				throw err;
			}
			break;
		}
	}
	catch(e) {
		alert(e.message);
	}
}

/**@function
 * @description diagram zoom.
 * @param {number} scale
 */
var diagramZoom = function(scale) {
	deselect();
	var diagramWidth = activeSVGDiagram.getBBox().width + 2;
	var diagramHeight = activeSVGDiagram.getBBox().height + 2;
	var scaleMatrix = activeSVGDiagram.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] = parseFloat(scaleMatrix[i]); }
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] *= scale; }
	scaleMatrix[4] += (1 - scale) * diagramWidth/2;
	scaleMatrix[5] += (1 - scale) * diagramHeight/2;
	var newMatrix = "matrix(" + scaleMatrix.join(' ') + ")";
	activeSVGDiagram.setAttributeNS(null, 'transform', newMatrix);
}