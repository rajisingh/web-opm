/** @fileOverview   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains message class which is instantiated to send the update to the server
 * 
 * @author Michael Krasnopolsky
 * */

var actions = { 
	/* key-value list when the key is (CaSe sensitive !!) string, 
	 * the value of a key is an action name in RPCMethods (index.py)
	 * the value is the HttpRequest method GET/POST (CaSe sensitive !!) 
	 * the dict can be added via method 'addAction'
	 *  */
		
		"add": 'POST',
		"getUserModels": 'GET',
		"loadModel": 'GET',
		"createUserInstance": 'POST',
		"createModelInstance": 'POST',
		"createDiagramInstance": 'POST',
		"createObjectInstance": 'POST',
		"createProcessInstance": 'POST',
		"createStateInstance": 'POST',
		"createProceduralLinkInstance": 'POST',
		"createStructuralLinkInstance": 'POST',
		"createUIDiagram": 'POST',
		"createUIObject": 'POST',
		"createUIProcess": 'POST',
		"createUIState": 'POST',
		"createUILink": 'POST',
		"minus": 'GET',
		"openChannel": 'GET',
		
		addAction: function(action, method) {
			try {
				if (this.hasOwnProperty(action)) {
					var msg = 'Action already exists in the list';
					var err = new Error(msg);
					throw err;
				}
				else if ((method !== 'POST') && (method !== 'GET')) {
					var err = new Error('Wrong method type (should be GET or POST)');
					throw err;
				}
				else {
					this[action] = method;
				}
			}
			catch(e) {
				alert(e.message);
			}
		}
}

/**
 * @Class 
 * @description this message is an input attr to the function sendMessage, where
 * action is a string with the accurate name of the method that needs 
 * to be activated on the server.
 * data will be received by the server is input parameter for corresponding actions.
 * @constructor
 * @this {Message}
 * @param {string} action
 * @param {data} data
 * @param {string} userId
 */
function Message(action, data, userId) {
	
	/** @field *//** Holds the ID number of a message.*/
	this.id = randomFromTo(1, 1000); 							//need to generate unique id
	/** @field *//** Indicates the action required to perform.*/
	this.action = action;
	/** @field *//** Holds the data of the message.*/
	this.data = data;
	/** @field *//** Indicates the client that sent the message.*/
	this.clientId = userId;
}
/**
 * Send the message.
 * @this {Message}
 */
Message.prototype.send = function(){
	try {
		if (actions.hasOwnProperty(this.action)) {
			if (actions[this.action] === 'GET') {
				httpRequestGet(this);
			}
			else {
				httpRequestPost(this);
			}
		}
		else {
			var err = new Error ('No such action exist in the Action Dictionary\n dependency: editor-comm.js');
			throw err;
		}
	}
	catch(e) {
		alert(e.message);
	}
}

//TODO: Remove when code works
/*
function aaa(x){
// sendMessage checks
	if (x===1) {
		data= new Object();
		data.arg1=1;
		data.arg2=2;
		obj=new Message("add",data,currentUser);
		
	}
	else if (x===2) {
		
		data= new Object();
		data.arg1=1;
		data.arg2=2;
		obj=new Message("minus",data,currentUser);
	
		userData= new Object()
		userData.id = currentUser.id
		userData.provider =currentUser.provider 
		userData.token =currentUser.token 
		userData.email = currentUser.email
		userData.firstName =currentUser.firstName
		userData.lastName = currentUser.lastName
		userData.password =currentUser.password 
		userData.models = { }
		userData.lastLogin =currentUser.lastLogin	
		userData.loginStatus =currentUser.loginStatus
		obj=new Message( "createUserInstance", userData, currentUser);
		
	}
    sendMessage(obj);           
}
*/