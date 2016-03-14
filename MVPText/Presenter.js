"use strict";

// Crazy Eights Game Develped by Mathew Sobocinski and Brady Sheehan


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
  this.view = new View(this);
  this.view.displayComputerHand(this.computer.getHandCopy());
  this.view.displayTable(this.pile.getTopCard());
  this.view.setSuitListener();
}
/**
 * Play one complete game.
 */
 Presenter.prototype.play = function () {
  this.playHuman();
  return;
};

/**
 * This function gets called whenever the human selects a card off the deck.
 * This function will update the human hand and have the computer take its turn.
 */
Presenter.prototype.continueGame = function(pickedCard) {
  this.human.add(pickedCard);
  this.view.displayHumanHand(this.human.getHandCopy()); //pass the updated hand to be displayed
  this.playComputer();
  return;
};

  /**
   * Verify that the card selected by the user is valid to play
   * and update the hand and table accordingly. If the card is not
   * valid to play, alert the user.
   */
Presenter.prototype.checkPlayedCard = function(cardString) {
  var card = this.human.find(cardString);
  if(this.pile.isValidToPlay(card)) {
    var ind = this.human.indexOf(card);
    this.human.remove(ind);
    var playerHand = window.document.getElementById("playerHand");
	  while (playerHand.firstChild) {
		 playerHand.removeChild(playerHand.firstChild);
	  }
    this.view.displayHumanHand(this.human.getHandCopy()); //display new cards
    var pile = window.document.getElementById("table");
    var img2 = pile.childNodes[1];
    img2.setAttribute("src", card.getURL());
    this.pile.acceptACard(card);
    this.view.displayPileTopCard(card);
    if (this.pile.getTopCard().getValue() == "8") {
       this.view.displaySuitPicker();
    } else {
      if (this.human.isHandEmpty()) {
        this.view.announceHumanWinner();
      } else {
        this.playComputer();
      }
    }
  } else {
    window.alert("That card is not valid, please pick another card.");
  }
  return;
};

/**
 * Allow human to play.
 */
 Presenter.prototype.playHuman = function() {
  this.view.displayHumanHand(this.human.getHandCopy());
  return;
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
  var computerHand = window.document.getElementById("computerHand");
  while (computerHand.firstChild) {
    computerHand.removeChild(computerHand.firstChild);
  }
  var card = hand[0];
  while (!this.pile.isValidToPlay(card) && i<hand.length-1) {
    i++;
    card = hand[i];
  }
  hand = null;
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
  return;
};

/**
 * Called from view with selected suit. Updates pile accordingly.
 */
Presenter.prototype.continueGameAfterSuitSelection = function(suit) {
  this.pile.setAnnouncedSuit(suit);
  if (this.human.isHandEmpty()) {
      this.view.announceHumanWinner();
  } else {
    this.playComputer(); //we didn't call playComputer if we displayed the suit picker..
  }
  return;
};