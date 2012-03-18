$(document).ready(function(){
	$(".canvas").svg();
	
});

function addObject(){
	var svg = $(".canvas").svg("get");
	svg.rect(150, 100, 110, 70, {fill: 'none', stroke: 'limeGreen', strokeWidth: '2'});
}