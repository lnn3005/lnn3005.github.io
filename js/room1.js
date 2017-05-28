$(document).ready(function(){	
	initializeRoom();	
});


var numBlocks = 6; 
var pwd = "GGWP";
		
function initializeRoom() {		
	drawp1();
	drawp2();
	drawp3();
	drawp4();
	drawp5();
	drawp6();
}

function drawp1() {
	var text1 = "A locked door. There is a panel near the handle. It seems that it is used to enter a password. Find a way to open this door!";
	$("#t1").append(text1).hide().fadeIn(1000);
	append1();
}

function append1() {
	var div0 = '<div id="panel">';
	div0 += '<input id="panel_input" placeholder="Enter password"><button type="button" onclick="checkPW()">Enter</button></div>';
	div0 += '<br><div id="door"><div id="door_left"><p id="clue_left"></p> </div><div id="door_right"><p id="clue_right"></p> </div></div>';
	div0 += '<div id="door_status"></div>';
	
	$("#a1").append(div0).hide().fadeIn(1000);
	var winMessage = '<p id="winMessage"> The door is open. You won!<br> ';
	winMessage += '<a href="../index.htm">Back to home page.</a></p>';
	
	$("#door").append(winMessage);
	$("#winMessage").hide();
	
}

function checkPW() {
	var pw = document.getElementById("panel_input").value;
	
	if (pw == pwd) {
		keyFound();
	} else {
		//document.getElementById("door_status").innerHTML = 'The door is shut tight.';
		document.getElementById("door_status").innerHTML ="";
		$("#door_status").append('The door is shut tight.').hide().fadeIn(100);
	}	
}

function keyFound() {
	$("#door_status").hide();
	$("#clue_left").hide();
	$("#clue_right").hide();
	slideLeft();
	slideRight();
	function show_message(){
		$("#winMessage").fadeIn();
	};
	window.setTimeout( show_message, 1200 ); //1200 = 60*20; check slideLeft() and slideRight()
}

function slideLeft() {
	var elem = document.getElementById("door_left");   
	var width = 60;
	var id = setInterval(frame, 20);
	function frame() {
		if (width == 0) {
			clearInterval(id);
		} else {
			width--;
			elem.style.width = width + 'px';  
		}
	}
}

function slideRight() {
	var elem = document.getElementById("door_right");   
	var width = 60;
	var id = setInterval(frame, 20);
	function frame() {
		if (width == 0) {
			clearInterval(id);
		} else {
			width--;
			elem.style.width = width + 'px';  
		}
	}
}


/*****Initialize puzzle 2 and 3 - Rooster and clock*****/
function drawp2() {
	var text2 = "A statue of a rooster. Its mouth is wide open as if trying to say something.";
	$("#t2").append(text2).hide().fadeIn(1000);
	
	append2();
}

function append2() {
	var div0 = '<div id="paper"></div>';
	div0 += '<div id="rooster_clue"></div>';
	div0 += '<div id="rooster_status"></div>';
	div0 += '<div id="tablet_screen"></div>';

	
	$("#a2").append(div0).hide().fadeIn(200);
}

var firstCard = 0;

function checkTime() {
	var hour = document.getElementById("hour").value;
	var minute = document.getElementById("minute").value;
	
	if (hour<0 || hour>23 || minute<0 || minute>59) {
		document.getElementById("check_time").innerHTML = "";
		var txt = "Are you trying to be cheeky?";
		$("#check_time").append(txt).hide().fadeIn(1000);
	} else if ((hour == 11 || hour == 23) && minute == 59 && firstCard == 1) {
		$("#rooster_clue").hide();
		document.getElementById("check_time").innerHTML = "";
		var first = "The rooster crows. It also spits out a tablet!";
		var second = "A keyboard can be seen on the tablet:<br>" + iterateAlphabet();
		//document.getElementById("rooster_status").innerHTML = first+"<br>"+second;
		var txt = first+"<br>"+second;
		document.getElementById("rooster_status").innerHTML = "";
		$("#rooster_status").append(txt).hide().fadeIn(500);
		document.getElementById("clock").innerHTML = hour+":"+minute;
	} else {
		document.getElementById("check_time").innerHTML = "";
		var txt = "Nothing happened.";
		$("#check_time").append(txt).hide().fadeIn(1000);
		document.getElementById("clock").innerHTML = hour+":"+minute;
	}
}

function displayRoosterClue() {
	//document.getElementById("rooster_clue").innerHTML
	var txt = "The rooster spits out a card. It says:<br>The rooster crows just before midnight.";
	$("#rooster_clue").append(txt).hide().fadeIn(500);
	firstCard = 1;
}

function iterateAlphabet(){
	var string ="";
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(var i=0; i<str.length; i++) {
	    var nextChar = str.charAt(i);
		string+="<button onclick=displayNumber('"+nextChar+"')>"+nextChar+"</button>"; 
		if (i%9==8) {
			string+="<br>";
		}
	}
	return string+"<br>";
}
function displayNumber(letter) {
	var number = 0;
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	for(var i=1; i<=str.length; i++) {
		var nextChar = str.charAt(i-1);
		if (letter== nextChar) {
			number = i;
			break;
		}
	}
	
	if (number<10) {
		number = "0" + number;
	}
	
	//document.getElementById("tablet_screen").innerHTML = "A number is displayed: " + number;
	document.getElementById("tablet_screen").innerHTML ="";
	$("#tablet_screen").append(number).hide().fadeIn(100);
}

function drawp3() {
	var text3 = "A clock on the wall. The hour and minute display can be changed freely.";
	$("#t3").append(text3).hide().fadeIn(1000);
	
	append3();
	initializeClock();
	
}

function append3() {
	var div_clock = '<div id="clock"></div><br>';
	var div_clock_panel = '<div id="clock_panel">'
	div_clock_panel += '<input id="hour" type="number" placeholder="hr" min="0" max="23"><input id="minute" type="number" placeholder="min" min="0" max = "59">'
	div_clock_panel += '<button type="button" onclick="checkTime()">Change to this time</button></div>';
	div_clock_panel += "<div id='check_time'></div>";
	
	$("#a3").append(div_clock).hide().fadeIn(500);
	$("#a3").append(div_clock_panel).hide().fadeIn(500);
}

function initializeClock() {
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
	if (m<10) {
		m = "0"+m;
	}
	document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(function(){ initializeClock() }, 10000);
}




/*****Initialize puzzle 4 and 5 - Water cups*****/

var numCups = 3;
var cupHeight = new Array(80,50,30);
var cup = new Array({height:cupHeight[0],level:0},{height:cupHeight[1],level:0},{height:cupHeight[2],level:0});

function append4() {	

	var div0 = '<div class="container">';
	div0 += '<div class="cup" id="cup0" draggable = "true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">';
	div0 += '<div class="water" id="water0"> </div></div></div>';
	
	var div1 = '<div class="container">';
	div1 += '<div class="cup" id="cup1" draggable = "true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">';
	div1 += '<div class="water" id="water1"> </div></div></div>';
	
	var div2 = '<div class="container">';
	div2 += '<div class="cup" id="cup2" draggable = "true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">';
	div2 += '<div class="water" id="water2"> </div></div></div>';
	
	
	$("#a4").append(div0).hide().fadeIn(500);
	$("#a4").append(div1).hide().fadeIn(500);
	$("#a4").append(div2).hide().fadeIn(500);
}

function reset4() {
	var initialLevel = new Array(80,0,0);
	var i;
	for (i=0; i<numCups; i++) {
		cup[i].level = initialLevel[i];
		drawCup(i);
		setInitialWater(i);
	}
}

function drawCup(index) {
	var cupName = "cup"+index;
	document.getElementById(cupName).style.height = cup[index].height+"px";
	document.getElementById(cupName).style.top = 100 - cup[index].height+"px";
}

function setInitialWater(index) {
	var water = "water"+index;
	document.getElementById(water).style.top = cup[index].height-cup[index].level+"px";
	document.getElementById(water).style.height = cup[index].level + "px";
	document.getElementById(water).style.backgroundColor = "blue";
}

function setWater(index,amount,stat) {
	var water = "water"+index;
	//document.getElementById(water).style.top = cup[index].height-cup[index].level+"px";
	//document.getElementById(water).style.height = cup[index].level + "px";
	document.getElementById(water).style.backgroundColor = "blue";
	
	var elem = document.getElementById(water);   
	var water_height; //original water level
	var id = setInterval(frame, 10);
	if (stat == "up") {
		water_height = cup[index].level-amount;
	} else if (stat == "down") {
		water_height = cup[index].level+amount;
	}
	var water_top =  cup[index].height - water_height; //original water top
	function frame() {
		if (water_height == cup[index].level) {
			clearInterval(id);
		} else {
			if (stat == "up") {
				water_height++;
				water_top--;
			} else if (stat == "down" ) {
				water_height--;
				water_top++;
			}
			elem.style.height = water_height + 'px';  
			elem.style.top = water_top + 'px';  
		}
	}
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
	pourWater(og,dest);
}

function dropOnScale(ev) {
	ev.preventDefault();
	var og = ev.dataTransfer.getData("text");
	var index = og[og.length-1];
	document.getElementById("weight_panel").innerHTML = "";
	$("#weight_panel").append(cup[index].level/10).hide().fadeIn(100);
	checkWeight(cup[index].level/10);
}

function pourWater(og,dest) {
	var id_from = og[og.length-1];
	var id_to = dest[dest.length-1];
	
	var amount = Math.min(cup[id_from].level,cup[id_to].height-cup[id_to].level);
	
	cup[id_from].level -= amount;
	cup[id_to].level += amount;

	setWater(id_from,amount,"down");
	setWater(id_to,amount,"up");
}

function drawp4() {
	var text4 = "A counter. There are three cups on it; one is empty and two contain some water. Drag to pour water from a cup to another.";
	$("#t4").append(text4).hide().fadeIn(1000); 
	append4();
	reset4();
}

function checkWeight(num){
	if (num == 4) {
		var clue_left = '<br> July 7';
		var clue_right = '<br> 23:16';
		$("#clue_left").append(clue_left).hide().fadeIn(2000);
		$("#clue_right").append(clue_right).hide().fadeIn(2000);
	}
}



function drawp5() {
	var text5 = "A scale. The number 4 is sloppily stuck on top. It seems like it can measure the weight of the water cups. Drag a cup to the scale to weigh it.";
	$("#t5").append(text5).hide().fadeIn(1000); 
	
	append5();
}

function append5() {
	var div0 = '<div id="scale" ondrop="dropOnScale(event)" ondragover="allowDrop(event)">';
	div0 += '<div id="weight_panel"> 0 </div>';
	div0 += '<div id="clue_4" > 4 </div></div>';
	
	$("#a5").append(div0).hide().fadeIn(1000); 

}




/*****Initialize puzzle 6 - Stones game*****/
var num_stones = 0;
var num_stones_allowed = 0;
var remain;

function setParameter() {
	num_stones_allowed = Math.floor((Math.random() * 4) + 3);
	num_stones = Math.floor((Math.random() * 10) + 15);
	while (num_stones % (num_stones_allowed+1) == 0) {
		num_stones = Math.floor((Math.random() * 10) + 15);
	}
}


function append6() {
	var div_stones_remained = "<div id='stones_remained'></div>";
	var select_stones_picked = '<select id="stones_picked"></select>';
	var button_pick = '<button id="pick" onclick="pickStones()">Pick up</button>';
	var button_reset_stones = '<button id="reset_stones" onclick="reset6()">Reset</button>';
	var div_bot_moves = '<div id="bot_move"></div>';
	var div_stones_result = '<div id="stones_result"></div>';
	
	
	$("#a6").append(select_stones_picked).hide().fadeIn(500);
	$("#a6").append(button_pick).hide().fadeIn(500);
	$("#a6").append(button_reset_stones).hide().fadeIn(500);
	$("#a6").append(div_bot_moves).hide().fadeIn(500);
	$("#a6").append(div_stones_remained).hide().fadeIn(500);
	$("#a6").append(div_stones_result).hide().fadeIn(500);
}


function drawp6() {
	append6();
	reset6();

}

function reset6() {
	setParameter();
	remain = num_stones;
	var description = "A table. There are <b>" + num_stones + "</b> stones on it. A robot sits across the table."
	var rule = "Each turn you and The bot can pick between <b>1</b> and <b>"+num_stones_allowed+"</b> stones. Whoever picks the last stone wins. You can go first. Try to win against The bot!"
	var txt = description + " " + rule;
	document.getElementById("t6").innerHTML = "";
	$("#t6").append(txt).hide().fadeIn(1000);
	
	displayStones();
	document.getElementById("bot_move").innerHTML = "" ;
	document.getElementById("stones_result").innerHTML = "" ;
	document.getElementById("pick").style.display = "" ;
}

function displayStones() {
	var optiontxt ="";
	var i;
	
	for ( i=1; i<=Math.min(remain,num_stones_allowed); i++) {
		optiontxt = optiontxt + "<option value= '" + i + "'>" + i + "</option>";
	}
	
	document.getElementById("stones_picked").innerHTML = "";
	$("#stones_picked").append(optiontxt).hide().fadeIn(1000);
	
	var txt = "Stones remained: <b>" + remain+"</b>";
	document.getElementById("stones_remained").innerHTML = "";
	$("#stones_remained").append(txt).hide().fadeIn(500);
}


function pickStones() {
	var pick = document.getElementById("stones_picked").value;
	remain -= pick;
	var txt = "Stones remained: <b>" + remain+"</b>";
	document.getElementById("stones_remained").innerHTML = "";
	$("#stones_remained").append(txt).hide().fadeIn(500);
	
	if (remain == 0) {
		document.getElementById("stones_result").innerHTML = "";
		$("#stones_result").append("You won! The bot looks sad. Also, a sound can be heard from the rooster statue.").hide().delay(500).fadeIn(1000);
		$("#pick").hide();
		$("#stones_picked").hide();
		$("#reset_stones").hide();
		$("#bot_move").hide();
		displayRoosterClue();
		return;
	}
	
	var mypick;
	
	if (remain % (num_stones_allowed+1) == 0) {
		mypick = Math.floor((Math.random() * num_stones_allowed) + 1);
	} else {
		mypick = remain % (num_stones_allowed+1);
	}
	
	remain -= mypick;
	
	document.getElementById("bot_move").innerHTML = "";
	var txt1 = "The bot picked up <b>"+mypick+"</b> stone";
	if (mypick>1) {
		txt1 += "s";
	}
	$("#bot_move").append(txt1).hide().fadeIn(500);
	var txt = "Stones remained: <b>" + remain+"</b>";
	document.getElementById("stones_remained").innerHTML = "";
	$("#stones_remained").append(txt).hide().fadeIn(500);
	
	if (remain == 0) {
		document.getElementById("stones_result").innerHTML = "";
		$("#stones_result").append("You lost! The bot laughs at your face.").hide().delay(500).fadeIn(1000);
		$("#pick").hide();
		$("#stones_picked").hide();
		$("#reset_stones").hide().fadeIn(2000);
	} else if (remain < num_stones_allowed) {
		displayStones();
	}
}
