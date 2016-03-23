"use strict";
function setWelcome(){
  var params = window.location.search.split(/[?=&]/);
  var ind = params.indexOf("signIn");
  if(params.length > 2) {
	  window.document.getElementById("welcome").textContent = "Welcome, "+ params[ind+1] + "!";
  } else {
  	//we get the result of the game they just played
  	window.alert(params);
  	if(params[ind+3] == "won"){
  		window.document.getElementById("welcome").textContent = "Congratulations, " + params[ind+1] + "! Play again?";
  	} else {
  		window.document.getElementById("welcome").textContent = "Sorry, " + params[ind+1]+ ", better luck next time";
  	}
  }
}

