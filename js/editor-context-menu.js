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
					if (key == "Properties")
					{
					  $('#properties_modal').modal('show');
					}
				},
				items: 
				{
					
					
					"Expand": {name: "Expand"},
					"sep1": "---------",
					"In-Zoom": {name: "In-Zoom"},
					"Unfold": {name: "Unfold"},
					"Create View": {name: "Create"},
					"sep2": "---------",
					"Show all appearances": {name: "Show"},
					"Insert property": {name: "Insert"},
					"sep3": "---------",
					"Complete Links": {name: "Complete"},
					"sep4": "---------",
			
					
					"sep5": "---------",
					
					"sep6": "---------",
					"Consistency Helper": {name: "Helper"},
					"Test Scenario": {name: "Test"},
					"sep7": "---------",
					"Properties": {name: "Properties"},
					"Parameters": {name: "Parameters"}
				
				}
			});
	    
			
		})();



