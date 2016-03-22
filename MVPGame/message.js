"use strict";
function setWelcome(){
  window.alert("here");
  var params = window.location.search.split(/[?=&]/);
  var ind = params.indexOf("signIn");
  if(params.length() > 2) {
	  window.alert(params);
	  window.alert(typeof params);
	  window.alert(params[1]);
	  window.alert(params[2]);
	  window.document.getElementById("welcome").textContent = "Welcome, "+ params[ind+1] + "!";
  } else {
  	//we get the result of the game they just played
  	if(params[ind+3] == "win"){
  		window.document.getElementById("welcome").textContent = "Congratulations, " + params[ind+1] + "! Play again?";
  	} else {
  		window.document.getElementById("welcome").textContent = "Sorry, " + params[ind+1]+ ", better luck next time";
  	}
  }
}

