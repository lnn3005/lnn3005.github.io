/*
function displayClock() {
	}	var text = '<select id = "hour">';
	for (i = 0; i <= 23; i++) {
		text += '<option value="' + i + '">'+ i + '</option>';
	}
	text += '</select> <select id = "minute">';
	for (i = 0; i <= 59; i++) {
		text += '<option value="' + i + '">'+ i + '</option>';
	}
	text += '</select>';
	document.getElementById("clock").innerHTML = text;
}
*/

function initializePage() {
	initializeCups();
	initializeStones();
	initializeClock();
}

function initializeClock() {
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
	if (m<10) {
		m = "0"+m;
	}
	document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}


var key_found = 0;
var city_of_light = 0;

function checkPW() {
	var pw = document.getElementById("panel_input").value;
	
	if (pw == pwd) {
		keyFound();
	} else {
		document.getElementById("door_status").innerHTML = 'The door is shut tight.';
	}	
}

function keyFound() {
	document.getElementById("door_status").innerHTML = "The door is opened! You won!";
}


/*

function displayClock(){
	var text = '<input id="hour" placeholder="Hour"><input id="minute" placeholder="minute">';
	text += '<button type="button" onclick="checkTime()">Change to this time</button>';
	document.getElementById("clock_panel").innerHTML = text;
}
*/
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
		document.getElementById("rooster_status").innerHTML = "The rooster remains silent";
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
/**
function displayPaper() {
	//window.alert("Piece of paper added to inventory");
	var alphabet = 'The piece of paper says: <br>abcdefghijklmnopq<span id="r" onclick=getKey()>r</span>stuvwxyz<br>4';
	document.getElementById("paper").innerHTML = alphabet;
}
*/

function getKey() {
	if (city_of_light == 1) {
		document.getElementById("display_key").innerHTML = "A number is carved into the letter. It says 1984!";
		key_found = 1;
	}
}


/************* Water cups initialization module ****************/

var numCups = 3;
var cupHeight = new Array(80,50,30);


var cup = new Array({height:cupHeight[0],level:0},{height:cupHeight[1],level:0},{height:cupHeight[2],level:0});


function initializeCups() {	
	var initialLevel = new Array(80,0,0);
	var i;
	for (i=0; i<numCups; i++) {
		cup[i].level = initialLevel[i];
		drawCup(i);
		setWater(i);
	}
	document.getElementById("reset_button").innerHTML = "Reset";
	//document.getElementById("table").style.visibility = "visible";

}

function drawCup(index) {
	var cupName = "cup"+index;
	document.getElementById(cupName).style.height = cup[index].height+"px";
	//document.getElementById(cup).style.width = cupWidth+"px";
	document.getElementById(cupName).style.top = 100 - cup[index].height+"px";
	//document.getElementById(cup).style.left = cupLeft+"px";
}

function setWater(index) {
	var water = "water"+index;
	document.getElementById(water).style.top = cup[index].height-cup[index].level+"px";
	document.getElementById(water).style.height = cup[index].level + "px";
	document.getElementById(water).style.backgroundColor = "blue";
}


/*********** Water pouring module *****************/


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
	//document.getElementById("weight_info").innerHTML = "This cup weighs " + cup[index].level/10 + " oz";
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

function checkWeight(num){
	if (num == 4) {
		document.getElementById("clue_1").innerHTML = 'A line appears on the door: <br> July 7, 23:16';
		city_of_light = 1;
	}
}

/*************** Stones game puzzle module *************/

var num_stones = 0;
var num_stones_allowed = 0;

function setParameter() {
	num_stones_allowed = Math.floor((Math.random() * 4) + 3);
	while (num_stones % (num_stones_allowed+1) == 0) {
		num_stones = Math.floor((Math.random() * 10) + 15);
	}
}

var remain;

function initializeStones() {
	setParameter();
	remain = num_stones;
	var description = "A table. There are " + num_stones + " stones on it. A robot named Frank sits across the table."
	var rule = "Each turn you and Frank can pick between 1 and "+num_stones_allowed+" stones. Whoever picks the last stone wins. You can go first. Try to win against Frank!"
	document.getElementById("stones_game_description").innerHTML = description + " " + rule;
	
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


var pwd = "GGWP";

