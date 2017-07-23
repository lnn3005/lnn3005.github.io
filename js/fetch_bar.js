var bar = '\
<div class="nav-container">\
	<nav class="navbar navbar-custom">\
		<div class="container-fluid">\
			<div class="navbar-header">\
				<a class="navbar-brand" >6C</a>\
			</div>\
				<ul class="nav navbar-nav">\
				<li><a href="index.htm">Home</a></li>\
				<li><a href="about.htm">About</a></li>\
				<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Contact<span class="caret"></span></a>\
					<ul class="dropdown-menu">\
						<li><a href="https://www.linkedin.com/in/linh-nguyen-25625b20/" target="_blank">LinkedIn</a></li>\
						<li><a href="https://www.facebook.com/ngoclinhnguyen3005" target="_blank">Facebook</a></li>\
					</ul>\
				</li>\
			</ul>\
		</div>\
	</nav>\
</div>\
';

$(document).ready(function(){	
	$("#bar_container").append(bar);
});

