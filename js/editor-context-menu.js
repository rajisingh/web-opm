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
					  $('#example').modal('show');
					}
				},
				items: 
				{
					
					
					"Expand": {name: "Expand"},
					"In-Zoom": {name: "In-Zoom"},
					"sep1": "---------",
					"Unfold": {name: "Unfold"},
					"Create": {name: "Create"},
					"Show": {name: "Show"},
					"Copy": {name: "Copy"},
					"Cut": {name: "Cut"},
					"Properties": {name: "Proprties"}
				
				}
			});
	    
			$('.context-menu-one').on('click', function(e){
			    
				console.log('clicked', this);
			})
		})();
