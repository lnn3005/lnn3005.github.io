$(document).ready(function(){
    $(".puzzle_container").click(function(){
		var id = ($(this).attr("id"));
		var num = id.charAt(1);
		var t = "t"+num;
		if (num<2) {
			var roomName = "puzzles/room"+num+".htm";		
			window.location.href = roomName;
		} else {
			var messsage = "<div>This room is under construction. Please come back later. Actually only room 1 is playable, so don't bother with the other rooms.</div>";
			$(this).append(message);
		}
	});
});