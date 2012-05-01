/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 *  Author: Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 * */
<script>

// OPM Model Class
function OPMModel( modelIDVal , creatorIDVal , creationDate ) {
  
  if ( ( typeof modelIDVal !== int ) && ( typeof creatorIDVal !== int ) ){
    throw "invalid input type. check modelIDVal and creatorIDVal"; //Throw exception if data type is incorrect
  }
  
  this.modelID = modelIDVal;
  this.creatorID = creatorIDVal;
  this.name = 'Model Name';
  this.type = null;
  this.participants = null;
  this.sd = null;
  this.lastUpdateDate = null;
  this.creationDate = creationDate;
  this.modelID = modelIDVal;
  this.creatorID = creatorIDVal;
}

OPMModel.prototype.getID = function(){
  return this.modelID;
}
	
OPMModel.prototype.share = function( participants[] ){
  if ( participants === null ){
    participants = new Array();
  }
  this.participants.push(participants[]);
  return;
}
  
OPMModel.prototype.getParticipants = function(){
  if ( this.participants === null ){
    return "no participating users";
  }
  return this.participatns;
}
  
OPMModel.prototype.unShare = function( p ){
  var x = participants.indexOf( p );
  if ( x === -1 ){
    throw "cannot find collaborator ID. please try again.";
  }
  var temp = participants[ ( participants.length() ) - 1 ];
  participants[ ( participants.length() ) - 1 ] = participants [ x ];
  participants[ x ] = temp;
  var garbage = participants.pop();
}
	
OPMModel.prototype.getName = function(){
	return this.name;	  
}
	
OPMModel.prototype.setName = function( name ){
	this.name = name;
}
	
OPMModel.prototype.getType = function(){
	return this.type;
}
	
OPMModel.prototype.setType = function( type ){
	this.type=type;
}
	
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
  try {
    if (anything_wrong === true){
    throw "unable to delete model, please try again";
    }
  }
}


// OPM Diagram Class
function OPMDiagram() {
	
	
	var predecessor;
	var successors;
	var elements;
	var diagramName;
	var OPL;
	var number;
	
	
	function getOPD(){
		//
	}
	
	function print(){
		//need implementation of print procedure.
	}
	
	function renumber(number){
		try{
			if(typeof name !== int){
				throw "invalid input type, please insert a number.";
			}
		}
		this.number=number;
	}
	
	function getOPL(){
		if (this.OPL === null){
			return "Empty";
		}
		return this.OPL;
	}
	
	function writeOPL(text){
		this.OPL=text;
	}
	
	function destructor(){
		//need procedure for deleting Model from database, including all children.
	    try {
	      if (anything_wrong === true){
	      throw "unable to delete model, please try again";
	      }
	    }	
	}
}


// OPM Element Class
function OPMElement() {}


// OPM Entity Class
function OPMEntity() {}

// OPM thing Class
function OPMThing(){}

// OPM Object Class
function OPMObject() {}

// OPM Process Class
function OPMProcess() {}

// OPM Link Class
function OPMLink() {}

// OPM procedural Link Class
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