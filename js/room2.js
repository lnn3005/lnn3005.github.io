$(document).ready(function(){	
	$("#puzzles_body").hide().fadeIn(1000);
	initRoom();;		
	$(".puzzle_container").hover(function() {
		$("#"+this.id).css("border","3px solid #cc6600");
		addDescription(this.id);
		$("#object_description").animate({left:'0'},200);
	},
	function() {
		$("#object_description").css("left","-100%");
        $("#"+this.id).css("border","6px solid brown");
	});
});

function addDescription(id) {	
	var txt;
	switch (id) {
		case "p1":
			txt = description_p1;
			break;
		case "p2":
			txt = description_p2;
			break;
		case "p3":
			txt = description_p3;
			break;
		case "p4":
			txt = description_p4;
			break;
		case "p5":
			txt = description_p5;
			break;
		case "p6":
			txt = description_p6;
			break;
		default:
			txt = "addDescription bug detected"
			break;
	}
	$("#object_description").html(txt);
}

var description_p1 = "description";
var description_p2 = "description";
var description_p3 = "description";
var description_p4 = "description";
var description_p5 = "description";
var description_p6 = "description";

function initRoom() {
	init1();
	init2();
	init3();
	init4();
	init5();
	init6();
}

function init1() {
	var txt = "Door";
	$("#t1").append(txt);
	
	var door = "<div id='door'></div>";
	$("#a1").append(door);
}

function init2() {
	var txt = "Strange picture";
	$("#t2").append(txt);
	
	var triangle = "<div class='triangle_wrapper'>"
	for (var i=0; i<=5; i++) {
		triangle += "<div class='triangle' id='tri"+i+"'></div>";
	}
	triangle +="</div>";
	
	$("#a2").append(triangle);
	
	var triangle_display = "<br><div class='triangle_wrapper' id='display'>"
	for (var i=0; i<=5; i++) {
		triangle_display += "<div class='triangle' id='td"+i+"'></div>";
	}
	triangle_display +="</div>";
	
	$("#a2").append(triangle_display);
	hideDisplay();
}

function hideDisplay() {
	for (var i=0; i<=5; i++) {
		$("#td"+i).hide();
	}
}

var legend = new Array("N","NE","E","SE","S","SW","W","NW");

function init3() {
	var txt = "Compass";
	$("#t3").append(txt);

	var div = "<div id='compass_wrapper'>";
	
	for (var i=0; i<=7; i++) {
		div += "<div class='compass' id='c"+i+"'>" +legend[i]+ "</div>";
	}
	$("#a3").append(div);
	appendSlider();
}

function appendSlider() {
	var div = "<div id='slider_wrapper'><div id='slider'></div></div></div>";
	div += "<br><button id='toggle' onclick=slide()>Start</button>";
	$("#a3").append(div);
}

function slide() {
	var stat = $("#toggle").text();
	if (stat == "Start") {
		$("#slider").stop();
		$("#slider").css("width",'0px');
		$("#slider").animate({width: '239px'},2500);
		$("#toggle").text("Stop");
	} else if (stat == "Stop") {
		$("#slider").stop();
		$("#toggle").text("Reset") ;
		findDirection();
	} else if (stat == "Reset") {
		var width = $("#slider").css("width");
		var len = width.length;
		width = width.substring(0,len-2)/30;
		$("#c"+Math.floor(width)).css("backgroundColor","#f2eee2");
		$("#slider").animate({width: '0px'},1000);
		$("#toggle").text("Start");
	}
}

var directionSet = new Array("W","N","SE","NW","S","E");
var current = 0;

function findDirection() {
	var width = $("#slider").css("width");
	var len = width.length;
	width = width.substring(0,len-2)/30;
	$("#c"+Math.floor(width)).css("backgroundColor","white");
	if (legend[Math.floor(width)] == directionSet[current]) {
		$("#td"+current).fadeIn(500);
		current++;
		if (current==6) {
			orb1found();
		}
	} else {
		hideDisplay();
		current = 0;
	}
}

function orb1found() {
	$("#toggle").attr("onclick","");	
}



function init4() {
	var txt = "Some txt";
	$("#t4").append(txt);
}

function init5() {
	var txt = "Some txt";
	$("#t5").append(txt);
}

function init6() {
	var txt = "Some txt";
	$("#t6").append(txt);
}