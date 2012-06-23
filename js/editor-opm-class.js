/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains classes description used for OPM
 * 
 *    Authors: Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 * */


function User(email, password) {
   this.id = randomFromTo(1, 1000);
   this.provider = null;                     	//mechanism used for oauth2.0: {google, facebook, twitter}
   this.token = null;                        	//used for oauth2.0
   this.email = email;
   this.firstName = null;
   this.lastName = null;
   this.password = password;
   this.models = [];
   this.lastLogin = new Date();                	//timestamp
   this.loginStatus = null;                   	//boolean
   
   var msg = new Message("createUserInstance", this , this.id);
   msg.send();
   
}

/*Working functions*/
User.prototype.getId = function() { 
   return this.id; 
}
User.prototype.getEmail = function() { 
   return this.email; 
}
User.prototype.getName = function() {
   //returns user's full name
   var x = this.firstName;
   var y = this.lastName;
   return x + " " + y;
}
User.prototype.setName = function(newFirstName, newLastName) {
   this.firstName = newFirstName;
   this.lastName = newLastName;
}
User.prototype.getModels = function() {
  //need to add call from SVG, which will display a list of models, check bootstrap for suitable GUI
  var msg = new Message("getUserModels", this.id, null);
  sendMessage(msg);
}
User.prototype.loadModel = function(modelId){
  var msg = new Message("getModel", modelId, this);
  sendMessage(msg);
}
User.prototype.addModel = function(model) {
   //add model to users model list
   this.models.push(model.id);
}
User.prototype.getLastLogin = function() {
   return this.lastLogin;
}
User.prototype.setLastLogin = function() {
   this.lastLogin = new Date();
}
User.prototype.setToken = function(token) {
   /* Token is given to the user after she signs in via provider. 
    * Token is needed to be kept in order to sign in user automatically when she enters web-site repeatedly
    * */
   this.token = token;
}
User.prototype.getToken = function() {
   return this.token
}
User.prototype.setPassword = function(newPassword) {
   //called if user wants to change password
   this.password = newPassword;
}
User.prototype.getLoginStatus = function() {
   return this.loginStatus;
}
User.prototype.setProvider = function(provider) {
   this.provider = provider;
}
User.prototype.getProvider = function() {
   return this.provider;
}
/*None-Working functions*/
User.prototype.getPassword = function() {
   //called if user forgets passwords
   //TODO: send request to DB and send the letter w/ password to User
}
User.prototype.deleteModel = function(model) {
   //TODO: should this be a recursive function, or is it enough to call the model's destructor 
}
User.prototype.login = function() {
   //call FB/Google/LinkedIn/Twitter login algorithm and process via Python 
}
User.prototype.logout = function() {
   this.loginStatus = false;
}

function OPMModel(creatorId) {                     
   this.id = partyOrder.getId(null);
   this.creator = creatorId;
   this.name = 'New Model';                         //default value
   this.type = 'System';
   this.participants = [];
   this.lastUpdate = new Date();
   this.creationDate = new Date();
   partyOrder.add(this);
   
   var msg = new Message("createModelInstance", this, creatorId);
   msg.send();

}

/*Working functions*/
OPMModel.prototype.returnId = function(){ 
   return this.id;
}
OPMModel.prototype.getCreator = function() {
	//returns creator ID
   return this.creator;
}
OPMModel.prototype.getName = function() {
   return this.name;     
}
OPMModel.prototype.setName = function(name) {
   this.name = name;
}
OPMModel.prototype.share = function(newUser) { 
   //share model with additional users
   this.participants.push(newUser);
}
OPMModel.prototype.unshare = function(userId) {
   //removes a specific user from the participants list and global dictionary
   var index = this.participants.indexOf(userId);
   this.participants.splice(index, 1);
}
OPMModel.prototype.getParticipants = function() {
   //returns a list of users with permissions to edit this model
   return this.participants;
}
OPMModel.prototype.getType = function() {
   return this.type;
}
OPMModel.prototype.setType = function(newType) {
   this.type = newType;
}
OPMModel.prototype.getLastUpdate = function() {
   return this.lastUpdate;
}
OPMModel.prototype.setLastUpdate = function() {
   this.lastUpdate = new Date();
}
OPMModel.prototype.getCreationDate = function() {
   return this.creationDate;
}
/*Non-working functions*/
OPMModel.prototype.load = function() {
   //need procedure for loading a model from DB
}
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
   var answer = confirm ( "You are about to Completely remove\n all Model diagrams. Are you sure you wish to continue " )
   if (answer) {
      try {
        delete this.creator.models[this.id];
        delete this;                          //FIXME: is this expression true  
      }
      catch(err) {
         txt="There was an error deleting the model.\n\n";
         txt+="Error description: " + err.message + "\n\n";
         txt+="Click OK to continue.\n\n";
         alert(txt);
      }
   }
}

function OPMDiagram(modelId) {   
   this.id = partyOrder.getId(modelId);                          
   this.name = 'New Diagram';                        //default value
   this.number = null;
   this.OPL = null;   
   
   partyOrder.add(this);
   var msg = new Message ("createDiagramInstance", this, currentUser.id);
   msg.send();
}
/*Working functions*/
OPMDiagram.prototype.returnId = function() {
   return this.id;
}
OPMDiagram.prototype.getName = function() {
   return this.name;
}
OPMDiagram.prototype.setName = function(name) {
   this.name = name;
}
OPMDiagram.prototype.getNumber = function() {
   return this.number;
}
OPMDiagram.prototype.setNumber = function(number) {
   this.number = number;
}
OPMDiagram.prototype.getOPL = function() {
   return this.OPL;
}
/*Non-working function*/

OPMDiagram.prototype.print = function() {
   //need implementation of print procedure.
   //including XML function
}      
OPMDiagram.prototype.writeOPL = function(text) {
   //TODO: need to think of a more clever way to add text to the OPL.
   //changes to OPL are done per element creation. therefore, at each creation of each type of element
   //we'll need an OPL "generator".
}   
OPMDiagram.prototype.destructor = function() {
   //need procedure for deleting diagram from database, including all children.
   if (answer) {
      try {  
         delete this;
      }
      catch(err) {
         txt="There was an error deleting the model.\n\n";
         txt+="Error description: " + err.message + "\n\n";
         txt+="Click OK to continue.\n\n";
         alert(txt);
      }
   }
   //call destructor function of each element in diagram
}

function OPMElement(activeOPMDiagram) {
    this.id = getId(activeOPMDiagram.id);
	this.description = null;
}
OPMElement.prototype.returnId = function() {
    return this.id;
}
OPMElement.prototype.getDescription = function() {
    return this.description;  
}
OPMElement.prototype.setDescription = function(description) {
    this.description = description;  
}


OPMEntity.prototype = new OPMElement();       //inheriting from OPMElement
function OPMEntity() {
   this.name = null;
   
}
/*Working functions*/
OPMEntity.prototype.getName = function() {
   return this.name;
}
OPMEntity.prototype.setName = function(name) {
   this.name = name;
}
OPMEntity.prototype.addLink = function(link) {
        if (link.source.id === this.id) {
                this.outLinks[link.destination.id] = link.destination;
        }
        else {
                this.inLinks[link.source.id] = link.source;
        }
}
OPMEntity.prototype.removeLink = function(link) {
//remove link from source and destination
        try {
                if(link.source.id === this.id){
                        delete this.outLinks[link.destination.id].destination.inLinks[link.source.id];
                        delete this.outLinks[link.destination.id];
                }
                else if(link.destination.id === this.id){
                        delete this.inLinks[link.source.id].source.outLinks[link.destination.id];
                        delete this.inLinks[link.source.id];
                }
    }
    catch (err) {
        txt="There was an error deleting the link.\n\n";
        txt+="Error description: " + err.message + "\n\n";
        txt+="Click OK to continue.\n\n";
        alert(txt);
    }
}

/*Non-working functions*/
OPMEntity.prototype.destructor = function() {
      this.removeLink(this.inLinks);
      this.removeLink(this.outLinks);
      delete this;
}
  


OPMThing.prototype = new OPMEntity();          // inheriting from OPMEntity 
function OPMThing()   {
   this.essence = "Informatical";
   this.affiliation = "Systemic";            //default value
   this.scope = "Public";
   this.url = null;
}
/*Working function*/
OPMThing.prototype.getEssence = function() {
    return this.essence;
}
OPMThing.prototype.setEssence = function(ess) {
    this.essence = ess;
}
OPMThing.prototype.getAffiliation = function() {
    return this.affiliation;
}
OPMThing.prototype.setAffiliation = function(aff) {
    this.affiliation = aff;
}
OPMThing.prototype.getScope = function() {
    return this.scope;
}
OPMThing.prototype.setScope = function(scope) {
    this.scope = scope;
}
OPMThing.prototype.getURL = function() {
   return this.url;
}
OPMThing.prototype.setURL = function(newURL) {
   this.url = newURL;
}


OPMObject.prototype = new OPMThing();
function OPMObject() {
   this.classType = 'OPMObject';
   this.initValue = null;
   this.type = "Compound Object";
   this.inLinks = [ ];
   this.outLinks = [ ];
   
   partyOrder.dictInst[this.id] = this;
   
   var msg = new Message("createObjectInstance", this , null);
   sendMessage(msg);
}
/*Working function*/
OPMObject.prototype.getInitValue = function() {
   return this.initValue
}
OPMObject.prototype.setInitValue = function(newInitValue) {
   this.initValue = newInitValue;
}
OPMObject.prototype.getType = function() {
   return this.type;
}
OPMObject.prototype.setType = function(newType) {
   this.type = newType;
}
OPMObject.prototype.setInitValue = function(newInitValue) {
   this.initValue = newInitValue;
}


OPMProcess.prototype = new OPMThing();
function OPMProcess() {
  this.classType = 'OPMProcess';
  this.inLinks = [ ];
  this.outLinks = [ ];
  this.minActivationTime = null;
  this.maxActivationTime = null;
   
  partyOrder.dictInst[this.id] = this;
   
  var msg = new Message("createProcessInstance", this , null);
  sendMessage(msg);
}
/*Working functions*/
OPMProcess.prototype.getMinActivationTime = function() {
    return this.minActivationTime;
}
OPMProcess.prototype.setMinActivationTime = function(minTime) {
    this.minActivationTime = minTime;
}
OPMProcess.prototype.getMaxActivationTime = function() {
    return this.maxActivationTime;
}
OPMProcess.prototype.setMaxActivationTime = function(maxTime) {
    this.maxActivationTime = maxTime;
}


OPMState.prototype = new OPMEntity();
function OPMState(parent) {                           //parent is an object which contains the state
  this.classType = 'OPMState';  
  this.type = null;                              //final, default, initial
  this.minActivationTime = null;
  this.maxActivationTime = null;
  this.inLinks = [ ];
  this.outLinks = [ ];
  
  partyOrder.dictInst[this.id] = this;
  
  var msg = new Message("createStateInstance", this , null);
  sendMessage(msg);
}

/*Working functions*/
OPMState.prototype.getParent = function() {
   return this.parent;
}
OPMState.prototype.getType = function() {
    return this.type;
}  
OPMState.prototype.setType = function(type) {
    this.type = type;
}
OPMState.prototype.getMinActivationTime = function() {
    return this.minActivationTime;
}
OPMState.prototype.setMinActivationTime = function(minTime) {
    this.minActivationTime = minTime;
}
OPMState.prototype.getMaxActivationTime = function() {
    return this.maxActivationTime;
}
OPMState.prototype.setMaxActivationTime = function(maxTime) {
    this.maxActivationTime = maxTime;
}
/*Non-working functions*/
OPMEntity.prototype.destructor = function() {//overloaded to delete State reference in Parent Object
    this.removeLink(this.inLinks);
    this.removeLink(this.outLinks);
    delete this.parent.states[this.id];
    delete this;
}


OPMLink.prototype = new OPMElement();
function OPMLink(src, dest, category, type) {
   this.source = src;
   this.destination = dest;
   this.category = category;                     //categories are strings, two values: "Structural" and "Procedural"
   this.type = type;                           //types are strings, some values: "Instrument", "Agent" etc.
}
/*Working function*/
OPMLink.prototype.getDestination = function() {
    return this.destination;
}
OPMLink.prototype.setDestination = function(dest) {
    this.destination = dest;
}
OPMLink.prototype.getSource = function() {
    return this.source;
} 
OPMLink.prototype.setSource = function(src) {
    this.source = src;
}
OPMLink.prototype.getType = function() {
    return this.type;
}
OPMLink.prototype.setType = function(newType) {
   this.type = newType;
}
OPMLink.prototype.getCategory = function() {
    return this.category;
}
OPMLink.prototype.setCategory = function(newCategory) {
   this.category = newCategory;
}



OPMProceduralLink.prototype = new OPMLink();
function OPMProceduralLink() {               //input source and destination Objects
   this.category = 'Procedural';
   this.relationXor = [ ];
   this.relationOr = [ ];
   
   partyOrder.dictInst[this.id] = this;
   
   var msg = new Message("createProceduralLinkInstance", this , null);
   sendMessage(msg);
}
/*Working functions*/
OPMProceduralLink.prototype.opmRulesCheck = function(src_chk,dest_chk){
  switch (src_chk.classType) {
  case "OPMObject":
      if (dest_chk.classType === "OPMProcess") {
          if (this.type === "Invocation" || this.type === "Exception") { return false; }
          else { return true; }
      }
      else if (dest_chk.classType === "OPMObject" || dest_chk.classType === "OPMState") { return false; }
  case "OPMProcess":
      if (dest_chk.classType === "OPMObject" || dest_chk.classType ==="OPMState") {
          if (this.type === "Result-Consumption" || this.type === "Effect") { return true; }
          else { return false; } 
      }
      else if (dest_chk.classType === "OPMProcess") {
          if (this.type === "Invocation" || this.type === "Exception") { return true; }
          else { return false; }
      }
  case "OPMState":
      if (dest_chk.classType === "OPMProcess") {
          if (this.type === "Invocation" || this.type === "Exception") { return false; }
          else { return true; }
      }
      else if (dest_chk.classType === "OPMObject" || dest_chk.classType === "OPMState") { return false; }
  }
}
OPMProceduralLink.prototype.verifyLink = function() {
        //check for existing type of procedural link between two entities
    if (typeof this.source.outLinks[this.destination.id] === 'undefined' || typeof this.destination.inLinks[this.source.id] === 'undefined') {  //check if two elements are linked - if not, perform link check according to basic opm rules
                var x = (this.opmRulesCheck(this.source,this.destination));
                return x;
    }
   
    else if (this.source.outLinks[ this.destination.id ].category ===  this.destination.inLinks[ this.source.id ].category) {
        alert("Cannot connect two Objects with more than one " + this.type + " Link");
                return false;
    }
    //rest of Logic rules using Switch, by source type. many more rules are to be added
        this.opmRulesCheck(this.source, this.destination);
}
OPMProceduralLink.prototype.addXor = function(link) {
    this.relationXor[link.id] = link;
}
OPMProceduralLink.prototype.removeXor = function(link) {
    delete this.relationXor[link.id];
}
OPMProceduralLink.prototype.getXor = function() {
   return this.relationXor;
}
OPMProceduralLink.prototype.addOr = function(link) {
    this.relationOr[link.id] = link;
}
OPMProceduralLink.prototype.removeOr = function(link) {
    delete this.relationOr[link.id];
}
OPMProceduralLink.prototype.getOr = function() {
   return this.relationOr;
}
/*Non-working functions*/
OPMProceduralLink.prototype.destructor = function() {
    delete this.source.inLinks[this.id];
    delete this.destination.outLinks[this.id];
    delete this;
}

OPMStructuralLink.prototype = new OPMLink();
function OPMStructuralLink() {
    this.category = 'Structural';
    this.participationConst = null;
    this.participationVal = null;
    this.cardinality = 1;
    this.tag = null;                                                   //description shown on link itself - only for uni/bi-directional relations
    
    partyOrder.dictInst[this.id] = this;
    
    var msg = new Message("createStructuralLinkInstance", this , this.creator);
    sendMessage(msg);
}  
/*Working function*/
OPMStructuralLink.prototype.opmRulesCheck = function(src_chk,dest_chk){
  switch (src_chk.classType) {                                                      //rest of Logic rules using Switch, by source type.
  case "OPMObject":
      if (dest_chk.classType === "OPMProcess") {
          if (this.type === "Exhibition") { return true; }
      else { return false; } 
      }
      if (dest_chk.classType === "OPMObject") { return true; }
  case "OPMProcess":
      if (dest_chk.classType === "OPMObject") {
          if (this.type === "Exhibition") { return true; }
      else { return false; }
      }
      if (dest_chk.classType === "OPMProcess") { return true; }
  case "OPMState": return false;
  }
}
OPMStructuralLink.prototype.verifyLink = function() {
  if (typeof this.source.outLinks[this.destination.id] === 'undefined' || typeof this.destination.inLinks[this.source.id] === 'undefined') {  //check if two elements are linked
                var x = (this.opmRulesCheck(this.source,this.destination));
                return x;
        }

  else if (this.source.outLinks[this.destination.id].category ===  this.destination.inLinks[this.destination.id].category) {         //check for existing type of structural link between two entities
        if (this.type === "Unidirectional" || this.type === "Bidirectional") { return true; }
        else {
                alert("Cannot connect two Objects with more than one " + this.type + " Link");
                return false;
        }
    }
        
        this.opmRulesCheck(this.source,this.destination);
        
}
OPMStructuralLink.prototype.getCardinality = function() {
    return this.cardinality;
}
OPMStructuralLink.prototype.setCardinality = function(card) {
    this.cardinality = card;
}
OPMStructuralLink.prototype.getTag = function() {
    return this.tag;
}
OPMStructuralLink.prototype.setTag = function(tag) {
    this.tag = tag;
}
OPMStructuralLink.prototype.getParticipationConst = function() {
    return this.participationConst;
}

OPMStructuralLink.prototype.setParticipationConst = function(partConst) {
    this.participationConst = partConst;
}

OPMStructuralLink.prototype.getParticipationVal = function() {
    return this.participationVal;
}

OPMStructuralLink.prototype.setParticipationVal = function(val) {
    this.participationVal = val;
}
/*Non-working function*/
OPMStructuralLink.prototype.destructor = function() {
    delete this.source.inLinks[this.id];
    delete this.destination.outLinks[this.id];
    delete this;
}


