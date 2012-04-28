/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 *  Author: Rochai Ben-Mordechai & Sameer Makladeh
 * */
<script>

function OPMModel( modelIDVal , creatorIDVal ) {
  if ( ( typeof modelIDVal !== int ) && ( typeof creatorIDVal !== int ) ){
    throw "invalid input type. check modelIDVal and creatorIDVal";
  }
  
  var modelID;
  var name;
  var type;
  var creatorID;
  var participants;
  var sd;
  var lastUpdateDate;
  var creationDate;
  
  this.modelID = modelIDVal;
  this.creatorID = creatorIDVal;

  function getID(){
    return this.modelID;
  }
	
  function share( participants[] ){
    if ( participants === null ){
      participants = new Array();
    }
    this.participants.push(participants[]);
    return;
  }
  
  function getParticipantList(){
    if ( this.participants === null ){
      return "no participating users";
    }
    return this.participatns;
  }
  
  function unShare( p ){
    var x = participants.indexOf( p );
    if ( x === -1 ){
      throw "cannot find collaborator ID. please try again.";
    }
      var temp = participants[ ( participants.length() ) - 1 ];
      participants[ ( participants.length() ) - 1 ] = participants [ x ];
      participants[ x ] = temp;
      var garbage = participants.pop();
  }
	
  function getName(){
	  
  }
	
  function setName( name ){
	  
  }
	
  function getType(){
	  
  }
	
  function setType( type ){
	  
  }
	
  function destructor(){
    //need procedure for deleting Model from database, including all children.
    try {
      if (anything_wrong === true){
      throw "unable to delete model, please try again";
      }
    }
  }
}

function OPMDiagram() {}
function OPMElement() {}
function OPMEntity() {}
function OPMThing(){}
function OPMObject() {}
function OPMProcess() {}
function OPMLink() {}
function OPMProcedural_Link() {}
function OPMStructural_Link() {}

</script>