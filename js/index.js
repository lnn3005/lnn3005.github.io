$(document).ready(function(){
	for (var i=1; i<=8; i++) {
		var id = "p"+i;
		$("#"+id).hide().fadeIn(1000);
	}
    $(".puzzle_container").click(function(){
		var id = ($(this).attr("id"));
		var num = id.charAt(1);
		var t = "t"+num;
		if (num<4) {
			var roomName = "puzzles/room"+num+".htm";		
			window.location.href = roomName;
		} else {
            $("#a"+num).html("");
			var div = "<div id='construction_massage_"+num+"'></div>";
			$("#a"+num).append(div);
			//$(".anime").html("");
			var message = "This room is under construction. Please come back later."
			$("#construction_massage_"+num).append(message).hide().fadeIn(500);
			
		}
	});
	
	$(".puzzle_container").mouseover(function(){
		$(this).css("background-color","#f2fff2");
	});
	$(".puzzle_container").mouseleave(function(){
		$(this).css("background-color","#f2eee2");
	});

});
