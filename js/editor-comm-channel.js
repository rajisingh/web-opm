/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains function to open channel (Google Channel API)
 * 
 *    Author: Michael Krasnopolsky
 * */

var channel = null;
var channelOpen = function() {
	// the method opens a channel with the server by GET request
	obj = new Message("openChannel", null, currentUser.id);
	jsonObj = JSON.encode(obj);
	var request = encodeURIComponent(jsonObj);
	JSONRequest.get("http://localhost:8080/rpc?JSONRequest="+request, function(sn, result, error){ 
//		alert(result);
		channel = new goog.appengine.Channel(result);
		socket = channel.open();
		/* Callback functions:
		 * onmessage: receives object with one field "data" , its what the server sends
		 * onerror: receives object with 2 fields , "code" - the http error code , and "description"
		 * */
		socket.onopen = function() { alert("channel opened"); }
		socket.onmessage = function(msg) {alert("MSG RECEIVED"); msgHandler(msg); 	}
		socket.onerror = function(err) {alert("ERROR MSG RECEIVED"); alert(err.code + ":" + err.description )};
  		socket.onclose = function() { alert("channel closed"); };
	});
}

var loadActions = [
      	"checkUser",
      	"getUserModels",
      	"loadModel",
          ];
function msgHandler(msg){
	this.action = null;
    this.data = null;
	var msgData = JSON.decode(msg);
	this.action = msg["action"];
    this.data = msg["data"];
    
    if(!action){ alert("no action provided in message");}
    else{
    	switch(action){
    	case "checkUser":
    		
    		break;
    	case"getUserModels":
            var models = this.data;;
    		alert(models[1]);
    		for(var i=0; i<=models.length(); i++){
        		// Add an Option object to Drop Down/List Box
                document.getElementById("modelList").options.add(opt);
                // Assign text and value to Option object
                opt.text = "MODEL_ID"+i;
                opt.value = "MODEL"+i;
    		}
    		break;
    	case "loadModel":
    		
    		break;
    	}
    }
}

msgHandler.prototype.receive = function(){
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