function aaa()
{
	personObj=new Object();
    personObj.firstname="John";
    personObj.lastname="Doe";
    personObj.age=50;
    personObj.eyecolor="blue";           
    var jsonStr = JSON.stringify(personObj);
    httpRequestPost(jsonStr) 
}

function httpRequestPost(jsonObj)
{
	requestNumber = JSONRequest.post(
		    "http://EDIT.ME/request", 
		    jsonObj, 
		    function (requestNumber, value, exception) {
		        if (value) {
		        	alert("Return value: " + value );
		        } else {
		        	alert("Error: " + exception.description );
		        }
		    }
		); 	
}

