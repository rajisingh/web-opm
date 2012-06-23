/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains message class which is instantiated to send the update to the server
 * 
 *    Author: Michael Krasnopolsky
 * */

var actions = { 
	/* key-value list when the key is (CaSe sensitive !!) string, 
	 * the value of a key is an action name in RPCMethods (index.py)
	 * the value is the HttpRequest method GET/POST (CaSe sensitive !!) 
	 * the dict can be added via method 'addAction'
	 *  */
		
		"add": 'POST',
		"createUserInstance": 'GET',
		"createModelInstance": 'GET',
		"createDiagramInstance": 'GET',
		"createObjectInstance": 'GET',
		"createProcessInstance": 'GET',
		"createStateInstance": 'GET',
		"createProceduralLinkInstance": 'GET',
		"createStructuralLinkInstance": 'GET',
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


function Message(action, data, userId) {
	/* this message is an input attr to the function sendMessage, where
	 * action is a string with the accurate name of the method that needs 
	 * to be activated on the server
	 * data will be received by the server is input parameter for corresponding actions
	 * */
	
	this.id = randomFromTo(1, 1000); 							//need to generate unique id
	this.action = action;
	this.data = data;
	this.clientId = userId;
}
Message.prototype.send = function(){
	try {
		if (actions.hasOwnProperty(this.action)) {
			if (this.action === 'GET') {
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