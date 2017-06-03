$(document).ready(function(){	
	$("#puzzles_body").hide().fadeIn(1000);
	initRoom();;	
	
	$(".puzzle_container").hover(function() {
		$("#"+this.id).css("border","3px solid #cc6600");
		addDescription(this.id);
		$("#object_description").animate({left:'0'},100);
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

var description_p1 = "A locked door. Try to find the password to open it!";
var description_p2 = "A strange picture is hanged on the wall. There is a line of symbols on the upper half of the picture.";
var description_p3 = "A strange device that has some letters on it.";
var description_p4 = "A balance. There a 8 weights under it.";
var description_p5 = "A light board. Nine small light bulbs on it; some green and some red. Try to make them have the same color!";
var description_p6 = "A wall. Nothing seems special about it.";

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
    
    var input = "<div class='input_wrapper'><input id='input_panel'></input><button type='button' id='button_door' onclick='checkpw()'>Enter</button> </div><br>";
	$("#a1").append(input);
    
    var door = '<br><div class="door_wrapper"><div id="door"></div></div>';
    
    $("#a1").append(door);

}

function checkpw() {
    var pw = document.getElementById("input_panel").value;
	
	if (pw.toLowerCase() == pwd.toLowerCase()) {
		keyFound();
	} else {
        alert("wrong");
		//document.getElementById("door_status").innerHTML = 'The door is shut tight.';
		//document.getElementById("door_status").innerHTML ="";
		//$("#door_status").append('The door is shut tight.').hide().fadeIn(100);
	}
}

function slideDoor() {
	var elem = document.getElementById("door");   
	var width = 150;
	var id = setInterval(frame, 10);
	function frame() {
		if (width == 0) {
			clearInterval(id);
		} else {
			width--;
			elem.style.width = width + 'px';  
		}
	}
}

function keyFound() {
	slideDoor();
	function show_message(){
        $(".door_wrapper").css("padding","20px")
		$(".door_wrapper").html("You found it! The door is open!");
	};
	window.setTimeout( show_message, 1600 ); //1200 = 60*20; check slideLeft() and slideRight()
	$("#button_door").attr("onclick","");
	description_p1 = "The door is open. Good game well play!";
}

function init2() {
	var txt = "Strange picture";
	$("#t2").append(txt);
	
    var picture_wrapper = "<div class='picture_wrapper'>";
	picture_wrapper += "<div class='triangle_wrapper'>"
	for (var i=0; i<=5; i++) {
		picture_wrapper += "<div class='triangle' id='tri"+i+"'></div>";
	}
    
	picture_wrapper +="</div>";	
	picture_wrapper += "<br><div class='triangle_wrapper' id='display'>";
    
	for (var i=0; i<=5; i++) {
		picture_wrapper += "<div class='triangle' id='td"+i+"'></div>";
	}
	picture_wrapper +="</div>";
	
	$("#a2").append(picture_wrapper);
	hideDisplay();
}

function hideDisplay() {
	for (var i=0; i<=5; i++) {
		$("#td"+i).hide();
	}
}

var legend = new Array("N","NE","E","SE","S","SW","W","NW"); //NEWS

function init3() {
	var txt = "Strange Device";
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
		$("#slider").animate({width: '239px'},4000);
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
    $("#cr1").css("opacity","100");
    description_p2 = "A second line of symbols, identical to the first, appears below it.";
}

function init4() {
	var txt = "Balance";
	$("#t4").append(txt);
    
    
    var balance = "<div class='balance_wrapper'></div><br>";
    $("#a4").append(balance);
    
    for (var i=0; i<=5; i++) {
        var class_row = (i==2 || i==5) ? "weight_row" : "support_row";
        var row = "<div class = '"+class_row+"' id = 'balance_row_" +i+ "'></div> ";
        $(".balance_wrapper").append(row);
    }
    
    var weight_selection_wrapper = "<div class ='weight_selection_wrapper'></div>";
    $("#a4").append(weight_selection_wrapper);
    
    var rows = "<div class='weight_selection_row' id='wsr1'></div><div class='weight_selection_row' id='wsr2'></div>";
    $(".weight_selection_wrapper").append(rows);
    
    for (var i=2; i<=9; i++) {
        var row = (i<6) ? 'wsr1':'wsr2';
        var weight = "<div class='weight' id='we_"+i+"'>"+i+"</div>";
        $("#"+row).append(weight);
        $("#we_"+i).css('margin','5px');
    }
    
    addBlock();
    enableDragAndDrop();
}

function enableDragAndDrop() {
    $(".weight").attr("draggable","true");
    $(".weight").attr("ondragstart","drag(event)");
    $(".weight").attr("ondrop","drop(event)");
    $(".weight").attr("ondragover","allowDrop(event)");
    
    $("#w_2").attr("ondragover","");
    $("#w_2").attr("draggable","false");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);   
}

function drop(ev) {
    ev.preventDefault();
	var og = ev.dataTransfer.getData("text");
    var dest = ev.target.id;
	changeWeightPosition(og,dest);
    checkBalance();
}

function changeWeightPosition(og,dest) {
    var num1 = $("#"+og).html();
    var num2 = $("#"+dest).html();
    
    $("#"+og).html(num2);
    $("#"+dest).html(num1);
}

function checkBalance() {
    if (2*$("#w_3").html() == +$("#w_4").html() && +$("#w_4").html() != 0) {
        $("#w_2").attr("ondragover","allowDrop(event)");
        $("#w_2").attr("draggable","true");
        $("#w_2").css("border","1px solid green");
        
        if (2*$("#w_1").html() ==  +$("#w_2").html() + +$("#w_3").html() + +$("#w_4").html() && +$("#w_1").html() != 0) {
            $("#cr3").css("opacity","100");
            $(".weight").attr("ondragover","");
            $(".weight").attr("draggable","false");
            description_p4 = "Balance achieved. There's no reason to fiddle with the weights anymore."
        }
    }
    
    /*
    if (2*$("#w_1").html() ==  +$("#w_2").html() + 2*$("#w_3").html() + +$("#w_4").html()) {
        $("#cr3").css("opacity","100");
    }*/
}

/*
function checkBalanceLower() {
    if (2*$("#w_3").html() == +$("#w_4").html()) {
        $("#w_2").attr("ondragover","allowDrop(event)");
        $("#w_2").attr("draggable","true");
        $("#w_2").css("border","1px solid green");
    }
}*/

function addBlock() {
    addBlockRow0();
    addBlockRow1();
    addBlockRow3();
    addBlockRow4();
    addWeight1();
    addWeight2();
    addWeight3();
    addWeight4();
}

function addBlockRow0() {
    var block = "<div class='block' id='b_0'></div>";
    $("#balance_row_0").append(block);
}

function addBlockRow1() {
    var block = "<div class='block' id='b_1'></div>";
    $("#balance_row_1").append(block);
}

function addBlockRow3() {
    var block = "<div class='block' id='b_3'></div>";
    $("#balance_row_3").append(block);
}

function addBlockRow4() {
    var block = "<div class='block' id='b_4'></div>";
    $("#balance_row_4").append(block);
}

function addWeight1() {
    var weight = "<div class='weight' id='w_1'></div>";
    $("#balance_row_2").append(weight);
}

function addWeight2() {
    var weight = "<div class='weight' id='w_2'></div>";
    $("#balance_row_2").append(weight);
}

function addWeight3() {
    var weight = "<div class='weight' id='w_3'></div>";
    $("#balance_row_5").append(weight);
}

function addWeight4() {
    var weight = "<div class='weight' id='w_4'></div>";
    $("#balance_row_5").append(weight);
}

function init5() {
	var txt = "Light board";
	$("#t5").append(txt);

    var square_wrapper = "<br><br><div class='square_wrapper'>";
    var id = 0;
    for (var i=1; i<=5; i++) {
        if (i%2 == 1) {
            square_wrapper += "<div class='row_odd' id='row_" +i+"'>";
        } else {
            square_wrapper += "<div class='row_even' id='row_" +i+"'>";
        }

        for (var j=1 ; j<=5; j++) {
            if (j%2 == 1) {
                if (i%2 == 1) {
                    id++;
                    square_wrapper += "<div class='light_square' id='square_" +id+"' onclick='changeColor("+id+")'></div>"; 
                } else {
                    square_wrapper += "<div class='connector_vertical' id='square_" +i+"_"+j+"'></div>"; 
                }
            } else {
                if (i%2 == 1) {
                    square_wrapper += "<div class='connector_horizontal' id='square_" +i+"_"+j+"'></div>"; 
                } else {
                    square_wrapper += "<div class='big_square' id='square_" +i+"_"+j+"'></div>"; 
                }                 
            }
        }        
        square_wrapper+="</div>";
    }
    square_wrapper+="</div><br>";
    
    $("#a5").append(square_wrapper);
    
    paintSquare();
    
}

function paintSquare() {
    for (var id=1; id<=9; id++) {
        if (id%2 == 1) {
            $("#square_" + id).css("background-color","green");
        } else {
            $("#square_" + id).css("background-color","red");
        }
    }
}

function changeColor(id) {
    switch (id) {
        case 1:
            changeColorHelper(1);
            changeColorHelper(2);
            changeColorHelper(4);
            break;
        case 2:
            changeColorHelper(2);
            changeColorHelper(1);
            changeColorHelper(3);
            changeColorHelper(5);
            break;
        case 3:
            changeColorHelper(3);
            changeColorHelper(2);
            changeColorHelper(6);
            break;
        case 4:
            changeColorHelper(4);
            changeColorHelper(1);
            changeColorHelper(5);
            changeColorHelper(7);
            break;
        case 5:
            changeColorHelper(5);
            changeColorHelper(2);
            changeColorHelper(4);
            changeColorHelper(6);
            changeColorHelper(8);
            break;
        case 6:
            changeColorHelper(6);
            changeColorHelper(3);
            changeColorHelper(5);
            changeColorHelper(9);
            break;
        case 7:
            changeColorHelper(7);
            changeColorHelper(4);
            changeColorHelper(8);
            break;
        case 8:
            changeColorHelper(8);
            changeColorHelper(7);
            changeColorHelper(5);
            changeColorHelper(9);            
            break;
        case 9:
            changeColorHelper(9);
            changeColorHelper(6);
            changeColorHelper(8);
            break;
    }
    
    checkLightBoard();
}

function changeColorHelper(id) {
    if ($("#square_"+id).css("background-color") == "rgb(255, 0, 0)") {
        $("#square_"+id).css("background-color","green");
    } else {
        $("#square_"+id).css("background-color","red");
    }
}

var red_global = 0;
var green_global = 0;

function checkLightBoard() {
    var green = 1;
    var red = 1;
    
    for (var id=1; id<=9; id++) {
        if ($("#square_"+id).css("background-color") == "rgb(255, 0, 0)") {
            green = 0;
        }
    }
    
    for (var id=1; id<=9; id++) {
        if ($("#square_"+id).css("background-color") == "rgb(0, 128, 0)") {
            red = 0;
        }
    }

    if (green == 1) {
        $("#cr2").css("opacity","100");
        green_global = 1;
    }
    
    if (red == 1) {
        $("#cr4").css("opacity","100");
        red_global = 1;
    }
    
    if (green_global==1 && red_global==1) {
        description_p5 = "All the light bulbs are off. It seems they have done their duties.";
        function toGrey() {
            $(".light_square").css("background-color","grey");
            $(".light_square").attr("onclick","");
        };
        window.setTimeout(toGrey,2000);
    }
}

function init6() {
	var txt = "Wall";
	$("#t6").append(txt);
    
    //var what_wrapper = "<div class='what_wrapper'><p>what is news</p></div>";
    //$("#a6").append(what_wrapper);
    
    var clue_wrapper = "<div class='clue_wrapper'></div> ";
    $("#a6").append(clue_wrapper);
    
    var clue_row_1 = "<div class='clue_row' id='cr1'></div>";
    var clue = "From bottom-left: N->N->SE->SE->N->N";
    $("#a6").append(clue_row_1);
    $("#cr1").html(clue);
    
    var clue_row_2 = "<div class='clue_row' id='cr2'></div>";
    var clue = "From top-right: W->W->S->E->W->S->E->E ";
    $("#a6").append(clue_row_2);
    $("#cr2").html(clue);
    
    var clue_row_3 = "<div class='clue_row' id='cr3'></div>";
    var clue = "From middle-right: N->W->W->S->S";
    $("#a6").append(clue_row_3);
    $("#cr3").html(clue);
    
    var clue_row_4 = "<div class='clue_row' id='cr4'></div>";
    var clue = "From top-left: E->E->S->S->W->W->N->N";
    $("#a6").append(clue_row_4);
    $("#cr4").html(clue);
    
}

var pwd = "NERO";