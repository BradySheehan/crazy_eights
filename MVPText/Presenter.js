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

  // Create View.
  // In this program, the view does not need to be able to
  // refer back to the Presenter, but some programs might need to
  // pass a reference to the Presenter (this) to the View constructor.
  this.view = new View(this);
  this.view.displayComputerHand(this.computer.getHandCopy());
  //this.view.setSuitListener();
  // window.alert("game started");
}
  /**
   * Play one complete game.
   */
   Presenter.prototype.play = function () {
    do {
      this.playHuman();
      if (!this.human.isHandEmpty()) {
        this.playComputer();
      }
    } while (!(this.human.isHandEmpty() || this.computer.isHandEmpty()));
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
 * Allow human to play.
 */
 Presenter.prototype.playHuman = function() {
      var hand = this.human.getHandCopy(); // copy of hand for convenience
      this.view.displayPileTopCard(this.pile.getTopCard());

	// THIS ALL NEEDS TO BE MODIFIED TO REFLECT THE FACT THAT WE AREN'T USING 'p' ANYMORE OR RETURNING cardString

      // var cardString = this.view.displayHumanHand(hand);
	    // var card = this.human.find(cardString); //returns the card object from the cardString
                                              //if the card is in the players hand

      //if cardString!= null and the their card was in their hand or their card was valid to play
      //not sure how this while loop will know whether or not the user selected a card from the pile
      //or played a card from their hand (whats the relationship between the two event listeners?)

		// this is causing the infinite loop (even though it's an &&), because we
    // never return cardString, making it never == "p"
		// until the onclick works for the cards, the second condition will also be
    // false because card isn't
    // being assigned to anything so the first condition of the || part is always false
    // 
    
    //for part D: check to see if they selected an 8, if they did, we graphically display
    //4 suits that they can pick from for playing that card
    // if(cardString[0] == "8") {

    // }

    while (cardString != null && (!card || !this.pile.isValidToPlay(card))) {
      this.view.displayWrongCardMsg(cardString);
      cardString = this.view.displayHumanHand(hand);
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
 * Play for the computer.  In this version, the computer always plays
 * the first card in its hand that is playable.  If it plays an 8,
 * the suit implicitly announced is the suit on the card.
 */
 Presenter.prototype.playComputer = function() {
  // Play the first playable card, or pick if none is playable.
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

  Presenter.prototype.setSuit(suit) = function() {
    //set the suit
  }
};
