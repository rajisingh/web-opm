var actions = { 
		// key-value list when the key is (CaSe sensitive !!) string , action name in RPCMethods (index.py)
		// and the value is the HttpRequest method GET/POST (CaSe sensitive !!) 
		// you can add manually or use the the function "addAction"
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

function MsgObj(act, dat){
	// send this kind of objects to the method "sendUpd()" 
	// action - a string with the accurate name of the method you want to activate on the server
	// data - the method in "action" on the server will get it as a parameter
	this.id = randomFromTo(1, 1000); // need to generate unique id
	this.action=act;
	this.data=dat;
	this.clientId=currentUser.id;
}


function sendUpd(obj)
{
// this function receives MsgObj and choose how to sent it to the server (via POST or GET)  
	try {
		if (actions.hasOwnProperty(obj.action)) {
			if (actions[obj.action] === 'GET') {
				httpRequestGet(obj);
			}
			else {
				httpRequestPost(obj);	
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

function aaa(x){
// my checks


	if (x===1) {
		data= new Object();
		data.arg1=1;
		data.arg2=2;
		obj=new MsgObj("add",data);
	/*	obj =new Object();
		obj.action="add";
		obj.data=data;
		obj.id=1;
		obj.clientId=currentUser.id; */
	}
	else if (x===2) {
		data= new Object();
		data.arg1=1;
		data.arg2=2;
		obj=new MsgObj("minus",data);
	/*	obj =new Object();
		obj.action="minus";
		obj.data=data;
		obj.id=1;
		obj.clientId=currentUser.id; */
	}
    sendUpd(obj);           
     
}

function httpRequestPost(obj){
// receives MsgObj object and send it to server via JSONRequest POST
	var body = obj;	
	requestNumber = JSONRequest.post(
		    "http://localhost:8080/rpcp", 
		    body, 
		    function (requestNumber, result, exception) {
		      // callback function , on success will run only with 2 first parameters
		    }
		); 	
}

function httpRequestGet(obj) {
	// receives MsgObj object and send it to server via JSONRequest GET	
	jsonObj=JSON.encode(obj);
	var request = encodeURIComponent(jsonObj);
	JSONRequest.get("http://localhost:8080/rpcg?JSONRequest="+request, function(requestNumber, result, exception){
	//	callback function , on success will run only with 2 first parameters
	});
	
}







