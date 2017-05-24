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

var key_found = 0;
var city_of_light = 0;

function checkPW() {
	var pw = document.getElementById("panel_input").value;
	
	if (pw == "1984") {
		keyFound();
	} else {
		document.getElementById("door_status").innerHTML = 'The door is shut tight';
	}	
}

function keyFound() {
	document.getElementById("door_status").innerHTML = "The door is opened!";
	window.alert("You found it!");
}

function displayPanel(){
	var text = '<input id="panel_input" placeholder="Enter password"><button type="button" onclick="checkPW()">E</button>';
	document.getElementById("panel").innerHTML = text;
}

/*

function displayClock(){
	var text = '<input id="hour" placeholder="Hour"><input id="minute" placeholder="minute">';
	text += '<button type="button" onclick="checkTime()">Change to this time</button>';
	document.getElementById("clock_panel").innerHTML = text;
}
*/

function checkTime() {
	var hour = document.getElementById("hour").value;
	var minute = document.getElementById("minute").value;
	
	
	if (hour == 23 && minute == 59) {
		document.getElementById("rooster").innerHTML = "The rooster crows. It also spits out <button onclick=displayPaper()>a piece of paper</button>!";
		document.getElementById("clock").innerHTML = hour+":"+minute;
	} else {
		document.getElementById("rooster").innerHTML = "The rooster remains silent";
	}
}

function displayPaper() {
	//window.alert("Piece of paper added to inventory");
	var alphabet = 'The piece of paper says: <br>abcdefghijklmnopq<span id="r" onclick=getKey()>r</span>stuvwxyz<br>4';
	document.getElementById("paper").innerHTML = alphabet;
}

function getKey() {
	if (city_of_light == 1) {
		window.alert("A number is carved into the letter R. It says 1984!");
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
	document.getElementById("table").style.visibility = "visible";

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
	document.getElementById("weight_info").innerHTML = "It seems that this bottle weighs " + cup[index].level/10 + " oz";
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
		var para = document.createElement("P");
		var t = document.createTextNode("There's a sound coming from the door");
		para.appendChild(t);
		document.getElementById("weight_info").appendChild(para);
		document.getElementById("clue_1").innerHTML = 'A line appears on the door: <br> The key can be found at the center of the city of light.';
		city_of_light = 1;
	}
}


