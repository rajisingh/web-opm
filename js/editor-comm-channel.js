var channel = null;
var channelOpen = function() {
	// the method opens a channel with the server by GET request
	obj = new Message("openChannel","",currentUser);
	jsonObj = JSON.encode(obj);
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