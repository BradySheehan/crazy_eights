"use strict";


//for each card in the hand, it will set the properties in the dom to display that card
//by calling replace child, we "clear the screen"? - use it for the table
//the table has two images the deck and the top card showing on the discard pile
//an element that gets replaced , a span, with a card image as the program is running
//
//what about removing card from a hand when it is played? at every current time,
//the dom has a set of hands, you can just remove them all and replace them with
//a new hand (could use append child instead, but it turns out the updates are so fast
//you don't even see them erase)
//
//need to call remove explicity (dom doesn't konw what is happening in the data structure)
//

/**
 * Provide methods for interacting with the user.
 */
 function View(presenter) {
  this.topCard = null;
  this.topCardString = "";
  this.errorString = "";
  this.presenter = presenter;
}

/**
 * Display information about the computer's hand.
 * Hand is an array of card's.
 */
 View.prototype.displayComputerHand = function(hand) {
  var left = 0;
  var computerHand = window.document.getElementById("computerHand");
  for (var i = 0; i < hand.length; i++) {
    left += 15;
    var img = window.document.createElement("img");
    img.setAttribute("src", "../images/PlayingCards/back.png");
    img.setAttribute("alt", "Card Back");
    img.style.position = "absolute";
    img.style.left = (left + "px");
    img.style.top = "0";
    img.style.width = "71px";
    img.style.height = "96px";
    img.style.zIndex = i;
    computerHand.appendChild(img);
  }
  return;
};

// I think this is for for part d, which is for selecting a suit graphically,
// not for changing the card displayed

/*View.prototype.setSuitListener = function() {
   var presenter = this.presenter;
   var suitClickHandler = function(event) {
   // My code uses id attribute of event target to get suit
   		var suit = event.target.alt
   		presenter.setSuit(suit);
   };
}*/

/**
 * Display the top card of the discard pile (at the next opportunity).
 */
 View.prototype.displayPileTopCard = function(card) {
  this.topCard = card;
  this.topCardString = "Top card of pile: " + card;
  var pres = this.presenter;
  var pileSelect = function() {
    // here we want to add a card from the top of the deck
    // to the player's hand to be displayed
    var pickedCard = pres.deck.dealACard();
    window.alert(pickedCard + " was clicked");
    pres.human.add(pickedCard);
    pres.view.displayHumanHand(pres.human.getHandCopy()); //pass the updated hand to be displayed
  }

  var element = window.document.getElementById("table");
  var img1 = window.document.createElement("img");
  var img2 = window.document.createElement("img");
  img1.setAttribute("src", "../images/PlayingCards/back.png");
  img1.setAttribute("alt", "Card Back");
  img1.style.left = "0";
  img1.style.top = "0";
  img1.style.width = "71px";
  img1.style.height = "96px";
  img1.addEventListener("click", pileSelect, false);
  element.appendChild(img1);

  img2.setAttribute("src", card.getURL());
  img2.setAttribute("alt", card.toString());
  img2.style.left = "71px";
  img2.style.top = "0";
  img2.style.width = "71px";
  img2.style.height = "96px";
  element.appendChild(img2);

  return element;
};

/**
 * Display a "wrong card" message (at the next opportunity).
 */
 View.prototype.displayWrongCardMsg = function(cardString) {
  this.errorString = "Bad input '" + cardString + "'. Please try again.";
};

/**
 * Display the human hand.  This version also prompts the user
 * and returns the string entered.
 */
 View.prototype.displayHumanHand = function(hand) {
  var playerHand = window.document.getElementById("playerHand");
  var pres = this.presenter;
  var humanSelect = function(event) {
	  var cardString = event.target.alt; // now PASS this cardString to a Presenter function, but it's not working.....so we'll keep trying here
		window.alert(cardString + " was clicked");
		var card = pres.human.find(cardString);
		window.alert("Card picked: " + card);
		var ind = pres.human.indexOf(card); // this only returns that it was found sometimes
		window.alert("Index: " + ind);

		if(ind == -1 ) {
			window.alert("Index of card was not found.");
		}
		pres.human.remove(ind);

	    //now remove all the children of this div and then call displayHumanHand to re add them
		var playerHand = window.document.getElementById("playerHand");
	   	var childNodesArray = playerHand.childNodes;
	   	for(var i = 0; i < childNodesArray.length; i++) {
	   		playerHand.removeChild(childNodesArray[i]);
	    }
		pres.view.displayHumanHand(pres.human.getHandCopy()); //display new cards

    //updating pile to have new top card
    var pile = window.document.getElementById("table");
    var img2 = pile.childNodes[1];
    img2.setAttribute("src", card.getURL());
    pres.pile.acceptACard(card);
  } //end humanSelect()

  var left = 0;
  for (var i = 0; i < hand.length; i++) {
	left += 15;
    var img = window.document.createElement("img");
    img.style.position = "absolute";
    img.style.left = (left + "px");
    img.style.top = "0";
    img.style.width = "71px";
    img.style.height = "96px";
	img.style.zIndex = i;
    img.style.height = "96px";
	img.style.zIndex = i.toString();
    img.setAttribute("src", hand[i].getURL());
    img.setAttribute("alt", hand[i].toString());
    img.addEventListener("click", humanSelect, false);
    playerHand.appendChild(img);
  }
  // return cardString;
};

/**
 * Display the suit picker.  This version also prompts the user
 * and returns the string entered.
 */
 View.prototype.displaySuitPicker = function(hand) {
   return window.prompt("Your hand: " + hand.toString() +
    "\nWhat suit would you like the 8 to represent" +
    " (c, d, h, or s)?");
 };


/**
 * Announce that human has won.
 */
 View.prototype.announceHumanWinner = function() {
  window.alert("Like, congrats 'n' 'at...");
};

/**
 * Announce that I have won.
 */
 View.prototype.announceComputerWinner = function() {
  window.alert("Oh yeah!!  I am a WINNER and you are a, well, non-winner.");
};

