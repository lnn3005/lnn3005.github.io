$(document).ready(function(){
	$("header").hide().fadeIn(1000);
	$("nav").hide().delay(1200).fadeIn(200);
	$("#description").hide().fadeIn(2000);
	for (var i=1; i<=6; i++) {
		var id = "p"+i;
		$("#"+id).hide().delay(i*200).fadeIn(i*200);
	}
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
	
	$(".puzzle_container").mouseover(function(){
		$(this).css("background-color","#f2fff2");
	});
	$(".puzzle_container").mouseleave(function(){
		$(this).css("background-color","#f2eee2");
	});

});