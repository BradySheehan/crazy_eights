"use strict";
// One addition you will probably want to make to the end of the
// Presenter constructor is code to ask the View to display the computer hand.
// Otherwise, you won’t see the computer hand until after the user’s first round
// of play. (The text-based program did not show the computer hand until after the
//   user’s first play, but that was not a problem. Visually, however, it would look
//   odd.) Other than this change, you will probably be able to use the provided
// Presenter as-is for part (a) and make all of your changes in View.js.


/**
 * Logic for the game Crazy Eights between a human and the computer.
 */
 function Presenter() {
  /** Constructor:
   * Initialize game by creating and shuffling the deck,
   * dealing one card (other than an 8) to the discard pile, and
   * dealing 7 cards to each player.
   * Then create View object, which will be responsible for the
   * user interface.
   */
   this.deck = new Deck();
   do {
    this.deck.shuffle();
  } while (this.deck.isTopCardAnEight());
  this.pile = new Pile();
  this.pile.acceptACard(this.deck.dealACard());
  this.human = new Player(this.deck);
  this.computer = new Player(this.deck);

  //create the view and start displaying the computer's hand and the table
  this.view = new View(this);
  this.view.displayComputerHand(this.computer.getHandCopy());
  this.view.displayTable(this.pile.getTopCard());

  //this.view.setSuitListener();
  window.alert("game started");
}
  /**
   * Play one complete game.
   */
	// this function is only called once, and the do-while continues until someone wins
	// this doesn't work yet..it might only be because the computerPlayer graphics need to be done...
	// ...sometimes I will play a card and it will be displayed both on the pile and also still displayed in my hand
   Presenter.prototype.play = function () {
    this.playHuman();
   // this.playComputer();


    // do {
    //   var humanHandSize = this.human.list.length; // previous length//
    //   window.alert(humanHandSize);
    //   this.playHuman();
    // 	if (!this.human.isHandEmpty() && (this.human.list.length != humanHandSize)) {
    //   	this.playComputer();
    // 	}
    // } while (!(this.human.isHandEmpty() || this.computer.isHandEmpty()));
  };


Presenter.prototype.playCard = function (cardString) {
	var card = this.human.find(cardString);
   	window.alert("card picked " + card);
	/*var ind = this.human.indexOf(card);
   	if(ind == -1 ) {
		window.alert("index of card was not found");
	}
	this.human.remove(ind);
	//now remove all the children of this div and then call displayHumanHand to re add them
	var playerHand = window.document.getElementById("playerHand");
  	var childNodes = playerHand.childNodes;    	for(var i = 0; i < childNodes.length; i++) {
		playerHand.removeChild(childNodes[i]);
	}
	this.view.displayHumanHand(pres.human.getHandCopy());*/

	while (cardString != null && (!card || !this.pile.isValidToPlay(card))) {
      this.view.displayWrongCardMsg(cardString);
      card = this.human.find(cardString);
    }
	hand = null; // actual hand will change below, so don't use copy
	if (cardString == "p") {
		this.human.add(this.deck.dealACard());
	}
	else {
	    this.human.remove(this.human.indexOf(card));
	    this.pile.acceptACard(card);
	    if (this.pile.getTopCard().getValue() == "8") {
			var suit;
	       	do {
				suit = this.view.displaySuitPicker(this.human.getHandCopy());
	       } while (!(suit == "c" || suit == "d" || suit == "h" || suit == "s"));
	          this.pile.setAnnouncedSuit(suit);
	    }
	}
	if (this.human.isHandEmpty()) {
		this.view.announceHumanWinner();
	}
};

  /**
   * Verify that the card selected by the user is valid to play
   * and update the hand and table accordingly. If the card is not
   * valid to play, alert the user.
   */
Presenter.prototype.checkPlayedCard = function(cardString) {
    var card = this.human.find(cardString);
    window.alert("card picked " + cardString);
    //we have the card. now check if this card is valid to play
    //if this card is valid to play, we want to make the changes to the board
    //if it isn't valid to play, we want to print an error message (but not change anything else)
    if(this.pile.isValidToPlay(card)) {
      window.alert("card is valid to play");
      var ind = this.human.indexOf(card);
      this.human.remove(ind);
      var playerHand = window.document.getElementById("playerHand");
      var childNodesArray = playerHand.childNodes;
      for(var i = 0; i < childNodesArray.length; i++) {
        playerHand.removeChild(childNodesArray[i]);
      }
      this.view.displayHumanHand(this.human.getHandCopy()); //display new cards
      //updating pile to have new top card
      var pile = window.document.getElementById("table");
      var img2 = pile.childNodes[1];
      img2.setAttribute("src", card.getURL());
      if (this.pile.getTopCard().getValue() == "8") {
        window.alert("you played an 8!");
        var suit;
        do {
          suit = this.view.displaySuitPicker(this.human.getHandCopy());
        } while (!(suit == "c" || suit == "d" || suit == "h" || suit == "s"));
        this.pile.setAnnouncedSuit(suit);
      } //end if
      window.alert("here");
      this.pile.acceptACard(card);
      this.view.displayPileTopCard(card);
      if (this.human.isHandEmpty()) {
        this.view.announceHumanWinner();
      }
      window.alert("human finished turn");
      this.playComputer();
    } else {
      window.alert("card is not valid, try again please");
    }
};
/**
 * Allow human to play.
 */
 Presenter.prototype.playHuman = function() {
  //window.alert("human player's turn");
  this.view.displayHumanHand(this.human.getHandCopy());
};

/**
 * Play for the computer.  In this version, the computer always plays
 * the first card in its hand that is playable.  If it plays an 8,
 * the suit implicitly announced is the suit on the card.
 */
 Presenter.prototype.playComputer = function() {
  // Play the first playable card, or pick if none is playable.
  window.alert("computer player's turn");
  var i=0;
  var hand = this.computer.getHandCopy(); // copy of hand for convenience
  var card = hand[0];
  while (!this.pile.isValidToPlay(card) && i<hand.length-1) {
    i++;
    card = hand[i];
  }
  hand = null; // actual hand will change below, so don't continue to use copy
  if (this.pile.isValidToPlay(card)) {
    this.computer.remove(i);
    this.pile.acceptACard(card);
    this.view.displayPileTopCard(card);
    if (this.pile.getTopCard().getValue() == "8") {
      this.pile.setAnnouncedSuit(card.getSuit());
    }
    this.view.displayComputerHand(this.computer.getHandCopy());
    if (this.computer.isHandEmpty()) {
      this.view.announceComputerWinner();
    }
  }
  else {
    this.computer.add(this.deck.dealACard());
    this.view.displayComputerHand(this.computer.getHandCopy());
  }
  this.playHuman();
};


  // Presenter.prototype.setSuit(suit) = function() {
  //   //set the suit
  // };
