"use strict";

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
 // window.alert("displaying computer hand");
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


/**
 *  Select a suit graphically for an 8
 */
View.prototype.setSuitListener = function() {

   //this code will add a listener to the 4 graphical suits that we
   //will display on the screen
	var presenter = this.presenter;
  var suitClicker = function(event) {
    var suit = event.target.id;
    presenter.setSuit(suit);
    var pile = window.document.getElementById("table").childNodes[1];
    pile.setAttribute("src", "../images/PlayingCards/" + "8"+suit + ".png");
    pile.setAttribute("alt", "8"+suit);
    var suitMenu = window.document.getElementById("suitMenu");
    suitMenu.style.display="none";
  };

  var clubs = window.document.getElementById("c");
  clubs.addEventListener("click",suitClicker, false);

  var diamonds = window.document.getElementById("d");
  diamonds.addEventListener("click",suitClicker, false);

  var hearts = window.document.getElementById("h");
  hearts.addEventListener("click",suitClicker, false);

  var spades = window.document.getElementById("s");
  spades.addEventListener("click",suitClicker, false);
};


/**
 * Display the top card of the discard pile (at the next opportunity).
 */
 View.prototype.displayPileTopCard = function(card) {
  //when this function gets called, the image elements already exist
  //lets just replace the current top card of the pile with the top card
  //that needs to be there now
  //window.alert("displaying pile top card");
  this.topCard = card;
  this.topCardString = "Top card of pile: " + card;
  var table = window.document.getElementById("table");
  var newPile = window.document.createElement("img");
  //window.alert(table);
  newPile.setAttribute("src", card.getURL());
  newPile.setAttribute("alt", card.toString());
  newPile.style.left = "71px";
  newPile.style.top = "0";
  newPile.style.width = "71px";
  newPile.style.height = "96px";
  table.removeChild(table.childNodes[1]);
  table.appendChild(newPile);
  //window.alert("finished displaying pile top card");
  return table;
};

/**
 * Display the initial pile and deck images on the table.
 * Only meant for initialization.
 */
View.prototype.displayTable = function(topCard) {
  this.topCard = topCard;
  this.topCardString = "Top card of pile: " + topCard;
  var pres = this.presenter;
  var element = window.document.getElementById("table");
  var deck = window.document.createElement("img");
  var deckSelect = function() {
    // here we want to add a card from the top of the deck
    // to the player's hand to be displayed
    pres.continueGame(pres.deck.dealACard());
  };
  deck.setAttribute("src", "../images/PlayingCards/back.png");
  deck.setAttribute("alt", "Card Back");
  deck.style.left = "0";
  deck.style.top = "0";
  deck.style.width = "71px";
  deck.style.height = "96px";
  deck.addEventListener("click", deckSelect, false);
  element.appendChild(deck);

  var pile = window.document.createElement("img");
  pile.setAttribute("src", topCard.getURL());
  pile.setAttribute("alt", topCard.toString());
  pile.style.left = "71px";
  pile.style.top = "0";
  pile.style.width = "71px";
  pile.style.height = "96px";
  element.appendChild(pile);
};

/**
 * Display a "wrong card" message (at the next opportunity).
 */
 View.prototype.displayWrongCardMsg = function(cardString) {
  this.errorString = "Bad input '" + cardString + "'. Please try again.";
};

/**
 * Display the human hand. This function assumes
 * that the human hand is not displayed yet and
 * creates the necessary elements accordingly.
 *
 * For now, display graphical suit picker here
 *
 */
 View.prototype.displayHumanHand = function(hand) {
  var playerHand = window.document.getElementById("playerHand");
  var pres = this.presenter;
  var humanSelect = function(event) {
	  var cardString = event.target.alt;
		pres.checkPlayedCard(cardString);
  }; //end humanSelect()

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

	// set the display value of the div to "block"
  
  //grab reference to the div and remove display:none
  window.alert("display suit picker");
  var suitMenu = window.document.getElementById("suitMenu");
  suitMenu.style.display="block";
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


//still need event listener for suit picker
