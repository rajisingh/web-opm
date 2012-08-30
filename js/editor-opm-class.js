/**@fileOverview  
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright ɠ2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains classes description used for OPM
 *    
 *@author  Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 */


/**
 * @Class 
 * @description Represents a user of the CASE Tool.
 * @constructor
 * @this {User}
 * @param {string} email
 * @param {string} password
 */
function User(email, password) {
	/** @field *//**Indicates the ID numebr of the user.*/
	this.id = randomFromTo(1, 1000);
	/** @field *//**Indicates the provider of the alien login (if exists)*/
	this.provider = null;                     //mechanism used for oauth2.0: {google, facebook, twitter}
	/** @field *//**Used for establishing a connection*/
	this.token = null;                        //used for oauth2.0
	/** @field *//**The email of the user*/
	this.email = email;
	/** @field *//**The first name of the user*/
	this.firstName = null;
	/** @field *//**The last name of the user*/
	this.lastName = null;
	/** @field *//**The password of the user*/
	this.password = password;
	/** @field *//**A map to hold the models associated with the user*/
	this.models = [];
	/** @field *//**Indicates the last login date of the user*/
	this.lastLogin = new Date();                //timestamp
	/** @field *//**Indicates the status of the login of a user*/
	this.loginStatus = null;                   //boolean
   
   //dict[this.id] = this;
	/** @field *//**Message type used in the communications*/
	var msg = new Message("createUserInstance", this , this);
	sendMessage(msg);
}

/*Working functions*/

/**
 * get the ID of the user.
 *
 * @this {User}
 * @return {string} User ID
 */
User.prototype.getId = function() { 
   return this.id; 
};

/**
 * Returns the email of the User.
 *
 * @this {User}
 * @return {string} Email
 */
User.prototype.getEmail = function() { 
   return this.email; 
};

/**
 * Returns the full name of the user.
 *
 * @this {User}
 * @return {string,string} Full Name
 */
User.prototype.getName = function() {
   //returns user's full name
   var x = this.firstName;
   var y = this.lastName;
   return x + " " + y;
}

/**
 * Sets the full name of the user.
 *
 * @this {User}
 * @param {string} firstName
 * @param {string} lastName
 */
User.prototype.setName = function(newFirstName, newLastName) {
   this.firstName = newFirstName;
   this.lastName = newLastName;
}

/**
 * Gets the models that are associated with the user.
 * @this {User} 
 */
User.prototype.getModels = function() {
  //need to add call from SVG, which will display a list of models, check bootstrap for suitable GUI
  var msg = new Message("loadScreen", this.id, null);
  sendMessage(msg);
}

/**
 * Load the requested model.
 * @this {User}
 * @param {string} modelId
 */
User.prototype.loadModuel = function(modelId){
	var msg = new Message("loadModel", modelId, this);
	sendMessage(msg);
	var handler = function(act, data){
    var act = action;
     	switch(act){
 			case "createUserInstance": 
 				
 		      "createModelInstance": 'GET',
 		      "createDiagramInstance": 'GET',
 		      "createObjectInstance": 'GET',
 		      "createProcessInstance": 'GET',
 		      "createStateInstance": 'GET',
 		      "createProceduralLinkInstance": 'GET',
 		      "createStructuralLinkInstance": 'GET',
     	}

  }
}

/**
 * Add model to the model map of the user.
 * @this {User}
 * @param {model} model 
 */
User.prototype.addModel = function(model) {
   //add model to users model list
   this.models.push(model.id);
   
}

/**
 * Returns the last login of the user.
 * @this {User} 
 * @return {date} Last login
 */	
User.prototype.getLastLogin = function() {
   return this.lastLogin;
}

/**
 * Sets the last login of the user.
 * @this {User} 
 */	
User.prototype.setLastLogin = function() {
   this.lastLogin = new Date();
}

/**
 * Sets the token for establishing connection.
 * @this {User} 
 * @param {string} token
 * @description Token is given to the user after she signs in via provider. 
 *Token is needed to be kept in order to sign in user automatically when she enters web-site repeatedly 
 */
User.prototype.setToken = function(token) {

   this.token = token;
}

/**
 * Returns the token used for connection.
 * @this {User} 
 * @return {string} Token
 */	
User.prototype.getToken = function() {
   return this.token
}

/**
 * Sets the password of the user.
 * @this {User}
 * @param {string} password 
 */
User.prototype.setPassword = function(newPassword) {
   //called if user wants to change password
   this.password = newPassword;
}
/**
 * Returns the login status of the user.
 * @this {User} 
 * @return {string} Login status
 */	
User.prototype.getLoginStatus = function() {
   return this.loginStatus;
}
/**
 * Sets the provider for the user login.
 * @this {User} 
 * @param {string} provider
 */
User.prototype.setProvider = function(provider) {
   this.provider = provider;
}
/**
 * Returns the login provider of the user.
 * @this {User} 
 * @return {string} provider
 */	
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

/**
 * @Class 
 * @description Represents an OPM Model.
 * @constructor
 * @this {OPMModel}
 * @param {string} creatorId
 */
function OPMModel(creatorId) {
	/** @field *//**Indicates ID of the OPM model*/
   this.id = getId();
   /** @field *//**Indicates the creator ID of the user*/
   this.creator = creatorId;
	/** @field *//**Indicates the name of the model*/
   this.name = 'New Model';                         //default value
	/** @field *//**Indicates the type of model*/
   this.type = 'System';
	/** @field *//**Indicates all the user participating in the model*/
   this.participants = [];
	/** @field *//**Indicates the last update date of the model*/
   this.lastUpdate = new Date();
	/** @field *//**Indicates the creation date of the model*/
   this.creationDate = new Date();
   
	/** @field *//**Indicates the place of order for the OPM model in the data structure*/
   partyOrder.dictInst[this.id] = this;
   var sd = new OPMDiagram(this.id);            //create first SD for model, with level=0
   /** @field *//**Message type used in the communications*/
   var msg = new Message("createModelInstance", this , this.creator);
   sendMessage(msg);
   var msg2 = new Message ("createDiagramInstance", sd, this.creator);
   sendMessage(msg2);
   
   delete msg;
   delete msg2;
}

/*Working functions*/
/**
 * Returns the ID of the OPM model.
 * @this {OPMModel} 
 * @return {string} OPM Model ID
 */	
OPMModel.prototype.returnId = function(){ 
   return this.id;
}

/**
 * Returns the creator of the OPM model.
 * @this {OPMModel} 
 * @return {string} Creator
 */	
OPMModel.prototype.getCreator = function() {
	//returns creator ID
   return this.creator;
}

/**
 * Returns the name of the OPM model.
 * @this {OPMModel} 
 * @return {string} Name
 */	
OPMModel.prototype.getName = function() {
   return this.name;     
}

/**
 * Sets the name of the OPM model.
 * @this {OPMModel}
 * @param {string} name 
 */
OPMModel.prototype.setName = function(name) {
   this.name = name;
}

/**
 * Share the OPM model with a new user.
 * @this {OPMModel}
 * @param {user} newUser 
 */
OPMModel.prototype.share = function(newUser) { 
   //share model with additional users
   this.participants.push(newUser);
}

/**
 * Remove a specific user from the participation of the OPM model.
 * @this {OPMModel}
 * @param {string} userId 
 */
OPMModel.prototype.unshare = function(userId) {
   //removes a specific user from the participants list and global dictionary
   var index = this.participants.indexOf(userId);
   this.participants.splice(index, 1);
}

/**
 * Returns the participants of the OPM model.
 * @this {OPMModel} 
 * @return {string[]} Participants
 */	
OPMModel.prototype.getParticipants = function() {
   //returns a list of users with permissions to edit this model
   return this.participants;
}

/**
 * Returns the type of the OPM model.
 * @this {OPMModel} 
 * @return {string} Type
 */	
OPMModel.prototype.getType = function() {
   return this.type;
}

/**
 * Sets the type of the OPM model.
 * @this {OPMModel}
 * @param {string} type 
 */
OPMModel.prototype.setType = function(newType) {
   this.type = newType;
}

/**
 * Returns the last update date of the OPM model.
 * @this {OPMModel} 
 * @return {date} Last update
 */	
OPMModel.prototype.getLastUpdate = function() {
   return this.lastUpdate;
}

/**
 * Sets the last update date of the OPM model.
 * @this {OPMModel}
 * @param {date} lastUpdate 
 */
OPMModel.prototype.setLastUpdate = function() {
   this.lastUpdate = new Date();
}

/**
 * Returns the creation date of the OPM model.
 * @this {OPMModel} 
 * @return {string} Creation date
 */	
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

/**
 * @Class 
 * @description Represents an OPM Diagram.
 * @constructor
 * @this {OPMDiagram}
 * @param {OPMModel} activeOPMModel Indicates the current active OPM model.
 */ 
function OPMDiagram(activeOPMModel) {
	/** @field *//**Indicates ID of the OPM diagram*/
   this.id = getId(activeOPMModel.id); 
	/** @field *//**Indicates the name of the diagram*/
   this.name = 'New Diagram';                        //default value
	/** @field *//**Indicates number of the diagram*/
   this.number = null;
	/** @field *//**Represents the OPL of the diagram*/
   this.OPL = null;
	/** @field *//**Indicates the place of order for the diagram in the data structure*/
   partyOrder.dictInst[this.id] = this;
   /** @field *//**Message type used in the communications*/
   var msg = new Message("createDiagramInstance", this , null);
   sendMessage(msg);
}

/*Working functions*/
/**
 * Returns the ID of the OPM diagram.
 * @this {OPMDiagram} 
 * @return {string} Diagram ID
 */
OPMDiagram.prototype.returnId = function() {
   return this.id;
}
/**
 * Returns the name of the OPM diagram.
 * @this {OPMDiagram} 
 * @return {string} Diagram name
 */
OPMDiagram.prototype.getName = function() {
   return this.name;
}
/**
 * Sets the name of the OPM diagram.
 * @this {OPMDiagram} 
 * @param {string} name
 */
OPMDiagram.prototype.setName = function(name) {
   this.name = name;
}
/**
 * Returns the number of the OPM diagram.
 * @this {OPMDiagram} 
 * @return {number} number
 */
OPMDiagram.prototype.getNumber = function() {
   return this.number;
}
/**
 * Sets the number of the OPM diagram.
 * @this {OPMDiagram} 
 * @return {number} number
 */
OPMDiagram.prototype.setNumber = function(number) {
   this.number = number;
}
/**
 * Returns the OPL of the OPM diagram.
 * @this {OPMDiagram} 
 * @return {string} OPL
 */
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

/**
 * @Class 
 * @description Represents an OPM Element.
 * @constructor
 * @this {OPMElement}
 * @param {OPMDiagram} activeOPMDiagram
 */
function OPMElement(activeOPMDiagram) {
	/** @field *//**Indicates ID of the OPM element*/
    this.id = getId(activeOPMDiagram.id);
	/** @field *//**Contains the description for the OPM element*/
	this.description = null;
}
/**
 * Returns the ID of the OPM element.
 * @this {OPMElement}
 * @return {string} Element ID 
 */
OPMElement.prototype.returnId = function() {
    return this.id;
}
/**
 * Returns the description of the OPM element.
 * @this {OPMElement}
 * @return {string} Description 
 */
OPMElement.prototype.getDescription = function() {
    return this.description;  
}
/**
 * Sets the description of the OPM element.
 * @this {OPMElement}
 * @param {string} description 
 */
OPMElement.prototype.setDescription = function(description) {
    this.description = description;  
}

OPMEntity.prototype = new OPMElement();       //inheriting from OPMElement
/**
 * @Class 
 * @description Represents an OPM Entity, inherits from OPM Element class.
 * @constructor
 * @this {OPMEntity}
 */
function OPMEntity() {
	/** @field *//**Indicates the name of the OPM entity*/
   this.name = null;
   
}
/*Working functions*/
/**
 * Returns the name of the OPM entity.
 * @this {OPMEntity}
 * @return {string} Name 
 */
OPMEntity.prototype.getName = function() {
   return this.name;
}
/**
 * Sets the name of the OPM entity.
 * @this {OPMEntity}
 * @param {string} name 
 */
OPMEntity.prototype.setName = function(name) {
   this.name = name;
}
/**
 * Adds a link to an OPM entity.
 * @this {OPMEntity}
 * @param {OPMLink} link 
 */
OPMEntity.prototype.addLink = function(link) {
        if (link.source.id === this.id) {
                this.outLinks[link.destination.id] = link.destination;
        }
        else {
                this.inLinks[link.source.id] = link.source;
        }
}
/**
 * Removes a link that is connected to an OPM entity.
 * @this {OPMEntity}
 * @param {OPMLink} link 
 */
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
/**
 * @Class 
 * @description Represents an OPM Thing, inherits from OPM Entity.
 * @constructor
 * @this {OPMThing}
 */
function OPMThing()   {
	/** @field *//**Indicates the essence of the OPM thing*/
   this.essence = "Informatical";
	/** @field *//**Indicates the affiliation of the OPM thing*/
   this.affiliation = "Systemic";            //default value
	/** @field *//**Indicates the scope of the OPM thing*/
   this.scope = "Public";
	/** @field *//**Indicates the url of the OPM thing*/
   this.url = null;
}
/*Working function*/
/**
 * Returns the essence of the OPM Thing.
 * @this {OPMThing}
 * @return {string} Essence
 */
OPMThing.prototype.getEssence = function() {
    return this.essence;
}
/**
 * Sets the essence of the OPM Thing.
 * @this {OPMThing}
 * @param {string} essence
 */
OPMThing.prototype.setEssence = function(ess) {
    this.essence = ess;
}
/**
 * Returns the affiliation of the OPM Thing.
 * @this {OPMThing}
 * @return {string} Affiliation
 */
OPMThing.prototype.getAffiliation = function() {
    return this.affiliation;
}
/**
 * Sets the affiliation of the OPM Thing.
 * @this {OPMThing}
 * @param {string} affiliation
 */
OPMThing.prototype.setAffiliation = function(aff) {
    this.affiliation = aff;
}
/**
 * Returns the scope of the OPM Thing.
 * @this {OPMThing}
 * @return {string} Scope
 */
OPMThing.prototype.getScope = function() {
    return this.scope;
}
/**
 * Sets the scope of the OPM Thing.
 * @this {OPMThing}
 * @param {string} scope
 */
OPMThing.prototype.setScope = function(scope) {
    this.scope = scope;
}
/**
 * Returns the URL of the OPM Thing.
 * @this {OPMThing}
 * @return {string} Url
 */
OPMThing.prototype.getURL = function() {
   return this.url;
}
/**
 * Sets the URL of the OPM Thing.
 * @this {OPMThing}
 * @param {string} url
 */
OPMThing.prototype.setURL = function(newURL) {
   this.url = newURL;
}


OPMObject.prototype = new OPMThing();
/**
 * @Class 
 * @description Represents an OPM Object, inherits from OPM Thing.
 * @constructor
 * @this {OPMObject}
 */
function OPMObject() {
	/** @field *//**Indicates the class type of the OPM object*/
   this.classType = 'OPMObject';
   /** @field *//**Indicates the initial value of the OPM object*/
   this.initValue = null;
   /** @field *//**Indicates the type of the OPM object*/
   this.type = "Compound Object";
   /** @field *//**Indicates the incoming links for the OPM object*/
   this.inLinks = [ ];
   /** @field *//**Indicates the outgoing links for the OPM object*/
   this.outLinks = [ ];
   /** @field *//**Indicates the place of order for the OPM object in the data structure*/
   partyOrder.dictInst[this.id] = this;
   /** @field *//**Message type used in the communications*/
   var msg = new Message("createObjectInstance", this , null);
   sendMessage(msg);
}
/*Working function*/
/**
 * Returns the initial value of the OPM object.
 * @this {OPMObject}
 * @return {number} Initial value
 */
OPMObject.prototype.getInitValue = function() {
   return this.initValue
}
/**
 * Sets the initial value of the OPM object.
 * @this {OPMObject}
 * @param {number} initValue
 */
OPMObject.prototype.setInitValue = function(newInitValue) {
   this.initValue = newInitValue;
}
/**
 * Returns the type of the OPM object.
 * @this {OPMObject}
 * @returns {string} Type
 */
OPMObject.prototype.getType = function() {
   return this.type;
}
/**
 * Sets the type of the OPM object.
 * @this {OPMObject}
 * @param {string} type
 */
OPMObject.prototype.setType = function(newType) {
   this.type = newType;
}
OPMObject.prototype.setInitValue = function(newInitValue) {
   this.initValue = newInitValue;
}


OPMProcess.prototype = new OPMThing();
/**
 * @Class 
 * @description Represents an OPM Process, inherits from OPM Thing.
 * @constructor
 * @this {OPMProcess}
 */
function OPMProcess() {
	/** @field *//**Indicates the class type of the OPM process*/
	this.classType = 'OPMProcess';
	/** @field *//**Indicates the incoming links for the OPM process*/
	this.inLinks = [ ];
	/** @field *//**Indicates the outgoing links for the OPM process*/
	this.outLinks = [ ];
	/** @field *//**Indicates the minimal activation time of the OPM process*/
	this.minActivationTime = null;
	/** @field *//**Indicates the maximal activation time of the OPM process*/
	this.maxActivationTime = null;
	/** @field *//**Indicates the place of order for the OPM process in the data structure*/
	partyOrder.dictInst[this.id] = this;
	/** @field *//**Message type used in the communications*/
	var msg = new Message("createProcessInstance", this , null);
	sendMessage(msg);
}
/*Working functions*/
/**
 * Returns the minimal activation time of the OPM process.
 * @this {OPMProcess}
 * @return {date} Minimal activation time
 */
OPMProcess.prototype.getMinActivationTime = function() {
    return this.minActivationTime;
}
/**
 * Sets the minimal activation time of the OPM process.
 * @this {OPMProcess}
 * @param {date} minActivationTime
 */
OPMProcess.prototype.setMinActivationTime = function(minTime) {
    this.minActivationTime = minTime;
}
/**
 * Returns the maximal activation time of the OPM process.
 * @this {OPMProcess}
 * @return {date} Maximal activation time
 */
OPMProcess.prototype.getMaxActivationTime = function() {
    return this.maxActivationTime;
}
/**
 * Sets the maximal activation time of the OPM process.
 * @this {OPMProcess}
 * @param {date} maxActivationTime
 */
OPMProcess.prototype.setMaxActivationTime = function(maxTime) {
    this.maxActivationTime = maxTime;
}


OPMState.prototype = new OPMEntity();
/**
 * @Class 
 * @description Represents an OPM state, inherits from OPM Entity and has a direct parent as an OPM Object.
 * @constructor
 * @this {OPMState}
 * @param {OPMObject} parent
 */
function OPMState(parent) {                           //parent is an object which contains the state
	/** @field *//**Indicates the class type of the OPM state*/
	this.classType = 'OPMState';
	/** @field *//**Indicates the type of the OPM state*/
	this.type = null;                              //final, default, initial
	/** @field *//**Indicates the minimal activation time of the OPM state*/
	this.minActivationTime = null;
	/** @field *//**Indicates the maximal activation time of the OPM state*/
	this.maxActivationTime = null;
	/** @field *//**Indicates the incoming links for the OPM state*/
	this.inLinks = [ ];
	/** @field *//**Indicates the outgoing links for the OPM state*/
	this.outLinks = [ ];
	/** @field *//**Indicates the place of order for the OPM process in the data structure*/
	partyOrder.dictInst[this.id] = this;
	/** @field *//**Message type used in the communications*/
	var msg = new Message("createStateInstance", this , null);
	sendMessage(msg);
}

/*Working functions*/
/**
 * Returns the parent of the OPM state.
 * @this {OPMState}
 * @return {OPMObject} parent
 */
OPMState.prototype.getParent = function() {
   return this.parent;
}
/**
 * Returns the type of the OPM state.
 * @this {OPMState}
 * @return {string} Type
 */
OPMState.prototype.getType = function() {
    return this.type;
}
/**
 * Sets the type of the OPM state.
 * @this {OPMState}
 * @param {string} type
 */
OPMState.prototype.setType = function(type) {
    this.type = type;
}
/**
 * Returns the minimal activation time for the OPM state.
 * @this {OPMState}
 * @return {date} Minimal activation time
 */
OPMState.prototype.getMinActivationTime = function() {
    return this.minActivationTime;
}
/**
 * Sets the minimal activation time for the OPM state.
 * @this {OPMState}
 * @param {date} minActivationTime
 */
OPMState.prototype.setMinActivationTime = function(minTime) {
    this.minActivationTime = minTime;
}
/**
 * Returns the maximal activation time for the OPM state.
 * @this {OPMState}
 * @return {date} Maximal activation time
 */
OPMState.prototype.getMaxActivationTime = function() {
    return this.maxActivationTime;
}
/**
 * Sets the maximal activation time for the OPM state.
 * @this {OPMState}
 * @param {date} maxActivationTime
 */
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
/**
 * @Class 
 * @description Represents an OPM Link, inherits from OPM Element.
 * @constructor
 * @this {OPMLink}
 * @param {link} src
 * @param {link} dest
 * @param {string} category
 * @param {string} type 
 */
function OPMLink(src, dest, category, type) {
	/** @field *//**Indicates the source for the OPM link*/
	this.source = src;
	/** @field *//**Indicates the destination for the OPM link*/
	this.destination = dest;
	/** @field *//**Indicates the category of the OPM link*/
	this.category = category;                     //categories are strings, two values: "Structural" and "Procedural"
	/** @field *//**Indicates the type of the OPM link*/
	this.type = type;                           //types are strings, some values: "Instrument", "Agent" etc.
}
/*Working function*/
/**
 * Returns the destination for the OPM link.
 * @this {OPMLink}
 * @return {OPMThing} Destination
 */
OPMLink.prototype.getDestination = function() {
    return this.destination;
}
/**
 * Sets the destination for the OPM link.
 * @this {OPMLink}
 * @param {OPMThing} destination
 */
OPMLink.prototype.setDestination = function(dest) {
    this.destination = dest;
}
/**
 * Returns the source for the OPM link.
 * @this {OPMLink}
 * @return {OPMThing} Source
 */
OPMLink.prototype.getSource = function() {
    return this.source;
} 
/**
 * Sets the source for the OPM link.
 * @this {OPMLink}
 * @param {OPMThing} source
 */
OPMLink.prototype.setSource = function(src) {
    this.source = src;
}
/**
 * Returns the type of the OPM link.
 * @this {OPMLink}
 * @return {string} Type
 */
OPMLink.prototype.getType = function() {
    return this.type;
}
/**
 * Sets the type of the OPM link.
 * @this {OPMLink}
 * @param {string} type
 */
OPMLink.prototype.setType = function(newType) {
   this.type = newType;
}
/**
 * Returns the category of the OPM link.
 * @this {OPMLink}
 * @return {string} Category
 */
OPMLink.prototype.getCategory = function() {
    return this.category;
}
/**
 * Sets the category of the OPM link.
 * @this {OPMLink}
 * @param {string} category
 */
OPMLink.prototype.setCategory = function(newCategory) {
   this.category = newCategory;
}


OPMProceduralLink.prototype = new OPMLink();
/**
 * @Class 
 * @description Represents an OPM Procedural Link, inherits from OPM Link.
 * @constructor
 * @this {OPMProceduralLink}
 */
function OPMProceduralLink() {               //input source and destination Objects
	/** @field *//**Indicates the category for the OPM procedural link*/
	this.category = 'Procedural';
	/** @field *//**Indicates if there's a XOR for the OPM procedural link*/
	this.relationXor = [ ];
	/** @field *//**Indicates if there's an OR for the OPM procedural link*/
	this.relationOr = [ ];
	/** @field *//**Indicates the place of order for the OPM procedural link in the data structure*/
	partyOrder.dictInst[this.id] = this;
	/** @field *//**Message type used in the communications*/
	var msg = new Message("createProceduralLinkInstance", this , null);
	sendMessage(msg);
}
/*Working functions*/
/**
 * Enforce the OPM link methodology.
 * @this {OPMProceduralLink}
 * @param {OPMThing,OPMThing} src_chk , dest_chk
 */
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
/**
 * Verify the linking of two OPM things.
 * @this {OPMProceduralLink}
 */
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
/**
 * Adds a link to a XOR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @param {string} link.id
 */
OPMProceduralLink.prototype.addXor = function(link) {
    this.relationXor[link.id] = link;
}
/**
 * Removes a link from a XOR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @param {string} link.id
 */
OPMProceduralLink.prototype.removeXor = function(link) {
    delete this.relationXor[link.id];
}
/**
 * Returns the links that has a XOR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @return {link[]} relationXor
 */
OPMProceduralLink.prototype.getXor = function() {
   return this.relationXor;
}
/**
 * Adds a link to an OR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @param {string} link.id
 */
OPMProceduralLink.prototype.addOr = function(link) {
    this.relationOr[link.id] = link;
}
/**
 * Removes a link from an OR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @param {string} link.id
 */
OPMProceduralLink.prototype.removeOr = function(link) {
    delete this.relationOr[link.id];
}
/**
 * Returns the links that has an OR relation with the OPM procedural link.
 * @this {OPMProceduralLink}
 * @return {link[]} relationOr
 */
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
/**
 * @Class 
 * @description Represents an OPM Structural Link, inherits from OPM Link.
 * @constructor
 * @this {OPMStructuralLink}
 */
function OPMStructuralLink() {
	/** @field *//**Indicates the category of the OPM structural link*/
    this.category = 'Structural';
    /** @field *//**Indicates the participation constant for the OPM structural link*/
    this.participationConst = null;
    /** @field *//**Indicates the participation value for the OPM structural link*/
    this.participationVal = null;
    /** @field *//**Indicates the cardinality of the OPM structural link*/
    this.cardinality = 1;
    /** @field *//**Indicates the tag for the OPM structural link*/
    this.tag = null;                                                   //description shown on link itself - only for uni/bi-directional relations
    /** @field *//**Indicates the place of order for the OPM structural link in the data structure*/
    partyOrder.dictInst[this.id] = this;
    /** @field *//**Message type used in the communications*/
    var msg = new Message("createStructuralLinkInstance", this , this.creator);
    sendMessage(msg);
}  
/*Working function*/
/**
 * Enforce the OPM link methodology.
 * @this {OPMStructuralLink}
 * @param {OPMThing,OPMThing} src_chk , dest_chk
 */
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
/**
 * Verify the linking of two OPM things.
 * @this {OPMStructuralLink}
 */
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
/**
 * Returns the cardinality of the OPM structural link.
 * @this {OPMProceduralLink}
 * @return {string} Cardinality
 */
OPMStructuralLink.prototype.getCardinality = function() {
    return this.cardinality;
}
/**
 * Returns the cardinality of the OPM structural link.
 * @this {OPMProceduralLink}
 * @param {string} cardinality
 */
OPMStructuralLink.prototype.setCardinality = function(card) {
    this.cardinality = card;
}
/**
 * Returns the tag of the OPM structural link.
 * @this {OPMProceduralLink}
 * @return {string} Tag
 */
OPMStructuralLink.prototype.getTag = function() {
    return this.tag;
}
/**
 * Returns the tag of the OPM structural link.
 * @this {OPMProceduralLink}
 * @param {string} tag
 */
OPMStructuralLink.prototype.setTag = function(tag) {
    this.tag = tag;
}
/**
 * Returns the participation constant of the OPM structural link.
 * @this {OPMProceduralLink}
 * @return {string} Participation Constant
 */
OPMStructuralLink.prototype.getParticipationConst = function() {
    return this.participationConst;
}
/**
 * Returns the participation constant of the OPM structural link.
 * @this {OPMProceduralLink}
 * @param {string} participationConst
 */
OPMStructuralLink.prototype.setParticipationConst = function(partConst) {
    this.participationConst = partConst;
}
/**
 * Returns the participation value of the OPM structural link.
 * @this {OPMProceduralLink}
 * @return {string} Participation Value
 */
OPMStructuralLink.prototype.getParticipationVal = function() {
    return this.participationVal;
}
/**
 * Sets the participation value of the OPM structural link.
 * @this {OPMProceduralLink}
 * @param {string} participationVal
 */
OPMStructuralLink.prototype.setParticipationVal = function(val) {
    this.participationVal = val;
}
/*Non-working function*/
OPMStructuralLink.prototype.destructor = function() {
    delete this.source.inLinks[this.id];
    delete this.destination.outLinks[this.id];
    delete this;
}

