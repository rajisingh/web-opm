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
/*TODO:
OPMLink checking - implementing 

*/


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

User.prototype.login = function( userId, pass , loginProvider ){
  //call FB/Google/LinkedIn/Twitter login algorithm and process via Python?
}

User.prototype.logout = function( model ){//receives model object
  try{
    model.save();
    this.loginStatus = 0;
    //TODO: perform save on working model with recieved modelId
  }
  catch( err ){
    txt="There was an error saving the Model.\n\n";
    txt+="Error description: " + err.message + "\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
  }
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
  this.sd = new OPMDiagram( mainSdDiagId , 0 );//create first SD for model
  this.diagrams = { };//hashtable with diagram ids in model
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

//returns list of all diagram ids in model
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

OPMModel.prototype.load = function ( modelId ){
  //need procedure from loading a model from DB
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
function OPMDiagram( id , level ){
	
  this.id = id;
  this.predecessor = { };
  this.successors = { };//hashtable of successors
  this.elements = { };
  this.diagramName = 'Diagram Name';//default value
  this.OPL = null;
  this.level = level; //default value
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
	
OPMDiagram.prototype.renumber = function( toLevel ){//TODO: add procedure to renumber entire tree
  for ( var i in this.successors ){
    this.successors[ i ]
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
    try {
      for ( var i in this.successors ){
        
      }
      delete this; //FIXME: is this expression true??
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
function OPMElement(id) {
  this.id = id;
}

OPMElement.prototype.getId = function(){
  return this.id;
}
//END OF OPMElement CLASS//

//START OF OPMEntity CLASS//
OPMEntity.prototype = new OPMElement(); //inheriting from OPMElement
function OPMEntity() {
  this.name = null;
  this.inLinks = { };
  this.outLinks = { };
  this.description = null;
}

OPMEntity.prototype.getName = function(){
  return this.name;
}

OPMEntity.prototype.setName = function( name ){
  this.name = name;
}

OPMEntity.prototype.getDescription = function(){
  return this.description;
}

OPMEntity.prototype.setDescription = function( description ){
  this.description = description;
}

OPMEntity.prototype.addLink = function( link ){
  switch( link.type ){
    case "Procedural":
      //TODO: VERIFY OPM LOGIC HERE
    case "Structural":
      //TODO: VERIFY OPM LOGIC HERE
  this.links[ outLink.Destination ] = outLink;
  //TODO: DB update function needed
}

OPMEntity.prototype.removeLink = function( link ){
  this.outStructLinks[ outLink.Destination ] = outLink;
  return;
  //TODO: DB update function needed
}

//END OF OPMEntity CLASS//

//START OF OPMThing CLASS//
OPMThing.prototype = new OPMEntity(); // inheriting from OPMEntity 
function OPMThing(){
  this.essence = null;
  this.affiliation = null;
  this.scope = null;
  this.unfoldDiag = {};
  this.inzoomDiag = {};
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
  return;
  //TODO: send data through JSON to DB and server
}

OPMThing.prototype.unfold = function( diagram ){
  this.unfoldDiag = new OPMDiagram();

}

OPMThing.prototype.inzoom = function(){

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

OPMObject.prototype.removeState = function(state){//TODO: change to Hash table procedure

}

OPMObject.prototype.destructor = function(){
//needs the procedure of deletion
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
function OPMState(parent) {
  this.type = null;
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

OPMState.prototype.setMaxActivationTime = function(maxTime){
    this.maxActivationTime = maxTime;
}


//END OF OPMState CLASS//

//START OF OPMLink CLASS//

OPMLink.prototype = new OPMElement();
function OPMLink() {
  this.type = null;
  this.category = null;
}

OPMLink.prototype.getType = function(){
  return this.type;
}

OPMLink.prototype.setType = function( type ){
  this.type = type;
  return;
}

OPMLink.prototype.getCategory = function(){
  return this.category;
}


//END OF OPMLink CLASS//


//START OF OPMProcedural_Link CLASS//

OPMProceduralLink.prototype = new OPMLink();
function OPMProceduralLink() {
	
  this.source = {};
  this.destination = {};
	this.description = null;
	this.originType = null;
 }
 
OPMProceduralLink.prototype.getDestination = function(){
  return this.destination;
}

OPMProceduralLink.prototype.setDestination = function(){
//how to enter a pointer to destination.  
}

OPMProceduralLink.prototype.getSource = function(){
  return this.source;
}
  
OPMProceduralLink.prototype.setSource = function(){
//how to enter a pointer for source.
}

OPMProceduralLink.prototype.getOriginType = function(){
  return this.originType;
}

OPMProceduralLink.prototype.setOriginType = function(origin){
  this.originType = origin;
  return;
}

OPMProceduralLink.prorotype.getDescription = function(){
  return this.description;
}

OPMProceduralLink.prototype.setDescription = function(description){
  this.description = description;
  return;
}

OPMProceduralLink.prototype.destructor = function(){
    //need destructor procedure/
}
//END OF OPMProcedural_Link CLASS//

// OPM Structural Link Class
OPMStructuralLink.prototype = new OPMLink();
function OPMStructuralLink() {
	this.source;
	this.destination;
	this.participationConst;
	this.participationVal;
	this.cardinality;
	this.tag;
}  
 
OPMSturcturalLink.prototype.getDestinatoin = function(){
  return this.destination;
}

OPMStructuralLink.prototype.setDestination = function(){
    //how to add pointer here?
}

OPMStructuralLink.prototype.getSource = function(){
  return this.source;
}

OPMStructuralLink.prototype.setSource = function(source){
  this.source = source;
  return;
}

OPMStructuralLink.prototype.getCardinality = function(){
    return this.cardinality;
}

OPMStructuralLink.prototype.setCardinality = function(cardinality){
  this.cardinality = cardinality;
  return;
}

OPMStructuralLink.prototype.getTag = function(){
  return this.tag;
}

OPMStructuralLink.prototype.setTag = function(tag){
  this.tag = tag;
  return;
}

OPMStructuralLink.prototype.getParticipationConst = function(){
  return this.participationConst;
}

OPMStructuralLink.prototype.setParticipationConst = function(participationConst){
  this.participationConst = participationConst;
  return;
}

OPMStructuralLink.prototype.getParticipationVal = function(){
    return this.participationVal;
}

OPMStructuralLink.prototype.setParticipationVal = function(Val){
  this.participationVal = val;
  return;
}

OPMStructuralLink.prototype.destructor = function(){
    //destructor procedure
}


