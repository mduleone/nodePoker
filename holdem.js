"use strict";

var poker = require("./poker");
var combinatorics = require("js-combinatorics").Combinatorics;

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
        allHands.push(determineHand(board, pockets[i][1]));
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

function determineHand (board, pockets) {
    var cards = pockets.concat(board);
    var cmb = combinatorics.combination(cards, 5);
    var possibleHands = [];
    var hand = null;
    while (hand = cmb.next()) {
        hand.sort(function (a, b) {
            if (a.high < b.high) {
                return -1;
            } else if (a.high > b.high) {
                return 1;
            } else {
                return 0;
            }
        });
        possibleHands.push(hand);
    }
    var highHand = possibleHands.pop();
    var compareHand = null;
    var i = 0;
    while (compareHand = possibleHands.pop()) {
        highHand = poker.compareHands(highHand, compareHand).hand;
    }

    return highHand;
}

module.exports = {
    pickWinner: pickWinner,
    determineHand: determineHand,
}