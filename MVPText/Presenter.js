"use strict";

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

  this.view.setSuitListener();
}
  /**
   * Play one complete game.
   */
	// this function is only called once, and the do-while continues until someone wins
	// this doesn't work yet..it might only be because the computerPlayer graphics need to be done...
	// ...sometimes I will play a card and it will be displayed both on the pile and also still displayed in my hand
   Presenter.prototype.play = function () {
    this.playHuman();
  };

  /**
   * This function gets called whenever the human selects a card off the deck. 
   * This function will update the human hand and have the computer take its turn.
   */
  Presenter.prototype.continueGame = function(pickedCard) {
    this.human.add(pickedCard);
    this.view.displayHumanHand(this.human.getHandCopy()); //pass the updated hand to be displayed
    this.playComputer();
  };

  //NOTE: we should call the same function to
  //continue game play after each event listener is called

  /**
   * Verify that the card selected by the user is valid to play
   * and update the hand and table accordingly. If the card is not
   * valid to play, alert the user. THIS IS A HANDLER
   */
Presenter.prototype.checkPlayedCard = function(cardString) {
    var card = this.human.find(cardString);
    //window.alert("card picked " + cardString);
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
      window.alert("here");


      this.pile.acceptACard(card);
      this.view.displayPileTopCard(card);
      if (this.pile.getTopCard().getValue() == "8") {
          window.alert("card is eight");
         this.view.displaySuitPicker();
      }
      if (this.human.isHandEmpty()) {
        this.view.announceHumanWinner();
      }
      //window.alert("human finished turn");
      this.playComputer();
    } else {
      window.alert("card is not valid, try again please");
    }
};
/**
 * Allow human to play.
 */
 Presenter.prototype.playHuman = function() {
  ////window.alert("human player's turn");
  this.view.displayHumanHand(this.human.getHandCopy());
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
  //window.alert("computer player's turn\n computer hand: " + hand);
  // window.alert("computers hand size = " + hand.length);
  var computerHand = window.document.getElementById("computerHand");
  var childNodesArray = computerHand.childNodes;
  for(var i = 0; i < childNodesArray.length; i++) {
    computerHand.removeChild(childNodesArray[i]);
  }
  var card = hand[0];
  while (!this.pile.isValidToPlay(card) && i<hand.length-1) {
    i++;
    card = hand[i];
  }
  hand = null;
  if (this.pile.isValidToPlay(card)) {
    //window.alert("card choice = " + card);
    this.computer.remove(i);
    this.pile.acceptACard(card);
    this.view.displayPileTopCard(card);
    if (this.pile.getTopCard().getValue() == "8") {
      this.pile.setAnnouncedSuit(card.getSuit());
    }
    this.view.displayComputerHand(this.computer.getHandCopy());
    //window.alert("finished displaying computer hand");
    if (this.computer.isHandEmpty()) {
      this.view.announceComputerWinner();
    }
  }
  else {
    //window.alert("no valid card, pick a card");
    this.computer.add(this.deck.dealACard());
    this.view.displayComputerHand(this.computer.getHandCopy());
  }
  //window.alert("hand now: " + this.computer.list);
};

/**
 * Called from view with selected suit. Updates pile accordingly.
 */

  Presenter.prototype.setSuit = function(suit) {
    //set the suit
    //
    this.pile.setAnnouncedSuit(suit);

  };
