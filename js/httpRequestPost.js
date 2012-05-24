var actions = {
		"add": 'POST',
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

function aaa()
{
//	alert("so");
	data= new Object();
	data.arg1=1;
	data.arg2=2;
	obj=new Object();
    obj.action="add";
    obj.id=121;
    obj.data= data;
    
    sendUpd(obj);           
     
}

function httpRequestPost(params)
{
	
	var body = params;
	
	requestNumber = JSONRequest.post(
		    "http://localhost:8080/rpcp", 
		    body, 
		    function (requestNumber, value, exception) {
		      /*  if (value) {
		        	alert("Return value: " + value );
		        } else {
		        	alert("Error: " + exception.description );
		        }   */
		    	alert("req :"+ requestNumber + " ,val : "+ value +",ex : "+  exception)
		    }
		); 	
}

function httpRequestGet(obj) {
	
	data= new Object();
	data.arg1=1;
	data.arg2=2;
	obj=new Object();
    obj.action="add";
    obj.id=121;
    obj.data= data;
	jsonObj=JSON.encode(obj);
	var request = encodeURIComponent(jsonObj);
	JSONRequest.get("http://localhost:8080/rpcg?JSONRequest="+request, function(sn, result, error){alert([sn, result, error])});
	
}







