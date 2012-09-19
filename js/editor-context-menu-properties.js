/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    Moving between tabs in properties window
 *    change - the content and tab activity.
 *    Open another forms 
 * 
 *    Author: Yulia Sulkovsky
 * */

//**** The whole properties window
var active_now_object=document.getElementById('General');
active_now_object.setAttribute("class", "active");
updateForm(active_now_object.id);
var active_now_object_states=document.getElementById('states_general');


//when you choos a tab, by click, this tab becomes active
//update the content by updateForm function
function changeClass(object_li)
{
	object_li.setAttribute("class", "active");
	//class witch was active before the click, become disabled
	active_now_object.setAttribute("class", "disabled");
	active_now_object =object_li;
	updateForm(object_li.id);
}


function updateForm(active_id)
{

	switch (active_id)
	{
	case 'General':
		document.getElementById('General-Form').style.display = "table";
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('Misc-Form').style.display ='none';
		document.getElementById('Resources-Form').style.display ='none';
	  break;
	case 'Details':
		document.getElementById('Details-Form').style.display ='table';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('Misc-Form').style.display ='none';
		document.getElementById('Resources-Form').style.display ='none';
	  break;
	case 'States':
		document.getElementById('States-Form').style.display ='table';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('Misc-Form').style.display ='none';
		document.getElementById('Resources-Form').style.display ='none';
	  break;
	
	case 'Misc':
		document.getElementById('Misc-Form').style.display ='table';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('Resources-Form').style.display ='none';
		
	  break;
	case 'Resources':
		document.getElementById('Resources-Form').style.display ='table';
		document.getElementById('Misc-Form').style.display ='none';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		
	  break;
	}
}
//**** Properties - General window functionality  //

function Compound_activ(){//when you change 'checked' value of Compound Object, some part of form become able/desable
	var compund_checked = document.getElementById('Compound.Object').checked;
	var types_cheked = document.getElementById('Basic_types').checked;
	
	if (compund_checked == false){
		document.getElementById('Basic_types').disabled = false ;
		document.getElementById('Advanced_Types').disabled = false ;
		if (types_cheked == true ){
			document.getElementById('type_bs_select').style.display = 'inline' ;
			document.getElementById('type_bs_select').disabled = false ;
		}
		else{ // if advanced types checked
			document.getElementById('type_bs_select').style.display = 'none' ;
			document.getElementById('type_adv_select').disabled = false ;
			document.getElementById('length_adv').disabled =false ;
			
		}
	} 
	else{
		document.getElementById('Basic_types').disabled = true ;
		document.getElementById('type_bs_select').disabled = true ;
		document.getElementById('Advanced_Types').disabled = true ;	
		document.getElementById('type_adv_select').disabled = true ;
		document.getElementById('length_adv').disabled = true ;
		
	}
}

function advanced_types_active(){ //onclick radio button Advanced types, activate relevant forms
	document.getElementById('type_adv_select').disabled = false ;
	document.getElementById('length_adv').disabled = false ;
	document.getElementById('type_bs_select').style.display = 'none' ;
	document.getElementById('type_adv_select').style.display = 'inline' ;
	document.getElementById('length_adv').style.display = 'inline' ;
	document.getElementById('length_title').style.display = 'inline' ;
}

function Basic_types_active(){ //onclick radio button Advanced types, activate relevant forms
	document.getElementById('type_bs_select').style.display = 'inline' ;
	document.getElementById('type_adv_select').style.display = 'none' ;
	document.getElementById('length_adv').style.display = 'none' ;
	document.getElementById('length_title').style.display = 'none' ;
	document.getElementById('type_bs_select').disabled =false ;
}
//**** Properties - Details window : Url location //

var active_location='Local'; //this variables helps to save the last location, before any changes /it is usefull in case we make chanches and press cancel
var choosen_now_location='Local';

function CloseUrlWindowByCancel(){
	document.getElementById('Url-Form').style.display ='none';
	document.getElementById('Details-Form').style.display ='table';
	if (choosen_now_location != active_location){
		if (choosen_now_location == "url"){
			onclickLocation();
			document.getElementById('url').checked = false;
			document.getElementById('Local').checked = true;
			document.getElementById('urlInput').value='';
		}
		else{
			onclickUrl();
			document.getElementById('url').checked = true;
			document.getElementById('Local').checked = false;
			
		}
	}
	
}

function CloseUrlWindowByOk()
{
	active_location = choosen_now_location;
	document.getElementById('Url-Form').style.display ='none';
	document.getElementById('Details-Form').style.display ='table';
	
	if (document.getElementById('Local').checked==true){//if local radio checked
		
		var new_val=document.getElementById('localInput').value;
		document.getElementById('url-text').value='file:///'+new_val;
		
	}
	else {// if url radio checked
		var new_val=document.getElementById('urlInput').value;
		document.getElementById('url-text').value=new_val;
		document.getElementById('urlInput').value='';
	}
		

}
function onclickUrl(){
	document.getElementById('localInput').style.display ='none';
	document.getElementById('urlInput').style.display ='inline';
	document.getElementById('urlInput').value="http:///";
	choosen_now_location='url';

	
}
function onclickLocation(){
	document.getElementById('urlInput').style.display ='none';
	document.getElementById('localInput').style.display ='inline';
	choosen_now_location='Local';
}

function openUrlWindow(){ 
	active_location='Local'; 
	choosen_now_location='Local';
	document.getElementById('Local').checked = true;
	onclickLocation();
	document.getElementById('Url-Form').style.display = 'table';
	document.getElementById('Details-Form').style.display ='none';
}

//**** Properties - States window  //

//Add button : open a new window
function open_add_window(){
	document.getElementById('States-Form').style.display ='none';
	document.getElementById('general-properties-tabs').style.display ='none';
	document.getElementById('properties-window-button').style.display ='none';
	document.getElementById('States-Add-Form').style.display ='block';
	document.getElementById('States-Add-Form-General').style.display ='table';
	document.getElementById('States-Add-Form-Buttons').style.display ='table';
}
function close_add_window(){
	
	document.getElementById('general-properties-tabs').style.display ='block';
	document.getElementById('States-Form').style.display ='table';
	document.getElementById('properties-window-button').style.display ='block';
	document.getElementById('States-Add-Form').style.display ='none';
	document.getElementById('States-Add-Form-General').style.display ='none';
	document.getElementById('States-Add-Form-Buttons').style.display ='none';
}
//change tab activities
function changeStatesTab(object_li)
{
	object_li.setAttribute("class", "active");
	//class witch was active before the click, become disabled
	active_now_object_states.setAttribute("class", "disabled");
	active_now_object_states =object_li;
	updateForm_states(object_li.id);
}
function updateForm_states(active_id)
{

	switch (active_id)
	{
	case 'states_general':
		document.getElementById('States-Add-Form-General').style.display = "table";
		document.getElementById('States-Add-Form-Preferences').style.display = "none";
		
	  break;
	case 'states_preferences':
		document.getElementById('States-Add-Form-Preferences').style.display = "table";
		document.getElementById('States-Add-Form-General').style.display ='none';
		
	  break;
	case 'states_misc':
		//document.getElementById('Misc-Form').style.display ='table';
		//document.getElementById('States-Form').style.display ='none';
		document.getElementById('States-Add-Form-General').style.display ='none';
		document.getElementById('States-Add-Form-Preferences').style.display = "none";
	
	  break;
	}
}
