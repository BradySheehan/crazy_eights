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


// My View constructor takes an argument from Presenter that is a 
// reference to the Presenter object itself. The View constructor 
// stores this reference in an instance variable named presenter.
//  It does this so that, when the user clicks on a suit symbol, the 
//  event listener assigned to the click event by View can call an 
//  appropriate method on the Presenter to handle the event. My View 
//  code for creating the event listener (the setSuitListener() method 
//   is called by the Presenter constructor) looks something like this:
// View.prototype.setSuitListener = function() { var presenter = this.presenter;
// var suitClickHandler = function(event) {
//            // My code uses id attribute of event target to get suit
//             var suit = ... // Fill in your own code here
//             presenter.setSuit(suit);
// };
// // Code to add suitClickHandler event listener to DOM // elements containing suit characters
// // ...
// };
// It’s important that you use a local presenter variable within the event 
// listener, as shown above, rather than using this.presenter directly in the 
// listener body. This is because the event listener is not a method of the View 
// object, so this will not refer to the View object within the body of the event 
// listener. In other words, avoid using this within event listeners unless you know 
// what you’re doing.

/**
 * Display information about the computer's hand.
 * Hand is an array of card's.
 */
 View.prototype.displayComputerHand = function(hand) {
  //window.alert("here2");
  var left = 0;
  var computerHand = window.document.getElementById("computerHand");
    for (var i = 0; i < hand.length; i++) {
      left+=15;
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

View.prototype.setSuitListener = function() { 
  var presenter = this.presenter;
  var suitClickHandler = function(event) {
           // My code uses id attribute of event target to get suit
        var suit = ; // Fill in your own code here
        var table = window.document.getElementById("table");
        table.childNodes[1].setAttribute("src", img.getURL());
        cardString = hand[i].toString();
        //still need to update the displayed hand
        //
        var newHand = new Array();
        for (var i = 0; i < hand.length; i++) {
          if(hand[i].toString != cardString) {
            newHand.push(hand[i]);
          }
        }
        this.displayHumanHand(newHand);
            presenter.setSuit(suit);
};

/**
 * Display the top card of the discard pile (at the next opportunity).
 */
 View.prototype.displayPileTopCard = function(card) {
  this.topCard = card;
  this.topCardString = "Top card of pile: " + card;

  var element = window.document.getElementById("table");

  var img1 = window.document.createElement("img");
  var img2 = window.document.createElement("img");

  img1.setAttribute("src", "../images/PlayingCards/back.png");
  img1.setAttribute("alt", "Card Back");
  img1.style.left = "0";
  img1.style.top = "0";
  img1.style.width = "71px";
  img1.style.height = "96px";
  element.appendChild(img1);

  img2.setAttribute("src", card.getURL());
  img2.setAttribute("alt", card.toString());
  img2.style.left = "71px";
  img2.style.top = "0";
  img2.style.width = "71px";
  img2.style.height = "96px";
  element.appendChild(img2);

  //window.alert("here2");
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
  //window.alert("here1");
  var left = 0;
  var playerHand = window.document.getElementById("playerHand");
  var cardString;
    for (var i = 0; i < hand.length; i++) {
      left+=15;
      var img = window.document.createElement("img");
      img.style.position = "absolute";
      img.style.left = (left + "px");
      img.style.top = "0";
      img.style.width = "71px";
      img.style.height = "96px";
      img.setAttribute("src", hand[i].getURL());
      img.setAttribute("alt", hand[i].toString());
      img.style.zIndex = i;
      img.addEventListener("click", function(){
        var table = window.document.getElementById("table");
        table.childNodes[1].setAttribute("src", img.getURL());
        cardString = hand[i].toString();
        //still need to update the displayed hand
        //
        var newHand = new Array();
        for (var i = 0; i < hand.length; i++) {
          if(hand[i].toString != cardString) {
            newHand.push(hand[i]);
          }
        }
        this.displayHumanHand(newHand);

      }, false);
      playerHand.appendChild(img);
    }
    return cardString;
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

