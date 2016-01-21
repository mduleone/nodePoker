"use strict";

var poker = require('./poker');
var utils = require('./poker-utils');

function newGame() {
    var game = utils.drawCards(5, utils.newDeck());

    return {
        deck: game.deck,
        hand: game.draw,
    };
}

function discard(discard, hand, deck) {
    var thisCard;

    for (var card in discard) {
         thisCard = discard[card];
         hand.splice(hand.indexOf(thisCard), 1);
    }

    var newDraw = utils.drawCards(discard.length, deck);

    return {
        deck: newDraw.deck,
        hand: hand.concat(newDraw.draw),
    }
}

function test() {
    console.log('starting test');
    var game = newGame();

    console.log('Your hand is:', game.hand);
    console.log('Discarding', game.hand.slice(0,2));
    game = discard(game.hand.slice(0,2), game.hand, game.deck);

    console.log('Your hand is now:', game.hand);
}

module.exports = {
    newGame: newGame,
    discard: discard,
    test: test,
}
