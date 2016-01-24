"use strict";

var poker = require("./poker");
var utils = require("./poker-utils");

function pickWinner (err, board, hands, callback) {

    // Validate Cards
    if (!poker.validateCards(board)) {
        callback("Invalid Card in Board");
        return "Invalid Card in Board";
    }
    for (var hand in hands) {
        if (!poker.validateCards(hands[hand])) {
            callback("Invalid Card in " + hand);
            return "Invalid Card in " + hand;
        }
    }

    // Convert Cards
    board = poker.convertCards(board);

    var pockets = [];
    for (var hand in hands) {
        pockets.push([hand, poker.convertCards(hands[hand])]);
    }

    // Check for duplicates
    var cards = board;
    for (var i = 0; i < pockets.length; i++) {
        cards = cards.concat(pockets[i][1]);
    }

    for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
            if (cards[i].name == cards[j].name && cards[i].suit == cards[j].suit) {
                callback("Invalid Deck -- Duplicate cards");
                return "Invalid Deck -- Duplicate cards";
            }
        }
    }

    // Determine all hands
    var allHands = [];
    for (var i = 0; i < pockets.length; i++) {
        var allCards = board.concat(pockets[i][1]);
        allHands.push(poker.determineHighHand(allCards));
    }

    // Compare hands, find a winner
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
            return ret.err;
        }
        if (ret.winner == 2) {
            highHandNum = i;
            highHandVal = ret.handVal;
            highHand = ret.hand;
            highPockets = pockets[i][1];
        }
    }

    callback(null, pockets[highHandNum][0], highHandVal, highHand);
    return {
        error: null,
        highHandCards: highHand,
        highHandString: pockets[highHandNum][0],
        handValue: highHandVal,
    };
}

function dealHand(players, deck) {
    for (var i in players) {
        players[i].hand = [];
    }
    for (i = 0; i < 2; i++) {
        for (var j in players) {
            players[j].hand.push(deck.shift());
        }
    }

    return {
        players: players,
        deck: deck,
    };
}

function dealStreet(board, deck) {
    if (board.length == 0) {
        deck.shift();
        for (var i = 0; i < 3; i++) {
            board.push(deck.shift());
        }
    } else if (board.length == 3 || board.length == 4) {
        deck.shift();
        board.push(deck.shift());
    } else {
        return {
            board: board,
            deck: deck
        };
    }

    return {
        board: board,
        deck: deck
    };
}
/**
 * Object Definitions:
 * GameState
 * {players, playing, board, deck, dealer, action, blinds, minBet, minRaise, lastRaiser, currentBets, pot,}
 *
 * Players
 * {id, name, seat, hand, stack, inNextHand, canBeDealer, bank,}
 *
 * {
 *     players: {
 *         '0': {
 *             id: 0,
 *             name: 'RiverBitch'.
 *             seat: 0,
 *             hand: ['As', 'Qs',],
 *             stack: 1500,
 *             inNextHand: true,
 *             canBeDealer: true,
 *             bank: 1000000,
 *         },
 *         '1': {
 *             id: 1,
 *             name: 'SirFoldsAlot',
 *             seat: 1,
 *             hand: null,
 *             stack: 1500,
 *             inNextHand: true,
 *             canBeDealer: true,
 *             bank: 1000000,
 *         },
 *         '5': {
 *             id: 2,
 *             name: 'KoJack',
 *             seat: 5,
 *             hand: ['Kc', 'Jd',],
 *             stack: 1500,
 *             inNextHand: true,
 *             canBeDealer: true,
 *             bank: 1000000,
 *         },
 *     },
 *     playing: [0, 5,],
 *     deck: [ ... ]
 *     board: ['Ks', 'Js', 'Jc', '5d', 'Ts',],
 *     dealer: 0,
 *     action: 1,
 *     blinds: {
 *         small: 2,
 *         big: 5,
 *     },
 *     minBet: 0,
 *     minRaise: 5,
 *     lastRaiser: 1,
 *     currentBets: {
 *         '0': 0,
 *         '5': 0,
 *     },
 *     pot: 20,
 * }
 */
function makeDecision(gameState) {

}

module.exports = {
    pickWinner: pickWinner,
    dealHand: dealHand,
    dealStreet: dealStreet,
}
