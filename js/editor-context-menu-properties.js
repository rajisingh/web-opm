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


//when you choos a tab, by click, this tab becomes active
//update the content by updateForm function
function changeClass(object_li)
{
	object_li.setAttribute("class", "active");
	//class witch was active before the click, become disabled
	active_now_object.setAttribute("class", "disabled");
	active_now_object =object_li;
	//var information_value=document.getElementById('modal-body');
	//information_value.innerHTML = 'fgf';
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
	  break;
	case 'Details':
		document.getElementById('Details-Form').style.display ='table';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('Misc-Form').style.display ='none';
	  break;
	case 'States':
		document.getElementById('States-Form').style.display ='table';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		document.getElementById('Misc-Form').style.display ='none';
	  break;
	
	case 'Misc':
		document.getElementById('Misc-Form').style.display ='table';
		document.getElementById('States-Form').style.display ='none';
		document.getElementById('General-Form').style.display ='none';
		document.getElementById('Details-Form').style.display ='none';
		document.getElementById('Url-Form').style.display ='none';
		
	  break;
	}
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


