/** @fileOverview Handling of Topological relations between objects.
 * @author Sergey N. Bolshchikov & Alex Kagan
 */


/**
 * @Class
 * @description creates the dictionary that will hold the keys to the instances of the objects - dictIn
 * @constructor
 * @this {PartyOrder}
*/

function PartyOrder(){
	/** @field *//** holds the id's to the instances .*/
	this.dictInst = {};   
	/** @field *//**holds the number of the children that the parent instance has.*/
	this.dictChildLen = {}; 
}
/**
 * Creates the id of the the instance of a new element by adding a new suffix to the parent id.
 *
 * @this {PartyOrder}
 * @param {number} id
 * @return {number} New ID
 */
PartyOrder.prototype.getId = function(parentId) {
	var DEFAULT = '1000'; //case its a new father id 
	if (!parentId) {
		return DEFAULT;
	}
	else {
		var newsuff = this.dictChildLen[parentId] + 1;   //checking for the first available suffix
		var newId = parentId.toString() + ':' + newsuff.toString();  //assigning the suffix of the new element 
		return newId; 
	}
}
/**
 * Increases the number of the children assigned to the father element.
 *
 * @this {PartyOrder}
 * @param {instance} inst
 */
PartyOrder.prototype.add = function(inst) {

	this.dictInst[inst.id] = inst;
	this.dictChildLen[inst.id] = 0;
	var temp = inst.id.split(':');
	if (temp.length !== 1) {
		temp.pop();
		parentId = temp.join(':');
		this.dictChildLen[parentId]++;
	}
}
/**
 * returns the instance id.
 *
 * @this {PartyOrder}
 * @return {string} id
 */
PartyOrder.prototype.get = function(id) {
	return this.dictInst[id];
}
/**
 * updating the instance id.
 *
 * @this {PartyOrder}
 * @param {instance} inst
 */
PartyOrder.prototype.update = function(inst) {

	this.dictInst[inst.id] = inst;
}

PartyOrder.prototype.empty = function(){
	for(var index in this.dictInst){
		delete this.dictInst[index];
	}
	for(var index in this.dictChildren){
		delete this.dictChildLen[index];
	}
}

PartyOrder.prototype.remove = function(id) {}

//End of Topological handling function
