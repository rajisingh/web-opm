var loadActions = [
      	"checkUser",
      	"getUserModels",
      	"loadModel",
          ];
function msgHandler(msgChannel){
	this.action = null;
    this.data = null;
	alert("before decoding alert"+ msgChannel["data"]);

	var msg = JSON.decode(msgChannel["data"]);
	alert("JSON MESSAGE IS: "+msg);
	this.action = msg["action"];
    this.data = msg["data"];
    
    if(!this.action){ alert("no action provided in message");}
    else{
    	switch(this.action){
    	case "checkUser":
    		
    		break;
    	case"getUserModels":
            var models = this.data;
    		alert(models[0]);
    		loadList();
    		
    		break;
    	case "loadModel":
    		
    		break;
    	}
    }
}

function loadList() {
	//open list of saved User models
	$('#loadModel').modal('show');
}