"use strict";

/**
 * Provide methods for interacting with the user.
 */
 function View(presenter) {
  this.topCard = null;
  this.presenter = presenter;
}

/**
 * Display information about the computer's hand.
 * Hand is an array of card's.
 */
 View.prototype.displayComputerHand = function(hand) {
  var computerHand = window.document.getElementById("computerHand");
  while (computerHand.firstChild) {
    computerHand.removeChild(computerHand.firstChild);
  }
  var left = 0;
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
 *  Select a suit graphically for an 8. Function creates an event
 *  listener that will manage adjusting the card based on the user's
 *  choice of suit
 */
View.prototype.setSuitListener = function() {
	var presenter = this.presenter;
  var suitClicker = function(event) {
    var suit = event.target.id;
    var pile = window.document.getElementById("table").childNodes[1];
    pile.setAttribute("src", "../images/PlayingCards/" + "8"+suit + ".png");
    pile.setAttribute("alt", "8"+suit);
    var suitMenu = window.document.getElementById("suitMenu");
    suitMenu.style.display="none";
    presenter.continueGameAfterSuitSelection(suit);
  };
  var clubs = window.document.getElementById("c");
  clubs.addEventListener("click",suitClicker, false);
  var diamonds = window.document.getElementById("d");
  diamonds.addEventListener("click",suitClicker, false);
  var hearts = window.document.getElementById("h");
  hearts.addEventListener("click",suitClicker, false);
  var spades = window.document.getElementById("s");
  spades.addEventListener("click",suitClicker, false);
  return;
};


/**
 * Display the top card of the discard pile (at the next opportunity).
 */
 View.prototype.displayPileTopCard = function(card) {
  this.topCard = card;
  var table = window.document.getElementById("table");
  var newPile = window.document.createElement("img");
  newPile.setAttribute("src", card.getURL());
  newPile.setAttribute("alt", card.toString());
  newPile.style.left = "71px";
  newPile.style.top = "0";
  newPile.style.width = "71px";
  newPile.style.height = "96px";
  table.removeChild(table.childNodes[1]);
  table.appendChild(newPile);
  return table;
};

/**
 * Display the initial pile and deck images on the table.
 * Only meant for initialization.
 */
View.prototype.displayTable = function(topCard) {
  this.topCard = topCard;
  var pres = this.presenter;
  var element = window.document.getElementById("table");
  var deck = window.document.createElement("img");
  var deckSelect = function() {
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
  return;
};

/**
 * Display the human hand.
 */
View.prototype.displayHumanHand = function(hand) {
  var playerHand = window.document.getElementById("playerHand");
	var pres = this.presenter;
	var humanSelect = function(event) {
    pres.checkPlayedCard(event.target.alt);
	}; //end humanSelect()

	while (playerHand.firstChild) {
		playerHand.removeChild(playerHand.firstChild);
	}
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
};

/**
 * Display the suit picker.
 */
View.prototype.displaySuitPicker = function(hand) {
	var suitMenu = window.document.getElementById("suitMenu");
	suitMenu.style.display="block";
};

/**
 * Announce that human has won.
 */
 View.prototype.announceHumanWinner = function() {
  window.alert("Your weak father should be ashamed of you");
  window.location.reload(false);
};

/**
 * Announce that I have won.
 */
 View.prototype.announceComputerWinner = function() {
  window.alert("Oh yeah!!  I am a WINNER and you are a, well, non-winner.");
  window.location.reload(false);
};