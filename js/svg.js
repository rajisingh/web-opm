function init(svg){
	/*Initial actions to be done
	 * right after the svg canvas is created*/
	svg.group("sd");
}

$(document).ready(function(){
	$(".canvas").svg({onLoad: init});
});
var objId = 0
function addObject(){
	objId++;
	var svg = $(".canvas").svg("get");
	svg.group($("#sd"), "obj" + objId);
	svg.rect($("#obj"+objId), 150, 100, 110, 70, {fill: 'none', stroke: 'limeGreen', strokeWidth: '2'});
	svg.text($("#obj"+objId), 176, 142, "Object "+objId, {fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: '15'});
}