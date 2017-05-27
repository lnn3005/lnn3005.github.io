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
	document.getElementById("t1").innerHTML = text1;
	
	append1();
}

function append1() {
	var div0 = '<div id="panel">';
	div0 += '<input id="panel_input" placeholder="Enter password"><button type="button" onclick="checkPW()">Enter</button></div>';
	div0 += '<br><div id="door"><div id="open"> <br>Yes this is a door</div><div id="clue_1"></div></div>';
	div0 += '<div id="door_status"></div>';
	
	$("#a1").append(div0);

}

function checkPW() {
	var pw = document.getElementById("panel_input").value;
	
	if (pw == pwd) {
		keyFound();
	} else {
		document.getElementById("door_status").innerHTML = 'The door is shut tight.';
	}	
}

function keyFound() {
	document.getElementById("door_status").innerHTML = "The door is opened! You won! ";
	document.getElementById("clue_1").innerHTML = "The door is opening so slowly that you can't see it.";
	var toHomePage = '<a href="../index.htm">Click here to go back to home page.</a>';
	
	$("#door_status").append(toHomePage);
}


/*****Initialize puzzle 2 and 3 - Rooster and clock*****/
function drawp2() {
	var text2 = "A statue of a rooster. Its mouth is wide open as if trying to say something.";
	document.getElementById("t2").innerHTML = text2;
	
	append2();
}

function append2() {
	var div0 = '<div id="paper"></div>';
	div0 += '<div id="rooster_clue"></div>';
	div0 += '<div id="rooster_status"></div>';
	div0 += '<div id="tablet_screen"></div>';

	
	$("#a2").append(div0);
}

var firstCard = 0;

function checkTime() {
	var hour = document.getElementById("hour").value;
	var minute = document.getElementById("minute").value;
	
	
	if ((hour == 11 || hour == 23) && minute == 59 && firstCard == 1) {
		var first = "The rooster crows. It also spits out a tablet!";
		var second = "A keyboard can be seen on the tablet:<br>" + iterateAlphabet();
		document.getElementById("rooster_status").innerHTML = first+"<br>"+second;
		document.getElementById("clock").innerHTML = hour+":"+minute;
	} else {
		//document.getElementById("rooster_status").innerHTML = "The rooster remains silent";
	}
}

function displayRoosterClue() {
	document.getElementById("rooster_clue").innerHTML = "The rooster spits out a card. It says:<br>The rooster crows just before midnight.";
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
	
	document.getElementById("tablet_screen").innerHTML = "A number is displayed: " + number;
}

function drawp3() {
	var text3 = "A clock on the wall. The hour and minute display can be changed freely.";
	document.getElementById("t3").innerHTML = text3;
	
	append3();
	initializeClock();
	
}

function append3() {
	var div_clock = '<div id="clock"></div><br>';
	var div_clock_panel = '<div id="clock_panel">'
	div_clock_panel += '<input id="hour" type="number" placeholder="hr" min="0" max="23"><input id="minute" type="number" placeholder="min" min="0" max = "59">'
	div_clock_panel += '<button type="button" onclick="checkTime()">Change to this time</button></div>';
	
	$("#a3").append(div_clock);
	$("#a3").append(div_clock_panel);
}

function initializeClock() {
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
	if (m<10) {
		m = "0"+m;
	}
	document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(function(){ initializeClock() }, 500);
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
	
	
	$("#a4").append(div0);
	$("#a4").append(div1);
	$("#a4").append(div2);
}

function reset4() {
	var initialLevel = new Array(80,0,0);
	var i;
	for (i=0; i<numCups; i++) {
		cup[i].level = initialLevel[i];
		drawCup(i);
		setWater(i);
	}
}

function drawCup(index) {
	var cupName = "cup"+index;
	document.getElementById(cupName).style.height = cup[index].height+"px";
	document.getElementById(cupName).style.top = 100 - cup[index].height+"px";
}

function setWater(index) {
	var water = "water"+index;
	document.getElementById(water).style.top = cup[index].height-cup[index].level+"px";
	document.getElementById(water).style.height = cup[index].level + "px";
	document.getElementById(water).style.backgroundColor = "blue";
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
	document.getElementById("weight_panel").innerHTML = cup[index].level/10;
	checkWeight(cup[index].level/10);
}

function pourWater(og,dest) {
	var id_from = og[og.length-1];
	var id_to = dest[dest.length-1];
	
	var amount = Math.min(cup[id_from].level,cup[id_to].height-cup[id_to].level);
	cup[id_from].level -= amount;
	cup[id_to].level += amount;
	
	setWater(id_from);
	setWater(id_to);
}

function drawp4() {
	var text4 = "A counter. There are three cups on it; one is empty and two contain some water. Drag to pour water from a cup to another.";
	document.getElementById("t4").innerHTML = text4;
	append4();
	reset4();
}

function checkWeight(num){
	if (num == 4) {
		document.getElementById("clue_1").innerHTML = '<br> July 7, 23:16';
		city_of_light = 1;
	}
}



function drawp5() {
	var text5 = "A scale. The number 4 is sloppily stuck on top. It seems like it can measure the weight of the water cups. Drag a cup to the scale to weigh it.";
	document.getElementById("t5").innerHTML = text5;
	
	append5();
}

function append5() {
	var div0 = '<div id="scale" ondrop="dropOnScale(event)" ondragover="allowDrop(event)">';
	div0 += '<div id="weight_panel"> 0 </div>';
	div0 += '<div id="clue_4" > 4 </div></div>';
	
	$("#a5").append(div0);
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
	
	$("#a6").append(div_stones_remained);
	$("#a6").append(select_stones_picked);
	$("#a6").append(button_pick);
	$("#a6").append(button_reset_stones);
	$("#a6").append(div_bot_moves);
	$("#a6").append(div_stones_result);
}


function drawp6() {
	append6();
	reset6();

}

function reset6() {
	setParameter();
	remain = num_stones;
	var description = "A table. There are " + num_stones + " stones on it. A robot named Frank sits across the table."
	var rule = "Each turn you and Frank can pick between 1 and "+num_stones_allowed+" stones. Whoever picks the last stone wins. You can go first. Try to win against Frank!"
	document.getElementById("t6").innerHTML = description + " " + rule;
	
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
	
	document.getElementById("stones_picked").innerHTML = optiontxt;
	
	document.getElementById("stones_remained").innerHTML = "Stones remained: " + remain;
}


function pickStones() {
	var pick = document.getElementById("stones_picked").value;
	remain -= pick;
	document.getElementById("stones_remained").innerHTML = "Stones remained: " + remain;
	
	if (remain == 0) {
		document.getElementById("stones_result").innerHTML = "You won! Frank looks very sad. Also, a sound can be heard from the rooster statue."
		document.getElementById("pick").style.display = "none" ;
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
	
	document.getElementById("bot_move").innerHTML = "The bot picked "+mypick+" stones";
	document.getElementById("stones_remained").innerHTML = "Stones remained: " + remain;
	
	if (remain == 0) {
		document.getElementById("stones_result").innerHTML = "You lost! Frank laughs at your face."
		document.getElementById("pick").style.display = "none" ;
	} else if (remain < num_stones_allowed) {
		displayStones();
	}
}
