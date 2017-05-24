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

function openDoor() {
	/*
	if (key_found == 0) {
		document.getElementById("clue_1").innerHTML = 'The key can be found at the center of the city of light.';
	} */
	
	if (key_found == 1) {
		keyFound();
	} else {
		document.getElementById("door_status").innerHTML = 'The door is shut tight';
		document.getElementById("clue_1").innerHTML = 'A line is carved into the door: <br> The key can be found at the center of the city of light.';
		city_of_light = 1;
	}
	
}

function displayClock(){
	var text = '<input id="hour" placeholder="Hour"><input id="minute" placeholder="minute">';
	text += '<button type="button" onclick="checkTime()">Submit</button>';
	document.getElementById("clock").innerHTML = text;
}

function checkTime() {
	var hour = document.getElementById("hour").value;
	var minute = document.getElementById("minute").value;
	
	if (hour == 23 && minute == 59) {
		document.getElementById("rooster").innerHTML = "The rooster crows. It also throws up <span onclick=displayPaper()>a piece of paper</span>.";
	} else {
		document.getElementById("rooster").innerHTML = "The rooster remains silent";
	}
}

function displayPaper() {
	window.alert("Piece of paper added to inventory");
	var alphabet = 'The piece of paper says: <br>abcdefghijklmnopq<span id="r" onclick=getKey()>r</span>stuvwxyz';
	document.getElementById("paper").innerHTML = alphabet;
}

function getKey() {
	if (city_of_light == 1) {
		window.alert("Key found. Added to inventory");
		key_found = 1;
	}
}

function keyFound() {
	document.getElementById("door_status").innerHTML = "The door is opened";
	document.getElementById("key_found").innerHTML = "You found it!";
}