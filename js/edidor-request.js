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
		    "http://localhost:8080/rpc", 
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
	JSONRequest.get("http://localhost:8080/rpc?JSONRequest="+request, function(requestNumber, result, exception){
	//	callback function , on success will run only with 2 first parameters
	});
	
}

var channel = null;
function channel_open() {
	// the method opens a channel with the server by GET request
	obj=new MsgObj("openChannel","");
	jsonObj=JSON.encode(obj);
	var request = encodeURIComponent(jsonObj);
	JSONRequest.get("http://localhost:8080/rpc?JSONRequest="+request, function(sn, result, error){ 
//		alert(result);
		channel = new goog.appengine.Channel(result);
		socket = channel.open();
		// the next are callback functions 
		//onmessage receives object with one field "data" , its what the server sends
		//onerror receives object with 2 fields , "code" - the http error code , and "description"
		socket.onopen = function() {alert("channel opened");}
		socket.onmessage = function(msg) {alert("answer :"+ msg.data ); }
		socket.onerror = function(err){alert(err.code + ":" + err.description )};
  		socket.onclose = function() {alert("channel closed");};
	});
}






