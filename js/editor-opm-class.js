/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 *  Author: Sergey N. Bolshchikov
 * */

function OPMModel() {
	var modelID;
	var name;
	var type;
	var creatorID;
	var participants[];
	var sd[];
	var lastUpdateDate;
	var creationDate;
	
	function construct( modelID , creatorID ){
		this.modelID = modelID;
		this.creatorID = creatorID;
	}
	
	function getID(){
		return this.modelID;
	}
	
	function share( participants[] ){
		this.participants.push(participants[]);
	}
	
	function unShare( participant )
}
function OPMDiagram() {}
function OPMElement() {}
function OPMEntity() {}
function OPMThing(){}
function OPMObject() {}
function OPMProcess() {}