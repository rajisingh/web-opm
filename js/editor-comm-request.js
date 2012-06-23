/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    File contains implementation of XHR
 * 
 *    Author: Michael Krasnopolsky
 * */

var httpRequestPost = function(obj) {
// receives Message object and send it to server via JSONRequest POST
	var body = obj;	
	requestNumber = JSONRequest.post(
		    "http://localhost:8080/rpc", 
		    body, 
		    function (requestNumber, result, exception) {
		      // callback function , on success will run only with 2 first parameters
		    }
		); 	
}

var httpRequestGet = function(obj) {
	// receives MsgObj object and send it to server via JSONRequest GET	
	jsonObj=JSON.encode(obj);
	var request = encodeURIComponent(jsonObj);
	JSONRequest.get("http://localhost:8080/rpc?JSONRequest="+request, function(requestNumber, result, exception) {
	//	callback function , on success will run only with 2 first parameters
	});
}