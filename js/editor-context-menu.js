/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for GUI
 * 
 * 
 * */

//add contect menu for every object with class name -" context-menu-one"
$(function()
		{
	
	 	   $.contextMenu(
		   {
	    	    selector: '.context-menu-one', 
	            callback: function(key, options) 
				{
					var m = "clicked: " + key;
					alert(m); 
				},
				items: 
				{
					
					"Properties": {name: "Proprties", icon: "properties"},
					"cut": {name: "Cut", icon: "cut"},
					"copy": {name: "Copy", icon: "copy"},
					"sep1": "---------",
					"paste": {name: "Paste", icon: "paste"}
					//"delete": {name: "Delete", icon: "delete"},
					
					//"quit": {name: "Quit", icon: "quit"}
				
				}
			});
	    
			$('.context-menu-one').on('click', function(e){
				console.log('clicked', this);
			})
		})();