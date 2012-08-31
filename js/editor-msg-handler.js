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
    		for (var index in data){
    			var cell = data[index];
    			var cellVal = cell[0].toString();
				var loader = cell[1];
				loader.loaderType = "load";
	    		var pageLoader = new Object();
	    		pageLoader.type = "load";
    			switch(cellVal){
    			case 'createModelInstance':
    	    		pageLoader.activeOPMModel = new OPMModel(loader);
    				break;
    			case 'createDiagramInstance':
        			pageLoader.activeOPMDiagram = new OPMDiagram(loader);
    				break;
    			case 'createUIDiagram':
    				pageLoader.activeUIDiagram = new UIDiagram(loader);
    				alert("DIAGRAM "+loader);
    				break;
    			case 'createObjectInstance':
    				new OPMObject(loader);
    				break;
    			case 'createUIObject':
    				alert("OBJECT "+loader);
    				break;
    			case 'createProcessInstance':
    				new OPMProcess(loader);
    				break;
    			case 'createUIProcess':
    				alert("PROCESS "+loader);
    				break;
    			case 'createStateInstance':
    				new OPMState(loader);
    				break;
    			case 'createUIState':
    				alert("STATE "+loader);
    				break;
    			case 'createProceduralLinkInstance':
    				new OPMProceduralLink(loader);
    				break;
    			case 'createStructuralLinkInstance':
    				new OPMStructuralLink(loader);
    				break;
    			case 'createUILink':
    				alert("LINK "+loader);
    				break;
    			}
    		}
    		loadMain(pageLoader);
    		break;
    	}
    }
}
