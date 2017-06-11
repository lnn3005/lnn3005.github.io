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
			txt = "addDescription bug detected";
			break;
	}
	$("#object_description").html(txt);
}

var description_p1 = "A locked door. Try to find the password to open it!";
var description_p2 = "A strange device. There are 6 spheres with various color laying next to it.";
var description_p3 = "A table with some kind of board game on it. It seems that you can move the pieces around.";
var description_p4 = "A window. Serves no purpose at all. No need to spend time here.";
var description_p5 = "A touch screen with various letters on it.";
var description_p6 = "A wall. There's nothing on it right now.";

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
    
    var eclipse_clue = "when the sun is devoured by the moon, look for the centers of earth";
    
    var input = "<div class='input_wrapper'><input id='input_panel'></input><button type='button' id='button_door' onclick='checkpw()'>Enter</button> </div><br>";
	$("#a1").append(input);
    
    var door = '<br><div class="door_wrapper"><div id="door"></div></div>';
    
    $("#a1").append(door);
    appendDiv('door','eclipse_clue');
    $("#eclipse_clue").html(eclipse_clue);
}

function checkpw() {
    var pw = document.getElementById("input_panel").value;
	
	if (pw.toLowerCase() == pwd.toLowerCase()) {
		keyFound();
	}
}

function slideDoor() {
    $("#eclipse_clue").html("");
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
        $(".door_wrapper").css("padding","20px");
		$(".door_wrapper").html("You found it! The door is open! <br><span id='pts'>PRAISE THE SUN \\o/ </span>");
	};
	window.setTimeout( show_message, 1600 ); //1200 = 60*20; check slideLeft() and slideRight()
	$("#button_door").attr("onclick","");
	description_p1 = "The door is open. Good game well play!";
}

function init2() {    
    var txt = "Spheres";
    $("#t2").append(txt);
    
    
    var solar_wrapper = "<div class='solar_wrapper'></div>";
    $("#a2").append(solar_wrapper);
    
    var row_1 = "<div id='planet_row'></div>";
    var row_2 = "<div id='axis_row'></div>";
    $(".solar_wrapper").append(row_1);
    $(".solar_wrapper").append(row_2);
    
    var helper_1 = "<div class='orb_helper' id='oh_1'></div>";
    var helper_2 = "<div class='orb_helper' id='oh_2'></div>";
    var helper_3 = "<div class='orb_helper' id='oh_3'></div>";
    
    $("#axis_row").append(helper_1);
    $("#axis_row").append(helper_2);
    $("#axis_row").append(helper_3);
    
    var sun_holder = "<div class='orb' id='sun_holder'></div>";
    var moon_holder = "<div class='orb' id='moon_holder'></div>";
    var earth_holder = "<div class='orb' id='earth_holder'></div>";
    
    $("#planet_row").append(sun_holder);
    $("#planet_row").append(moon_holder);
    $("#planet_row").append(earth_holder);
    
    var sun = "<div class='orb' id='sun'></div>";
    var moon = "<div class='orb' id='moon'></div>";
    var earth = "<div class='orb' id='earth'></div>";
    var white = "<div class='orb' id='white'></div>";
    var green = "<div class='orb' id='green'></div>";
    var yellow = "<div class='orb' id='yellow'></div>";
    
    var orb_row = "<div id='orb_row'></div>";
    
    $("#a2").append(orb_row);
    $("#orb_row").append(earth);
    $("#orb_row").append(moon);
    $("#orb_row").append(sun);
    $("#orb_row").append(white);
    $("#orb_row").append(green);
    $("#orb_row").append(yellow);
    
    drawOrbs();
    enableDragAndDrop()
}

var orb_array = new Array("sun","moon","earth");
var orb_color = new Array();
var aligned;

function drawOrbs() {
    $("#sun").css("backgroundColor","red");
    $("#moon").css("backgroundColor","grey");
    $("#earth").css("backgroundColor","#33ccff");
    
    for (var i=0; i<=orb_array.length; i++) {
        orb_color.push($("#"+orb_array[i]).css("backgroundColor"));        
    }
}

function enableDragAndDrop() {
    $(".orb").attr("draggable","true");
    $(".orb").attr("ondragstart","drag(event)");
    $(".orb").attr("ondrop","drop(event)");
    $(".orb").attr("ondragover","allowDrop(event)");
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
    changeColor(og,dest);
    checkOrbPosition();
}

function changeColor(og,dest) {
    var og_color = $("#"+og).css("backgroundColor");
    var dest_color = $("#"+dest).css("backgroundColor");
    
    $("#"+og).css("backgroundColor",dest_color);
    $("#"+dest).css("backgroundColor",og_color);

}

function checkOrbPosition() {
    aligned = true;
    for (var i=0; i<= orb_array.length; i++) {
        if ($("#"+orb_array[i]+"_holder").css("backgroundColor") != orb_color[i]) {
            aligned = false;
            break;
        }
    }
    
    if (aligned == true) {
        $("#screen_wrapper").css("border","2px solid green");
        $(".letter_box").css("color","red");
        
        $(".letter_box").click(function() {
            checkR($(this).attr('id'));
        });
        
        $(".more_r").click(function() {
            checkR($(this).attr('id'));
        });
        
        $(".letter_box").mouseover(function(){
            $(this).css("backgroundColor","#ffcccc");
        });
        $(".letter_box").mouseleave(function(){
            $(this).css("backgroundColor","white");
        });
        
        $("#r_wrapper").fadeIn(1000);
    }
}

function checkR(id) {
    switch (id) {
        case "l_0_6":
            $("#r_1").html("S").fadeIn(1000);
            break;
        case "l_1_9":
            $("#r_3").html("L");
            break;
        case "l_2_5":
            $("#r_5").html("I");
            break;
        case "l_4":
            $("#r_4").html("A");
            break;
        case "l_5":
            $("#r_6").html("R");
            break;
        case "l_6":
            $("#r_7").html("E");
            break;
        case "l_7":
            $("#r_2").html("O");
            break;
        default:
            break;
    }
}

var pwd = "SOLAIRE";

var value_array = [9,8,7,6,5,4,3,2,1];
var vacantPanelId = 5;

function init3() {
    var txt = "Board game";
    $("#t3").append(txt);
    
    appendDiv("a3","go_outward");
    $("#go_outward").html("outward");
    
    var reset_button = "<button onclick='resetArrows()' id='resetArrowButton'>Reset</button><br>";
    $("#a3").append(reset_button);
    
    resetArrows();
}

function resetArrows() {
    value_array = [9,8,7,6,5,4,3,2,1];
    vacantPanelId = 5;
    
    $("#panel_wrapper").remove();
    appendDiv("a3","panel_wrapper");
    
    for (var i=0; i<=2; i++) {
        appendDiv("panel_wrapper","row_"+i);
        $("#row_"+i).attr("class","panel_row");
        
        for (var j=0; j<=2; j++) {
            var id = 3*i+j+1;
            appendDiv("row_"+i,"panel_block_"+id);
            $("#panel_block_"+id).attr("class","panel_block");
            
            var arrow_id = value_array[id-1];
            appendDiv("panel_block_"+id,"arrow_"+arrow_id);
            $("#arrow_"+arrow_id).attr("class","arrow");
            drawArrow(arrow_id);
        }
    }
    enableClickPanelBlock();
}

function drawArrow(num) {
    var id = "arrow_"+num;
    switch (num) {
        case 1:
            break;
        case 2:
            $("#"+id).css("transform","rotate(45deg)");
            $("#"+id).css("borderTop","20px solid #ff8000");
            break;
        case 3:
            $("#"+id).css("transform","rotate(90deg)");
            break;
        case 4:
            $("#"+id).css("transform","rotate(-45deg)");
            $("#"+id).css("borderTop","20px solid #ff8000");
            break;
        case 5:
            $("#"+id).css("border","0");
            break;
        case 6:
            $("#"+id).css("transform","rotate(135deg)");
            $("#"+id).css("borderTop","20px solid #ff8000");
            break;
        case 7:
            $("#"+id).css("transform","rotate(-90deg)");
            break;
        case 8:
            $("#"+id).css("transform","rotate(-135deg)");
            $("#"+id).css("borderTop","20px solid #ff8000");
            break;
        case 9:
            $("#"+id).css("transform","rotate(180deg)");
            break;
    }
}



function enableClickPanelBlock() {  
    $(".panel_block").attr("onclick","");    

    $("#panel_block_"+vacantPanelId).html("");
    
    var movable = [+vacantPanelId-3,+vacantPanelId+3];
    
    if (+vacantPanelId%3 != 0) {
        movable.push(+vacantPanelId+1);
    }
    
    if (+vacantPanelId%3 != 1) {
        movable.push(+vacantPanelId-1);
    }
    
    for (var i=0; i<movable.length; i++) {
        //alert(movable[i]);
        if (movable[i]>0 && movable[i]<10) {
            $("#panel_block_"+movable[i]).attr("onclick","moveArrow('"+movable[i]+"')");
        }
    }
}

function moveArrow(movePanelId) {
    
    $("#panel_block_"+movePanelId).html("");
    var arrowId = value_array[movePanelId-1];
    appendDiv("panel_block_"+vacantPanelId,"arrow_"+arrowId);
    $("#arrow_"+arrowId).attr("class","arrow");
    drawArrow(arrowId);
    
    swapValueArray(movePanelId-1,vacantPanelId-1);
    vacantPanelId = movePanelId;
    
    enableClickPanelBlock();
    checkArrowPosition();
}

function swapValueArray(movePanelId,vacantPanelId) {
    var temp = value_array[movePanelId];
    value_array[movePanelId] = value_array[vacantPanelId];
    value_array[vacantPanelId] = temp;
}


function checkArrowPosition() {
    var corners = 1;
    var middles = 1;
    for (var i=0; i<value_array.length; i+=2) {
        if (i+1 != value_array[i]) {
            corners = 0;
        }
    }
    
    for (var i=1; i<value_array.length; i+=2) {
        if (i+1 != value_array[i]) {
            middles = 0;
        }
    }
    
    if (corners == 1 || middles == 1) {
        description_p6 = "Some words appear on the wall!"
    }
    
    if (corners == 1) {
        $(".w_right").css("opacity","100");
    } 
    
    if (middles == 1) {
        $(".w_left").css("opacity","100");
    } 
    
    if (corners == 1 && middles == 1) {
        $("#solar_eclipse").css("opacity","100");
        $("#resetArrowButton").css("opacity","0");
        $(".panel_block").attr("onclick",""); 
        description_p3 = "It seems that the board game puzzle is completely solved.";
    }
}

function init4() {
    var txt = "Window";
    $("#t4").append(txt);
}

function init5() {
    var txt = "Screen";
    $("#t5").html(txt);
    
    //var city = "WHEREISTHECITYOFLIGHT";

    var row = ["WHAT ARE","THE CENTERS","OF EARTH?"];
    
    appendDiv("a5","screen_wrapper");
    appendDiv("screen_wrapper","clue_wrapper");
    
    for (var i=0; i<=2; i++) {
        var rowId = "a5_row_"+i;
        appendDiv("clue_wrapper",rowId);
        $("#"+rowId).attr("class","a5_row");
        
        for (var j=0; j<row[i].length; j++) {
            var letter = row[i].charAt(j);
            var boxId = "l_"+i+"_"+j;
            var box = "<div class='letter_box' id='"+boxId+"'>" + letter + "</div>";
            $("#"+rowId).append(box);
        }
    }
    
    appendDiv("a5","r_wrapper");
    
    for (var i=1; i<=7; i++) {
        var rId = "r_"+i;
        appendDiv("r_wrapper",rId);
        $("#"+rId).attr("class","r_clue");
    }
    $("#r_wrapper").hide();

}

function init6() {
    var txt = "Wall";
    $("#t6").html(txt);
    
    appendDiv("a6","msg_box");
    appendDiv("msg_box","blue_earth");
    appendDiv("msg_box","grey_moon");
    appendDiv("msg_box","red_sun");
    appendDiv("msg_box","solar_eclipse");
    
    $("#blue_earth").html("<span class='w_left'>blue</span> <span class='w_right'>ea<span class='more_r' id='l_4'>r</span>th</span>");
    $("#grey_moon").html("<span class='w_left'>g<span class='more_r' id='l_5'>r</span>ey</span> <span class='w_right'>moon</span>");
    $("#red_sun").html("<span class='w_left'><span class='more_r' id='l_6'>r</span>ed</span> <span class='w_right'>sun</span>");
    $("#solar_eclipse").html("sola<span class='more_r' id='l_7'>r</span> eclipse");
    
    //$(".w_left").css("opacity","0");
    //$(".w_right").css("opacity","0");
    //$("#solar_eclipse").css("opacity","0");
}