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
function User( id , email , password ){
  this.id = id;
  this.username = null;
  this.alienLogin = null;
  this.email = email;
  this.firstName = null;
  this.lastName = null;
  this.password = password;
  this.models = { };
  this.lastLogin = null; //timestamp
  this.loginStatus = null; //boolean
}

//retrieve list of models by user's ID
User.prototype.getModels = function( ){
  //call JSON function and receives list of all Model IDs of this user.
  return this.models;
}

User.prototype.deleteModel = function( model ){
  try{
    delete this.models[ model.id ];
    model.destructor();
  }
  catch( err ){
    txt="There was an error deleting the Model.\n\n";
    txt+="Error description: " + err.message + "\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
  }
}

User.prototype.login = function( userId, pass ){
  //call FB/Google/LinkedIn/Twitter login algorithm and process via Python?
}

User.prototype.logout = function(){//receives model object
  this.loginStatus = 0;
}

//replace user's first and last name
User.prototype.changeName = function ( newFirstName , newLastName ){
  this.firstName = newFirstName;
  this.lastName = newLastName;
}

//replace existing user's email with new one
User.prototype.changeEmail = function( newEmail ){
  this.email = newEmail;
}

//sets the last login timestamp
User.prototype.updateLastLogin = function( timestamp ){
  this.lastLogin = timestamp;
}

//returns user's last login timestamp
User.prototype.getLastLogin = function(){
  return this.lastLogin;
}

//allows setting last login time
User.prototype.setLastLogin = function( timestamp ){
  this.lastLogin = timestamp;
}

//returns user's full name
User.prototype.getName = function(){
  var x = this.firstName;
  var y = this.lastName;
  return x + " " + y;
}

//START OF OPMModel CLASS//
function OPMModel( modelId , creatorId , creationDate , mainSdDiagId ) {
  
  this.modelId = modelId;
  this.creatorId = creatorId;
  this.name = 'Model Name'; //default value
  this.type = null;
  this.participants = { };
  this.sd = new OPMDiagram( mainSdDiagId , 0 );//create first SD for model, with level=0
  this.diagrams = { };//hashtable with diagrams in model
  this.lastUpdateDate = null;
  this.creationDate = creationDate;
  
  //TODO: call JSON function for updating new details on new model in DB
}

//return the modelID of specific ID
OPMModel.prototype.getId = function(){ 
  return this.modelId;
}
 
//share model with additional users
OPMModel.prototype.share = function( newUser ){ 
  this.participants[ newUser.id ] = newUser;
  //TODO: add call to JSON function to send to server
}

//returns a list of users with permissions to edit this Model
OPMModel.prototype.getParticipants = function(){
  return this.participants;
}

//removes a specific user from the participants list
OPMModel.prototype.unShare = function( userId ){
  delete this.participants[ userId ];
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

//adds diagram id to diagram of the model
OPMModel.prototype.addDiagram = function( diagram ){
  this.diagrams[ diagram.id ] = diagram;
}

//returns list of all diagrams in model
OPMModel.prototype.getDiagrams = function(){
  return this.diagrams;
}

//removes diagram for diagram list
OPMModel.prototype.removeDiagram = function( diagramId ){
  delete this.diagrams[ diagramId ];
}

//sets Model's Type in the GUI and DB
OPMModel.prototype.setType = function( type ){
	this.type = type;
  //TODO: add JSON function for setting model Type in DB
}

OPMModel.prototype.save = function (){
  // need procedure for saving a model to DB
}

OPMModel.prototype.load = function ( ){
  // need procedure for loading a model from DB
}

//remove model from user's model list including all siblings in the GUI and DB
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
  var answer = confirm ( "You are about to Completely remove\n all Model diagrams. Are you sure you wish to continue?" )
  if (answer){
    try {
      delete this; //FIXME: is this expression true??
    }
    catch( err ){
      txt="There was an error deleting the model.\n\n";
      txt+="Error description: " + err.message + "\n\n";
      txt+="Click OK to continue.\n\n";
      alert(txt);
    }
  }
}
//END OF OPMModel CLASS//

//START OF OPMDiagram CLASS//
function OPMDiagram( id , predecessor , level ){
	
  this.id = id;
  this.predecessor = predecessor;//Diagram object of the "father", can be null
  this.successors = { };//hashtable of successors
  this.elements = { };
  this.diagramName = 'Diagram Name';//default value
  this.OPL = null;
  this.level = level; //int
}
 
OPMDiagram.prototype.addElement = function( element ) {
  this.elements[ element.Id ] = element;
}
 
OPMDiagram.prototype.getElements = function(){
  return this.elements;
}
	
OPMDiagram.prototype.print = function(){
  //need implementation of print procedure.
  //including XML function
 }
//recursively reassignes levels to entire diagrams (nodes) in the tree.	
OPMDiagram.prototype.reLevel = function( levels ){
  try{
    this.level = this.level + levels;
    this.successors.level = this.successors.reLevel( levels );
  }
  catch( err ){
    txt="There was an error deleting the model.\n\n";
    txt+="Error description: " + err.message + "\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
  }
}
	
OPMDiagram.prototype.getOPL = function(){
  return this.OPL;
 }
	
OPMDiagram.prototype.writeOPL = function( text ){
  //TODO: need to think of a more clever way to add text to the OPL.
  //changes to OPL are done per element creation. therefor, at each creation of each type of element
  //we'll need an OPL "generator".
 }
	
OPMDiagram.prototype.destructor = function(){
  //need procedure for deleting diagram from database, including all children.
  if (answer){
    try{  
      delete this;
    }
    catch( err ){
      txt="There was an error deleting the model.\n\n";
      txt+="Error description: " + err.message + "\n\n";
      txt+="Click OK to continue.\n\n";
      alert(txt);
    }
  }
  //call destructor function of each element in diagram
}

//END OF OPMDiagram CLASS//

//START OF OPMElement CLASS//
function OPMElement( id ) {
  this.id = id;
  this.description = null;
}

OPMElement.prototype.getId = function(){
  return this.id;
}

OPMElement.prototype.getDescription = function(){
  return this.description;
  
}

OPMElement.prototype.setDescription = function( description ){
  this.description = description;
  
}
//END OF OPMElement CLASS//

//START OF OPMEntity CLASS//
OPMEntity.prototype = new OPMElement(); //inheriting from OPMElement
function OPMEntity() {
  this.name = null;
  this.inLinks = { };//hashtable - keys are source of links
  this.outLinks = { };//hashtable - keys are destination of links
}

OPMEntity.prototype.getName = function(){
  return this.name;
}

OPMEntity.prototype.setName = function( name ){
  this.name = name;
}

OPMEntity.prototype.addLink = function( link ){
  if ( link.verifyLink ( link.source , link.destination ) ){
    if ( link.source.id === this.id ){
      this.outLinks[ link.id ] = link;
    }
    else{
      this.inLinks[ link.id ] = link;
    }
  }
  //TODO: DB update function needed
}

OPMEntity.prototype.removeLink = function( linkId ){
  try{
    delete this.inLinks[ linkId ].source.outLinks[ linkId ];
    delete this.outLinks[ linkId ].destination.inLinks[ linkId ];
    delete this.inLinks[ linkId ];
    delete this.outLinks[ linkId ];
  }
  catch ( err ){
    txt="There was an error deleting the link.\n\n";
    txt+="Error description: " + err.message + "\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
  }

OPMEntity.prototype.destructor = function(){
  this.removeLink( inLinks );
  this.removeLink( outLinks );
  delete this;
}
  //TODO: DB update function needed
}

//END OF OPMEntity CLASS//

//START OF OPMThing CLASS//
OPMThing.prototype = new OPMEntity(); // inheriting from OPMEntity 
function OPMThing(){
  this.essence = null;
  this.affiliation = null;
  this.scope = null;
  this.unfoldDiag = { };
  this.inzoomDiag = { };
}

OPMThing.prototype.getEssence = function(){
  return this.essence;
}

OPMThing.prototype.setEssence = function( ess ){
  this.essence = ess;
    //TODO: send data through JSON to DB and server
}

OPMThing.prototype.getAffiliation = function(){
  return this.affiliation;
}

OPMThing.prototype.setAffiliation = function( affil ){
  this.affiliation = affil;

  //TODO: send data through JSON to DB and server
}

OPMThing.prototype.getScope = function(){
  return this.scope;
}

OPMThing.prototype.setScope = function( scope ){
  this.scope = scope;
  //TODO: send data through JSON to DB and server
}
//unfold object/process
OPMThing.prototype.unfold = function( id , currDiagLevel , fatherDiag ){
  this.unfoldDiag = new OPMDiagram( id , currDiagLevel + 1 , fatherDiag );
  this.unfoldDiag.elements[ this.id ] = this;//add current element to new unfolded diagram
  return this.unfoldDiag;
}

//inzoom object/process, returns new Diagram object
OPMThing.prototype.inzoom = function( id , currDiagLevel , fatherDiag ){
  this.inzoomdDiag = new OPMDiagram( id , currDiagLevel + 1 , fatherDiag );
  this.inzoomDiag.elements[ this.id ] = this;//add current element to new inzoomed diagram
  return this.inzoomDiag;
}
//END OF OPMThing CLASS//

//START OF OPMObject CLASS//
OPMObject.prototype = new OPMThing();
function OPMObject() {
  this.states = { };
  this.initValue = null;
  this.objectType = null;
}

OPMObject.prototype.addState = function( state){
  this.states[ state.Id ] = state; 
}

OPMObject.prototype.removeState = function( state ){//TODO: change to Hash table procedure
  delete this.states[ state.Id ];
}

//END OF OPMObject CLASS//


//START OF OPMProcess CLASS//
OPMProcess.prototype = new OPMThing();
function OPMProcess() {
  this.minActivationTime = null;
  this.maxActivationTime = null;
//  this.inProcedualLinksRelationMatrix = null;
//  this.things = { };
}

OPMProcess.prototype.getMinActivationTime = function(){
  return this.minActivationTime;
}

OPMProcess.prototype.setMinActivationTime = function( minTime ){
  this.minActivationTime = minTime;
}

OPMProcess.prototype.getMaxActivationTime = function(){
  return this.maxActivationTime;
}

OPMProcess.prototype.setMaxActivationTime = function(maxTime){
  this.maxActivationTime = maxTime;
}
/*
OPMProcess.prototype.getInProcedualLinksRelationMatrix = function(){
  return this.inProcedualLinksRelationMatrix;
}

//not too sure about the implimentation of this function, check the class diagram.
OPMProcess.prototype.setInProcedualLinksRelationMatrix = function(matrix){
  this.inProcedualLinksRelationMatrix = matrix;
  return;
}
*/
OPMProcess.prototype.destructor = function(){
  //need destructor procedure
}   
//END OF OPMProcess CLASS//

//START OF OPMState CLASS//

OPMState.prototype = new OPMEntity();
function OPMState( parent ) {
  this.type = null;//final, default, initial
  this.parent = parent;
  this.minActivationTime = 0;
  this.maxActivationTime = 0;
}

OPMState.prototype.getType = function(){
  return this.type;
}  

OPMState.prototype.setType = function(type){
  this.type = type;
}

OPMState.prototype.getMinActivationTime = function(){
  return this.minActivationTime;
}

OPMState.prototype.setMinActivationTime = function( minTime ){
  this.minActivationTime = minTime;
}

OPMState.prototype.getMaxActivationTime = function(){
  return this.maxActivationTime;
}

OPMState.prototype.setMaxActivationTime = function( maxTime ){
  this.maxActivationTime = maxTime;
}

//END OF OPMState CLASS//

//START OF OPMLink CLASS//

OPMLink.prototype = new OPMElement();
function OPMLink( type , category ) {
  this.type = type;//types are strings, some values: "Instrument", "Agent" etc.
  this.category = category;// Categories are strings, two values: "Structural" and "Procedural"
}

OPMLink.prototype.getType = function(){
  return this.type;
}

OPMLink.prototype.getCategory = function(){
  return this.category;
}

OPMLink.prototype.setCategory = function( category ){
  this.category = category;
}
//END OF OPMLink CLASS//


//START OF OPMProcedural_Link CLASS//

OPMProceduralLink.prototype = new OPMLink();
function OPMProceduralLink( src , dest ) {//input source and destination Objects
  this.source = src;
  this.destination = dest;
  this.originType = this.source.type; //default value
  this.xor = { };
  this.or = { };
}

OPMProceduralLink.prototype.verifyLink = function(){
  //check for existing type of structural link between two entities
  if ( src.outLinks[ dest.id ].category ===  dest.inLinks[ src.id ].category ){
    alert( "Cannot connect two Entities with more than one " + this.type + " Link" );
    delete this;
    return false;
  }

//rest of Logic rules using Switch, by source type. many more rules are to be added
  switch ( src.constructor.name ){
  case "OPMObject":
    if ( this.type !== "Invocation" && this.type !== "Exception" && dest.constructor.name === "OPMProcess" ){
      return true;
    }
    else if ( dest.constructor.name === "OPMObject" ){
      return false;
    }
    else if ( dest.constructor.name === "OPMState" ){
      delete this;
      return false;
    }

  case "OPMProcess":
    if ( ( this.type === "Invocation" || this.type === "Exception" )  && dest.constructor.name === "OPMProcess" ){
      return true;
    }
    else if ( dest.constructor.name === "OPMObject" ){
      delete this;
      return false;
    }
    else if ( dest.constructor.name === "OPMState" ){
      delete.this;
      return false;
    }
  }
}
OPMProceduralLink.prototype.getDestination = function(){
  return this.destination;
}

OPMProceduralLink.prototype.setDestination = function( dest ){
  this.destination = dest;
}

OPMProceduralLink.prototype.getSource = function(){
  return this.source;
}
  
OPMProceduralLink.prototype.setSource = function( src ){
  this.source = src;
}

OPMLink.prototype.addXor = function( link ){
  this.xor[ link.id ] = link;
}

OPMLink.prototype.delXor = function( linkId ){
  delete this.xor[ linkId ];
}

OPMLink.prototype.addOr = function( link ){
  this.or[ link.id ] = link;
}

OPMLink.prototype.delOr = function( linkId ){
  delete this.or[ linkId ];
}

OPMProceduralLink.prototype.destructor = function(){
  delete this.source.inLinks[ this.id ];
  delete this.destination.outLinks[ this.id ];
  delete this;
}

}
//END OF OPMProcedural_Link CLASS//

// OPM Structural Link Class
OPMStructuralLink.prototype = new OPMLink();
//input src and dest Objects (thing and/or state)
function OPMStructuralLink( src , dest ) {
  
  this.source = src;
  this.destination = dest;
  this.participationConst = null;
  this.participationVal = null;
  this.cardinality = 1;
  this.tag = null;//description shown on link itself - only for uni/bi-directional relations
}  

//returns true if verified, otherwise returns false
OPMStructuralLink.prototype.verifyLink = function(){
  
  //check for existing type of structural link between two entities
  if ( src.outLinks[ dest.id ].category ===  dest.inLinks[ src.id ].category ){
    if ( this.type === "Unidirectional" || this.type === "Bidirectional" ){
      return true;
    }
    else{
      alert( "Cannot connect two Objects with more than one " + this.type + " Link" );
      delete this;
      return false;
    }
  }
  
  //rest of Logic rules using Switch, by source type. many more rules are to be added
  switch ( src.constructor.name ){
  case "OPMObject":
	if (dest.constructor.name === "OPMProcess") {
		if (this.type === "Exhibition") { return true }
		else { return false } 
	}
	if (dest.constructor.name === "OPMObject") { return true }
  
  case "OPMProcess":
	if (dest.constructor.name === "OPMObject") {
		if (this.type === "Exhibition") { return true }
		else { return false } 
	}
	if (dest.constructor.name === "OPMProcess") { return true }
  }
}

OPMStructuralLink.prototype.getDestination = function(){
  return this.destination;
}

OPMStructuralLink.prototype.setDestination = function( dest ){
  this.destination = dest;
}

OPMStructuralLink.prototype.getSource = function(){
  return this.source;
}
  
OPMStructuralLink.prototype.setSource = function( src ){
  this.source = src;
}

OPMStructuralLink.prototype.getCardinality = function(){
  return this.cardinality;
}

OPMStructuralLink.prototype.setCardinality = function( card ){
  this.cardinality = card;
}

OPMStructuralLink.prototype.getTag = function(){
  return this.tag;
}

OPMStructuralLink.prototype.setTag = function( tag ){
  this.tag = tag;
}

OPMStructuralLink.prototype.getParticipationConst = function(){
  return this.participationConst;
}

OPMStructuralLink.prototype.setParticipationConst = function( partConst ){
  this.participationConst = partConst;
}

OPMStructuralLink.prototype.getParticipationVal = function(){
  return this.participationVal;
}

OPMStructuralLink.prototype.setParticipationVal = function( val ){
  this.participationVal = val;
}

OPMStructuralLink.prototype.destructor = function(){
  delete this.source.inLinks[ this.id ];
  delete this.destination.outLinks[ this.id ];
  delete this;
}


