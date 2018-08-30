document.getElementById("navbar-partial").innerHTML =
"<nav class='navbar navbar-default'>"+
	  "<div class='container-fluid'>"+
	    
	    "<div class='navbar-header'>"+
	      "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>"+
		"<span class='sr-only'>Toggle navigation</span>"+
		"<span class='icon-bar'></span>"+
		"<span class='icon-bar'></span>"+
		"<span class='icon-bar'></span>"+
	      "</button>"+
	      "<a class='navbar-brand' href='index.html'><img src='img/ic_launcher.png' class='img-resonsive img-logo'></a>"+
	    "</div>"+

	    "<!-- Collect the nav links, forms, and other content for toggling -->"+
	    "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>"+
	      "<ul class='nav navbar-nav'>"+
		"<li><a href='chat.html'>Foro</a></li>"+
	      "</ul>"+
	      "<ul class='nav navbar-nav navbar-right'>"+
		"<li class='dropdown'>"+
		  "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Mi cuenta<span class='caret'></span></a>"+
		  "<ul class='dropdown-menu'>"+
		    "<li><a href='profile.html'>Mi perfil</a></li>"+
		  "</ul>"+
		"</li>"+
	     " </ul>"+
	    "</div><!-- /.navbar-collapse -->"+
	  "</div><!-- /.container-fluid -->"+
	"</nav>";