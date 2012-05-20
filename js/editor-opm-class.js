/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 * 	Authors: Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 * */

function User(email, password) {
	this.id = randomFromTo(1, 1000);
	this.provider = null;							//mechanism used for oauth2.0: {google, facebook, twitter}
	this.token = null;								//used for oauth2.0
	this.email = email;
	this.firstName = null;
	this.lastName = null;
	this.password = password;
	this.models = { };
	this.lastLogin = new Date(); 					//timestamp
	this.loginStatus = null; 						//boolean
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
  //call JSON function and receives list of all Model IDs of this user.
	return this.models;
}
User.prototype.addModel = function(model) {
	//add model to the list
	this.models[model.id] = model;
}
User.prototype.getLastLogin = function() {
	return this.lastLogin;
}
User.prototype.setLastLogin = function() {
	this.lastLogin = new Date();
}
User.prototype.setToken = function(token) {
	/*Token is given to the user after she signs in via provider. 
	 *Token is needed to be kep in order to sign in user automatically when she enters web-site repeatedly*/
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
	//TODO: should this be a recursive function, or is it enough to call the model's destructor?
}
User.prototype.login = function() {
	//call FB/Google/LinkedIn/Twitter login algorithm and process via Python?
}
User.prototype.logout = function() {
	this.loginStatus = false;
}



function OPMModel(creator) {							
	this.id = randomFromTo(1, 1000);
	this.creator = creator;
	this.name = 'New Model'; 								//default value
	this.type = 'System';
	this.participants = { }
	this.sd = new OPMDiagram('sd', null, 0);				//create first SD for model, with level=0
	this.diagrams = { };									//map object with diagrams in a model
	this.lastUpdate = new Date();
	this.creationDate = new Date();
}

/*Working functions*/
OPMModel.prototype.getId = function(){ 
	return this.id;
}
OPMModel.prototype.getCreator = function() {
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
	this.participants[newUser.id] = newUser;
}
OPMModel.prototype.unshare = function(user) {
	//removes a specific user from the participants list
	delete this.participants[user.id];
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
OPMModel.prototype.addDiagram = function(diagram) {
	this.diagrams[diagram.id] = diagram;
}
OPMModel.prototype.getDiagrams = function() {
	//returns list of all diagrams in model
	return this.diagrams;
}
OPMModel.prototype.removeDiagram = function(diagram) {
	//removes diagram for diagram list
	delete this.diagrams[diagram.id];
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
OPMModel.prototype.getSd = function() {
	return this.sd;
}
/*Non-working functions*/
OPMModel.prototype.load = function() {
	//need procedure for loading a model from DB
}
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
	var answer = confirm ( "You are about to Completely remove\n all Model diagrams. Are you sure you wish to continue?" )
	if (answer) {
		try {
		  delete this.creator.models[this.id];
		  delete this; 						       //FIXME: is this expression true??
		}
		catch(err) {
			txt="There was an error deleting the model.\n\n";
			txt+="Error description: " + err.message + "\n\n";
			txt+="Click OK to continue.\n\n";
			alert(txt);
		}
	}
}



function OPMDiagram(id, predecessor, level) {	
	this.id = id;
	this.predecessor = predecessor;							//diagram object of the "father", can be null
	this.successors = { };									//map of successors
	this.elements = { };									//map of elements that diagram contains
	this.name = 'New Diagram';								//default value
	this.number = null;
	this.OPL = null;
	this.level = level; 									//int
}
/*Working functions*/
OPMDiagram.prototype.getId = function() {
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
OPMDiagram.prototype.addElement = function(element) {
	this.elements[element.id] = element;
}
OPMDiagram.prototype.getElements = function() {
	return this.elements;
}
OPMDiagram.prototype.removeElement = function(element) {
	delete this.elements[element.id]
}
OPMDiagram.prototype.getPredecessor = function() {
    return this.predecessor;
}
OPMDiagram.prototype.getSuccessors = function() {
    return this.successors;
}
OPMDiagram.prototype.addSuccessor = function(diagram) {
    //receives OPMDiagram object to add to the map of successor diagrams
    this.successors[diagram.id] = diagram;
}
OPMDiagram.prototype.removeSuccessor = function(diagram) {
	delete this.successors[diagram.id];
}
OPMDiagram.prototype.getLevel = function() {
    return this.level;
}
OPMDiagram.prototype.getOPL = function() {
	return this.OPL;
}
/*Non-working function*/
OPMDiagram.prototype.reLevel = function(levels) {          
	//if level-up - enter positive int, otherwise negative
    //recursively re-assigns levels to entire diagrams (nodes) in the tree.
	try	{
		if (this.successors === null) {
			return;
		}
		this.level = this.level - levels;
		for (var i in this.successors) {
			this.successors.reLevel(levels);
		}
    }
	catch(err) {
		txt="There was an error deleting the model.\n\n";
		txt+="Error description: " + err.message + "\n\n";
		txt+="Click OK to continue.\n\n";
		alert(txt);
	}
}
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



function OPMElement(id) {
    this.id = id;
    this.diagrams = { };                       	//may be part of a few diagrams, so using map
    this.description = null;
}
OPMElement.prototype.getId = function() {
    return this.id;
}
OPMElement.prototype.getDescription = function() {
    return this.description;  
}
OPMElement.prototype.setDescription = function(description) {
    this.description = description;  
}
OPMElement.prototype.getDiagrams = function() {
    return this.diagrams;
}
OPMElement.prototype.addDiagram = function(diagram) {
    //receives diagram object
    this.diagrams[diagram.id] = diagram;
}
OPMElement.prototype.removeDiagram = function(diagram) {
	//removes diagram from the element's list of diagrams
    delete this.diagrams[diagram.id];
}




OPMEntity.prototype = new OPMElement(); 		//inheriting from OPMElement
function OPMEntity() {
	this.name = null;
	this.inLinks = { };							//map - keys are source of links
	this.outLinks = { };						//map - keys are destination of links
}
/*Working functions*/
OPMEntity.prototype.getName = function() {
	return this.name;
}
OPMEntity.prototype.setName = function(name) {
	this.name = name;
}
OPMEntity.prototype.getInLinks = function() {
	return this.inLinks;
}
OPMEntity.prototype.getOutLinks = function() {
	return this.outLinks;
}
OPMEntity.prototype.addLink = function(link) {
	if (link.verifyLink ( link.source , link.destination)) {
		if (link.source.id === this.id) {
			this.outLinks[link.id] = link;
		}
		else {
			this.inLinks[link.id] = link;
		}
	}
}
OPMEntity.prototype.removeLink = function(link) {
//remove link from source and destination
	try {
		if(link.source.id === this.id){
			delete this.outLinks[link.id].destination.inLinks[link.id];
			delete this.outLinks[link.id];
		}
		else if(link.destination.id === this.id){
			delete this.inLinks[link.id].source.outLinks[link.id];
			delete this.inLinks[link.id];
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
  


OPMThing.prototype = new OPMEntity(); 			// inheriting from OPMEntity 
function OPMThing()	{
	this.essence = "Informatical";
    this.affiliation = "Systemic";				//default value
    this.scope = "Public";
    this.unfoldDiag = { };						//diagram instance which is created by unfolding of this object
    this.inzoomDiag = { };						//diagram instance which is created by inzooming of this object
    this.things = { };
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
OPMThing.prototype.addThing = function(thing) {
    this.things[thing.id] = thing;	
}
OPMThing.prototype.removeThing = function(thing) {
    var currId = thing.id;                      					//once destructor is used, ID is no longer available
    this.things[thing.id].destructor();
    delete this.things[currId];
    delete currId;
}
OPMThing.prototype.getThing = function() {
	return this.things;
}
OPMThing.prototype.getURL = function() {
	return this.url;
}
OPMThing.prototype.setURL = function(newURL) {
	this.url = newURL;
}
OPMThing.prototype.getUnfoldDiag = function() {
	return this.unfoldDiag;
}
OPMThing.prototype.getInzoomDiag = function() {
	return this.inzoomDiag;
}
/*Non-working functions*/
OPMThing.prototype.unfolding = function(newDiagId, fatherDiag) {
	//unfold object/process
	this.unfoldDiag = new OPMDiagram(newDiagId, fatherDiag, fatherDiag.level + 1);
	this.unfoldDiag.elements[this.id] = this;									//add current element to new unfolded diagram
	return this.unfoldDiag;
}
OPMThing.prototype.inzooming = function(newDiagId, fatherDiag) {
    //inzoom object/process, returns new Diagram object
    this.inzoomDiag = new OPMDiagram(newDiagId, fatherDiag, fatherDiag.level + 1);
    this.inzoomDiag.elements[this.id] = this;										//add current element to new inzoomed diagram
    return this.inzoomDiag;
}



OPMObject.prototype = new OPMThing();
function OPMObject() {
	this.states = { };
	this.initValue = null;
	this.type = "Compound Object";
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
OPMObject.prototype.addState = function(state) {
	this.states[state.id] = state; 
}
OPMObject.prototype.removeState = function(state) {
	delete this.states[state.id];
}
OPMObject.prototype.getStates = function() {
	return this.states;
}



OPMProcess.prototype = new OPMThing();
function OPMProcess() {
	this.minActivationTime = null;
	this.maxActivationTime = null;
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
function OPMState(parent) {									//parent is an object which contains the state
    this.type = null;										//final, default, initial
    this.parent = parent;									//of type OPMObject
    this.minActivationTime = null;
    this.maxActivationTime = null;
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
    this.category = category;							//categories are strings, two values: "Structural" and "Procedural"
    this.type = type;									//types are strings, some values: "Instrument", "Agent" etc.
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
OPMLink.prototype.getCategory = function() {
    return this.category;
}



OPMProceduralLink.prototype = new OPMLink();
function OPMProceduralLink() {					//input source and destination Objects
    this.xor = { };
    this.or = { };
}
/*Working functions*/
OPMProceduralLink.prototype.verifyLink = function() {
	//check for existing type of procedural link between two entities
	if (src.outLinks[ dest.id ].category ===  dest.inLinks[ src.id ].category) {
		alert("Cannot connect two Objects with more than one " + this.type + " Link");
		return false;
    }
    //rest of Logic rules using Switch, by source type. many more rules are to be added
    switch (src.constructor.name) {
    case "OPMObject":
    	if (dest.constructor.name === "OPMProcess") {
    		if (this.type === "Invocation" || this.type === "Exception") { return false; }
    		else { return true; }
    	}
    	if (dest.constructor.name === "OPMObject" || dest.constructor.name === "OPMState") { return false; }
    case "OPMProcess":
    	if (dest.constructor.name === "OPMObject" || dest.constructor.name ==="OPMState") {
    		if (this.type === "Result" || this.type === "Effect") { return true; }
    		else { return false; } 
    	}
    	if (dest.constructor.name === "OPMProcess") {
    		if (this.type === "Invocation" || this.type === "Exception") { return true; }
        else { return false; }
    	}
    case "OPMState":
    	if (dest.constructor.name === "OPMProcess") {
    		if (this.type === "Invocation" || this.type === "Exception") { return false; }
    		else { return true; }
      	}
    	if (dest.constructor.name === "OPMObject" || dest.constructor.name === "OPMState") { return false; }
    }
}  
OPMProceduralLink.prototype.addXor = function(link) {
    this.xor[link.id] = link;
}
OPMProceduralLink.prototype.removeXor = function(link) {
    delete this.xor[link.id];
}
OPMProceduralLink.prototype.getXor = function() {
	return this.xor;
}
OPMProceduralLink.prototype.addOr = function(link) {
    this.or[link.id] = link;
}
OPMProceduralLink.prototype.removeOr = function(link) {
    delete this.or[link.id];
}
OPMProceduralLink.prototype.getOr = function() {
	return this.or;
}
/*Non-working functions*/
OPMProceduralLink.prototype.destructor = function() {
    delete this.source.inLinks[this.id];
    delete this.destination.outLinks[this.id];
    delete this;
}


OPMStructuralLink.prototype = new OPMLink();
function OPMStructuralLink() {
    this.participationConst = null;
    this.participationVal = null;
    this.cardinality = 1;
    this.tag = null;																	//description shown on link itself - only for uni/bi-directional relations
}  
/*Working function*/
OPMStructuralLink.prototype.verifyLink = function() {
	//returns true if verified, otherwise returns false
    if (src.outLinks[ dest.id ].category ===  dest.inLinks[ src.id ].category) {         //check for existing type of structural link between two entities
    	if (this.type === "Unidirectional" || this.type === "Bidirectional") { return true; }
    	else {
    		alert("Cannot connect two Objects with more than one " + this.type + " Link");
    		return false;
    	}
    }
    switch (src.constructor.name) {                                                      //rest of Logic rules using Switch, by source type.
    	case "OPMObject":
    		if (dest.constructor.name === "OPMProcess") {
    			if (this.type === "Exhibition") { return true; }
            else { return false; } 
    		}
    		if (dest.constructor.name === "OPMObject") { return true; }
        case "OPMProcess":
        	if (dest.constructor.name === "OPMObject") {
        		if (this.type === "Exhibition") { return true; }
            else { return false; }
        	}
        	if (dest.constructor.name === "OPMProcess") { return true; }
        case "OPMState": return false;
    }
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


