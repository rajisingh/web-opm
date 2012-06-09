function Message(action, data, user) {
	/* this message is an input attr to the function sendMessage, where
	 * action is a string with the accurate name of the method that needs 
	 * to be activated on the server
	 * data will be received by the server is input parameter for corresponding actions
	 * */
	this.id = randomFromTo(1, 1000); // need to generate unique id
	this.action = action;
	this.data = data;
	this.clientId = user.id;
}


var actions = { 
	/* key-value list when the key is (CaSe sensitive !!) string, 
	 * the value of a key is an action name in RPCMethods (index.py)
	 *  the value is the HttpRequest method GET/POST (CaSe sensitive !!) 
	 *  the dict can be added via method 'addAction'
	 *  */
		
		"add": 'POST',
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


var sendMessage = function(msg) {
// function receives MsgObj and choose how to sent it to the server (via POST or GET)  
	try {
		if (actions.hasOwnProperty(msg.action)) {
			if (actions[msg.action] === 'GET') {
				httpRequestGet(msg);
			}
			else {
				httpRequestPost(msg);	
			}
			
		} 
		else {
			var err = new Error('Action not in list ')
		}
	}
	catch(e) {
		alert(e.message);
	}
}

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
		
	}
    sendMessage(obj);           
}
*/