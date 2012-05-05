/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 *   Authors: Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 * */
<script>

//START OF OPMModel CLASS//
function OPMModel( modelIDVal , creatorIDVal , creationDate ) {
  
  if ( ( typeof modelIDVal !== int ) && ( typeof creatorIDVal !== int ) ){
    throw "invalid input type. check modelIDVal and creatorIDVal"; //Throw exception if data type is incorrect
  }
  
  this.modelID = modelIDVal;
  this.creatorID = creatorIDVal;
  this.name = 'Model Name'; //default value
  this.type = null;
  this.participants = {};
  this.sd = null;
  this.lastUpdateDate = null;
  this.creationDate = creationDate;
  
  //TODO: call JSON function for updating new details on new model in DB
}

//return the modelID of specific ID
OPMModel.prototype.getID = function(){ 
  return this.modelID;
}
 
//share model with additional users
OPMModel.prototype.share = function( newUser ){ 
  this.participants[ newUser.ID ] = newUser;
  //TODO: add call to JSON function to send to server
  return;
}

//returns a list of users with permissions to edit this Model
OPMModel.prototype.getParticipants = function(){
  if ( this.participants === null ){
    return "no participating users";
  }
  return this.participants;
}

//removes a specific user from the participants list
OPMModel.prototype.unShare = function( p ){
  var x = this.participants.indexOf( p );
  if ( x === -1 ){
    throw "cannot find collaborator ID. please try again.";
  }
  var temp = participants[ ( participants.length() ) - 1 ]; // Swap-n-Pop the userID from the participant list
  participants[ ( participants.length() ) - 1 ] = participants [ x ];
  participants[ x ] = temp;
  var garbage = participants.pop();
  delete garbage;
}
 
//returns the Model's name
OPMModel.prototype.getName = function(){
	return this.name;	  
}
 
//sets the Model's name in the GUI and the DB
OPMModel.prototype.setName = function( name ){
	this.name = name;
  //TODO: add JSON function for setting new model Name in DB
}
 
//returns Model's Type
OPMModel.prototype.getType = function(){
	return this.type;
}
	
//sets Model's Type in the GUI and DB
OPMModel.prototype.setType = function( type ){
	this.type = type;
  //TODO: add JSON function for setting model Type in DB
}
 
//remove model from user's model list including all siblings in the GUI and DB
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
  var answer = confirm ("You are about to Completely remove\n all Model diagrams. Are you sure you wish to continue?")
  if (answer){
    try {
      if (anything_wrong === true){
        throw "unable to delete model, please try again";
      }
      delete this; //TODO: is this expression true??
    }
  }
  else{
    return;
  }
}
//END OF OPMModel CLASS//

//START OF OPMDiagram CLASS//
function OPMDiagram(){
	
  this.predecessor = {};
  this.successors = {};
  this.elements = {};
	this.diagramName = 'Diagram Name';//default value
	this.OPL = null;
  this.number = {}; //need a default definition here.
}
 
OPMDiagram.prototype.addElement = function( element ){
  this.elements[ element.ID ] = element;
  return;
}
 
OPMDiagram.prototype.getElements = function(){
	return this.elements;
 }
	
OPMDiagram.prototype.print = function(){
		//need implementation of print procedure.
 }
	
 OPMDiagram.prototype.renumber = function( number ){
	 try{
		 if(typeof number !== int){
			throw "invalid input type, please insert a number.";
		 }
	 }
	this.number = number;
 }
	
 OPMDiagram.prototype.getOPL = function(){
		if (this.OPL === null){
			return "Empty";
		}
		return this.OPL;
	}
	
OPMDiagram.prototype.writeOPL = function( text ){
	 this.OPL = text;
 }
	
OPMDiagram.prototype.destructor = function(){
	 //need procedure for deleting Model from database, including all children.
	  try {
	    if (anything_wrong === true){
	    throw "unable to delete model, please try again";
	    }
	  }	
 }

//END OF OPMDiagram CLASS//

//START OF OPMElement CLASS//
function OPMElement() {}
//END OF OPMElement CLASS//

//START OF OPMEntity CLASS//
function OPMEntity() {}
//END OF OPMEntity CLASS//

//START OF OPMThing CLASS//
function OPMThing(){}
//END OF OPMThing CLASS//

//START OF OPMObject CLASS//
function OPMObject() {}
//END OF OPMObject CLASS//

//START OF OPMProcess CLASS//
function OPMProcess() {}
//END OF OPMProcess CLASS//

//START OF OPMLink CLASS//
function OPMLink() {}
//END OF OPMLink CLASS//

//START OF OPMProcedural_Link CLASS//
function OPMProcedural_Link() {
	
	var source;
	var destination;
	var description;
	var originType;
	
	
	function getDest() {}
	
	function setDest() {}
	
	function getSource() {}
	
	function setSource() {}
	
	function getOriginType(){
		return this.originType;
	}
	
	function setOriginType(bool){
		this.originType = bool;
	}
	
	function destructor() {
		//need procedure for deleting Model from database, including all children.
	    try {
	      if (anything_wrong === true){
	      throw "unable to delete model, please try again";
	      }
	    }	
	}
}
//END OF OPMProcedural_Link CLASS//

// OPM Structural Link Class
function OPMStructural_Link() {
	
	var source;
	var destination;
	var participationConst;
	var participationVal;
	var cardinality;
	var tag;
	
	function getTag(){
		if (this.tag===null){
			return "Empty";
		}
		retun this.tag;
	}
	
	function setTag(text){
		this.tag=text;
	}
	
	function getParticipationConst(){
		if (this.participationConst===null){
			return "Empty";
		}
		return this.participationConst;
	}
	
	function setParticipationConst(){}
	
	function getParticipationVal(){
		if (this.participationVal===null){
			return "Empty";
		}
		return this.participationVal;
	}
	
	function setParticipationVal(){}
	
	function getCardinality(){
		return this.cardinality;
	}
	
	function setCardinality(){}
	
	function getDestination(){}
	
	function setDestination(){}
	
	function getSource(){}
	
	function setSource(){}
	
	function destructor() {
		//need procedure for deleting Model from database, including all children.
	    try {
	      if (anything_wrong === true){
	      throw "unable to delete model, please try again";
	      }
	    }	
	
	}
	
}


</script>