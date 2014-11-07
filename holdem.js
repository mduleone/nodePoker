"use strict";

var poker = require("./poker");

function pickWinner (err, board, hands, callback) {

    if (!poker.validateCards(board)) {
        callback("Invalid Card in Board");
        return;
    }
    for (var hand in hands) {
        if (!poker.validateCards(hands[hand])) {
            callback("Invalid Card in " + hand);
            return;
        }
    }

    // valid Cards everywhere.
    var pockets = [];
    for (var hand in hands) {
        pockets.push([hand, poker.convertCards(hands[hand])]);
    }

    board = poker.convertCards(board);

    var cards = board;
    for (var i = 0; i < pockets.length; i++) {
        cards = cards.concat(pockets[i][1]);
    }

    for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
            if (cards[i].name == cards[j].name && cards[i].suit == cards[j].suit) {
                callback("Invalid Deck -- Duplicate cards");
                return;
            }
        }
    }

    var allHands = [];
    for (var i = 0; i < pockets.length; i++) {
        var allCards = board.concat(pockets[i][1]);
        allHands.push(poker.determineHighHand(allCards));
    }

    var highHandNum = 0;
    var highHand = allHands[0];
    var highHandVal = poker.evalHand(allHands[0]);
    var highPockets = pockets[0][0];
    for (var i = 1; i < allHands.length; i++) {
        var ret = poker.compareHands(allHands[highHandNum], allHands[i]);
        if (ret.err) {
            console.log(i);
            console.log(ret.err);
            console.log(highHandNum);
            callback(ret.err);
            return;
        }
        if (ret.winner == 2) {
            highHandNum = i;
            highHandVal = ret.handVal;
            highHand = ret.hand;
            highPockets = pockets[i][1];
        }
    }
    callback(null, pockets[highHandNum][0], highHandVal, highHand);
}

module.exports = {
    pickWinner: pickWinner,
}