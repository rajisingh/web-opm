/** @fileOverview Handling of Topological relations between objects.
 * @author Sergey N. Bolshchikov & Alex Kagan
 */


/**
 * @Class
 * @description creates the dictionary that will hold the keys to the instances of the objects - dictIn
 * @constructor
 * @this {ParyOrder}
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
 * @this {ParyOrder}
 * @param {number} id
 * @return {number} New ID
 */
PartyOrder.prototype.getId = function(id) {

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
/**
 * Increases the number of the children assigned to the father element.
 *
 * @this {ParyOrder}
 * @param {instance} inst
 */
PartyOrder.prototype.add = function(inst) {

	this.dictInst[inst.id] = inst;
	this.dictChildLen[inst.id] = 0;
	var temp = inst.id.split(':');
	if (temp.length !== 1) {
		temp.pop();
		parentId = temp.join(':');
		dictChildLen[parentId]++;
	}
}
/**
 * updating the instance id.
 *
 * @this {ParyOrder}
 * @param {instance} inst
 */
PartyOrder.prototype.update = function(inst) {
	this.dictInst[inst.id] = inst;
}

PartyOrder.prototype.remove = function(id) {}

//End of Topological handling function
	