/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of util functions for work w/ SVG canvas
 * 
 * Author: Sergey N. Bolshchikov  
 * */

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function cursorChange(evt) {
	var element = evt.target;
	switch (element.nodeName) {
		case 'rect':
			element.setAttributeNS(null, 'style', 'cursor: move');
			break;
		case 'image':
			element.setAttributeNS(null, 'style', 'cursor: se-resize');
			break;
		case 'text':
			element.setAttributeNS(null, 'style', 'cursor: pointer');
			break;
	}
}