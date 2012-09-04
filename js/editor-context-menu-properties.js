/*   
 *    Web OPM: online case tool for Object-Process Methodology
 *    Copyright 2012 Israel Institute of Technology - Technion
 *    The code is licensed under GNU General Public License, v2
 * 
 *    File context description:
 *    Moving between tabs in properties window
 *    change - the content and tab activity.
 * 
 *    Author: Yulia Sulkovsky
 * */		

//when you choos a tab, by click, this tab becomes active
var active_now_id=document.getElementById('General');
active_now_id.setAttribute("class", "active");

function changeClass(object_li){
	
	object_li.setAttribute("class", "active");
	//class witch was active before the click, become disabled
	active_now_id.setAttribute("class", "disabled");
	active_now_id =object_li;
	//var information_value=document.getElementById('modal-body');
	//information_value.innerHTML = 'fgf';
	updateForm(object_li.id);

}

//using ajax
//upload a new content, the proper form to the tab you choose
function updateForm(active_id){

	switch (active_id)
	{
	case 'General':
		http.open('GET','Forms/properties-form-genelal.html',true);
		http.onreadystatechange = updateNewContent;
		http.send(null);
		return false;
	  break;
	case 'Details':
		http.open('GET','Forms/properties-form-details.html',true);
		http.onreadystatechange = updateNewContent;
		http.send(null);
		return false;
	  break;
	}
}
function updateNewContent(){
	if(http.readyState == 4 ){
		document.getElementById('modal-body').innerHTML = http.responseText;
	}
}

