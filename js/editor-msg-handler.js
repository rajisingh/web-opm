var loadActions = [
      	"checkUser",
      	"getUserModels",
      	"loadModel",
          ];
function msgHandler(msgChannel){
	this.action = null;
    this.data = null;
	var msg = JSON.decode(msgChannel["data"]);
	this.action = msg["action"];
    this.data = msg["data"];
    
    if(!this.action){ alert("no action provided in message");}
    else{
    	switch(this.action){
    	case "checkUser":
    		
    		break;
    	case"getUserModels":
            var models = this.data;
    		//open modal window to show user's model list
    		$('#loadModel').modal('show');
    		var updateList = document.getElementById('innerList');

    		for(var model in models){
        		// Add an Option object to Drop Down/List Box
                // Assign text and value to Option object
    			var temp = models[model];
    			if(!updateList.hasOwnProperty(model)){
        			updateList.options[innerList.options.length] = new Option("ID_"+temp[0]+" - "+"NAME_"+temp[1],temp[0]);
    			}
    		}
    		break;
    	case "loadModel":
    		alert("starting load");
    		alert(this.data);
    		//TODO: need to clear partyOrder before successfull load
    		//for (var index in data){
    		//	if(typeof(data["index"] === object)){
    				
    		//	}
    		//}
    		break;
    	}
    }
}
