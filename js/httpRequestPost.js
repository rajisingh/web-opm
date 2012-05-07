function httpRequestPost(jsonObj)
{
	requestNumber = JSONRequest.post(
		    "http://EDIT.ME/request",jsonObj, 
		    function (requestNumber, value, exception) {
		        if (value) {
		        	alert("Return value: " + value );
		        } else {
		        	alert("Error: " + exception.description );
		        }
		    }
		); 	
}
