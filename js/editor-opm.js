//Handling of Topological relations between objects 
function PartyOrder(){
//this function creates the dictionary that will holw the keys to the instances of the objects
//dictIn
	this.dictInst = {};   //holds the id's to the instances
	this.dictChildLen = {}; //holds the number of the children that the parent instance has
}
PartyOrder.prototype.getId = function(id) {
//Creates the id of the the instance of a new element by adding a new suffix to the parent id
	var DEFAULT = 1000; //case its a new father id 
	if (!id) {
		return DEFAULT;
	}
	else {
		var newsuff = this.dictChildLen[id] + 1;   //checking for the first available suffix
		var newId = id.toString() + ':' + newsuff.toString();  //assigning the suffix of the new element 
		return newId; 
	}
}
PartyOrder.prototype.add = function(inst) {
//Increases the number of the children assigned to the father element
	this.dictInst[inst.id] = inst;
	this.dictChildLen[inst.id] = 0;
	var temp = inst.id.split(':');
	if (temp.length !== 1) {
		temp.pop();
		parentId = temp.join(':');
		dictChildLen[parentId]++;
	}
}

PartyOrder.prototype.update = function(inst) {
//updating the instance id
	this.dictInst[inst.id] = inst;
}

PartyOrder.prototype.remove = function(id) {}

//End of Topological handling function
	