"use strict";

var poker = require("./poker");
var combinatorics = require("js-combinatorics").Combinatorics;

function pickWinner (board, hand1, hand2, hand3, hand4, hand5, hand6, hand7, hand8, hand9, hand10, callback) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    callback = args.pop();
    if (args.length > 0) board = args.shift(); else board = null;
    if (args.length > 0) hand1 = args.shift(); else hand1 = null;
    if (args.length > 0) hand2 = args.shift(); else hand2 = null;
    if (args.length > 0) hand3 = args.shift(); else hand3 = null;
    if (args.length > 0) hand4 = args.shift(); else hand4 = null;
    if (args.length > 0) hand5 = args.shift(); else hand5 = null;
    if (args.length > 0) hand6 = args.shift(); else hand6 = null;
    if (args.length > 0) hand7 = args.shift(); else hand7 = null;
    if (args.length > 0) hand8 = args.shift(); else hand8 = null;
    if (args.length > 0) hand9 = args.shift(); else hand9 = null;
    if (args.length > 0) hand10 = args.shift(); else hand10 = null;

    // console.log("top");
    // console.log("board");
    // console.log(board);
    // console.log("hand1");
    // console.log(hand1);
    // console.log("hand2");
    // console.log(hand2);


    if (!poker.validateCards(board)) {
        callback("Invalid Card in Board");
        return;
    }
    if (!poker.validateCards(hand1)) {
        callback("Invalid Card in Hand 1");
        return;
    }
    if (!poker.validateCards(hand2)) {
        callback("Invalid Card in Hand 2");
        return;
    }
    if (hand3 && !poker.validateCards(hand3)) {
        callback("Invalid Card in Hand 3");
        return;
    }
    if (hand4 && !poker.validateCards(hand4)) {
        callback("Invalid Card in Hand 4");
        return;
    }
    if (hand5 && !poker.validateCards(hand5)) {
        callback("Invalid Card in Hand 5");
        return;
    }
    if (hand6 && !poker.validateCards(hand6)) {
        callback("Invalid Card in Hand 6");
        return;
    }
    if (hand7 && !poker.validateCards(hand7)) {
        callback("Invalid Card in Hand 7");
        return;
    }
    if (hand8 && !poker.validateCards(hand8)) {
        callback("Invalid Card in Hand 8");
        return;
    }
    if (hand9 && !poker.validateCards(hand9)) {
        callback("Invalid Card in Hand 9");
        return;
    }
    if (hand10 && !poker.validateCards(hand10)) {
        callback("Invalid Card in Hand 10");
        return;
    }

    // valid Cards everywhere.
    var pockets = [];
    pockets.push(poker.convertCards(hand1));
    pockets.push(poker.convertCards(hand2));
    if (hand3)
        pockets.push(poker.convertCards(hand3));
    if (hand4)
        pockets.push(poker.convertCards(hand4));
    if (hand5)
        pockets.push(poker.convertCards(hand5));
    if (hand6)
        pockets.push(poker.convertCards(hand6));
    if (hand7)
        pockets.push(poker.convertCards(hand7));
    if (hand8)
        pockets.push(poker.convertCards(hand8));
    if (hand9)
        pockets.push(poker.convertCards(hand9));
    if (hand10)
        pockets.push(poker.convertCards(hand10));

    board = poker.convertCards(board);

    var cards = board;
    cards = cards.concat(pockets[0], pockets[1]);
    if (hand3)
        cards = cards.concat(pockets[2]);
    if (hand4)
        cards = cards.concat(pockets[3]);
    if (hand5)
        cards = cards.concat(pockets[4]);
    if (hand6)
        cards = cards.concat(pockets[5]);
    if (hand7)
        cards = cards.concat(pockets[6]);
    if (hand8)
        cards = cards.concat(pockets[7]);
    if (hand9)
        cards = cards.concat(pockets[8]);
    if (hand10)
        cards = cards.concat(pockets[9]);

    for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
            if (cards[i].name == cards[j].name && cards[i].suit == cards[j].suit) {
                callback("Invalid Deck -- Duplicate cards");
                return;
            }
        }
    }

    // console.log("-------------------------------------");

    var hands = [];
    for (var i = 0; i < pockets.length; i++) {
        hands.push(determineHand(board, pockets[i]));
    }

    var highHandNum = 0;
    var highHand = hands[0];
    var highHandVal = poker.evalHand(hands[0]);
    var highPockets = pockets[0];
    for (var i = 1; i < pockets.length; i++) {
        var ret = poker.compareHands(hands[highHandNum], hands[i]);
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
            highPockets = pockets[i];
        }
    }
    callback(null, highHandNum + 1, highHandVal, highHand);
}

function evalHand (board, player1, player2) {
    // No duplicates
    var hand1 = determineHand(board, player1);
    var hand2 = determineHand(board, player2);

    var ret = poker.compareHands(hand1, hand2);

    return ret;
}

function determineHand (board, pockets) {
    // console.log("board");
    // console.log(board);
    // console.log("pockets");
    // console.log(pockets);
    var cards = pockets.concat(board);
    // console.log(cards);
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
    evalHand: evalHand,
    determineHand: determineHand,
}