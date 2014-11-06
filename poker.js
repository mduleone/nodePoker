"use strict";

var STRAIGHTFLUSH = 8;
var QUADS = 7;
var FULLHOUSE = 6;
var FLUSH = 5;
var STRAIGHT = 4;
var SET = 3;
var TWOPAIR = 2;
var PAIR = 1;
var HIGHCARD = 0;

function determineWinner (player1, player2, callback) {
    if (player1.length != 10 ||
        !validateCards(player1)) {
        callback("Invalid Hand for Player 1");
        return;
    }
    if (player2.length != 10 || 
        !validateCards(player2)) {
        callback("Invalid Hand for Player 2");
        return;
    }

    var hand1 = convertCards(player1);
    var hand2 = convertCards(player2);

    var hands = hand1.concat(hand2);

    for (var i = 0; i < 10; i++) {
        for (var j = i + 1; j < 10; j++) {
            if (hands[i].name == hands[j].name && hands[i].suit == hands[j].suit) {
                callback ("Invalid Deck -- Duplicate cards");
                return;
            }
        }
    }

    var ret = compareHands(hand1, hand2);
    callback(ret.err, ret.winner, ret.handVal, ret.hand);
}

function compareHands (hand1, hand2) {
    // Two Valid Hands.
    var hand1Val = evalHand(hand1);
    var hand2Val = evalHand(hand2);
    
    if (hand1Val > hand2Val) {
        return {err: null,
                winner: 1,
                handVal: hand1Val,
                hand: hand1
            };
    } else if (hand1Val < hand2Val) {
        return {
            err: null,
            winner:  2,
            handVal: hand2Val,
            hand: hand2
        };
    }

    // Two hands are identically valued, now must compare hands.
    var winningHand = null;
    switch (hand1Val) {
        case HIGHCARD:
            winningHand = compareHighCard(hand1, hand2);
            break;
        case PAIR:
            winningHand = comparePair(hand1, hand2);
            break;
        case TWOPAIR:
            winningHand = compareTwoPair(hand1, hand2);
            break;
        case SET:
            winningHand = compareSet(hand1, hand2);
            break;
        case STRAIGHT:
            winningHand = compareStraight(hand1, hand2);
            break;
        case FLUSH:
            winningHand = compareHighCard(hand1, hand2);
            break;
        case FULLHOUSE:
            winningHand = compareFullHouse(hand1, hand2);
            break;
        case QUADS:
            winningHand = compareQuads(hand1, hand2);
            break;
        case STRAIGHTFLUSH:
            winningHand = compareStraight(hand1, hand2);
            break;
    }
    if (winningHand == 0) {
        return {
            err: null,
            winner: 0,
            handVal: hand1Val,
            hand: hand1
        };
    } else if (winningHand == 1) {
        return {
            err: null,
            winner: 1,
            handVal: hand1Val,
            hand: hand1
        };
    } else {
        return {
            err: null,
            winner: 2,
            handVal: hand2Val,
            hand: hand2
        };
    }

}

function compareHighCard (hand1, hand2) {
    if (hand1[4].high > hand2[4].high)
        return 1;
    if (hand1[4].high < hand2[4].high)
        return 2;
    if (hand1[3].high > hand2[3].high)
        return 1;
    if (hand1[3].high < hand2[3].high)
        return 2;
    if (hand1[2].high > hand2[2].high)
        return 1;
    if (hand1[2].high < hand2[2].high)
        return 2;
    if (hand1[1].high > hand2[1].high)
        return 1;
    if (hand1[1].high < hand2[1].high)
        return 2;
    if (hand1[0].high > hand2[0].high)
        return 1;
    if (hand1[0].high < hand2[0].high)
        return 2;
    return 0;
}

function comparePair (hand1, hand2) {
    var pair1 = 0;
    var high1 = 0;
    var med1 = 0;
    var low1 = 0;
    var pair2 = 0;
    var high2 = 0;
    var med2 = 0;
    var low2 = 0;

    if (hand1[0].name == hand1[1].name) {
        pair1 = hand1[0].high;
        high1 = hand1[4].high;
        med1 = hand1[3].high;
        low1 = hand1[2].high;
    } else if (hand1[1].name == hand1[2].name) {
        pair1 = hand1[1].high;
        high1 = hand1[4].high;
        med1 = hand1[3].high;
        low1 = hand1[0].high;
    } else if (hand1[2].name == hand1[3].name) {
        pair1 = hand1[2].high;
        high1 = hand1[4].high;
        med1 = hand1[1].high;
        low1 = hand1[0].high;
    } else if (hand1[3].name == hand1[4].name) {
        pair1 = hand1[3].high;
        high1 = hand1[2].high;
        med1 = hand1[1].high;
        low1 = hand1[0].high;
    }

    if (hand2[0].name == hand2[1].name) {
        pair2 = hand2[0].high;
        high2 = hand2[4].high;
        med2 = hand2[3].high;
        low2 = hand2[2].high;
    } else if (hand2[1].name == hand2[2].name) {
        pair2 = hand2[1].high;
        high2 = hand2[4].high;
        med2 = hand2[3].high;
        low2 = hand2[0].high;
    } else if (hand2[2].name == hand2[3].name) {
        pair2 = hand2[2].high;
        high2 = hand2[4].high;
        med2 = hand2[1].high;
        low2 = hand2[0].high;
    } else if (hand2[3].name == hand2[4].name) {
        pair2 = hand2[3].high;
        high2 = hand2[2].high;
        med2 = hand2[1].high;
        low2 = hand2[0].high;
    }

    if (pair1 > pair2) {
        return 1;
    } else if (pair1 < pair2) {
        return 2;
    } else if (high1 > high2) {
        return 1;
    } else if (high1 < high2) {
        return 2;
    } else if (med1 > med2) {
        return 1;
    } else if (med1 < med2) {
        return 2;
    } else if (low1 > low2) {
        return 1;
    } else if (low1 < low2) {
        return 2;
    } else {
        return 0;
    }
}

function compairTwoPair (hand1, hand2) {
    var hipair1 = 0;
    var lopair1 = 0;
    var high1 = 0;
    var hipair2 = 0;
    var lopair2 = 0;
    var high2 = 0;

    if (hand1[0].name == hand1[1].name &&
        hand1[2].name == hand1[3].name) {
        hipair1 = hand1[2].high;
        lopair1 = hand1[0].high;
        high1 = hand1[4].high;
    } else if (hand1[0].name == hand1[1].name &&
               hand1[3].name == hand1[4].name) {
        hipair1 = hand1[3].high;
        lopair1 = hand1[0].high;
        high1 = hand1[2].high;
    } else if (hand1[1].name == hand1[2].name &&
               hand1[3].name == hand1[4].name) {
        hipair1 = hand1[3].high;
        lopair1 = hand1[1].high;
        high1 = hand1[0].high;
    }

    if (hand2[0].name == hand2[1].name &&
        hand2[2].name == hand2[3].name) {
        hipair2 = hand2[2].high;
        lopair2 = hand2[0].high;
        high2 = hand2[4].high;
    } else if (hand2[0].name == hand2[1].name &&
               hand2[3].name == hand2[4].name) {
        hipair2 = hand2[3].high;
        lopair2 = hand2[0].high;
        high2 = hand2[2].high;
    } else if (hand2[1].name == hand2[2].name &&
               hand2[3].name == hand2[4].name) {
        hipair2 = hand2[3].high;
        lopair2 = hand2[1].high;
        high2 = hand2[0].high;
    }

    if (hipair1 > hipair2) {
        return 1;
    } else if (hipair1 < hipair2) {
        return 2;
    } else if (lopair1 > lopair2) {
        return 1;
    } else if (lopair1 < lopair2) {
        return 2;
    } else if (high1 > high2) {
        return 1;
    } else if (high1 < high2) {
        return 2;
    } else {
        return 0;
    }
}

function compareSet (hand1, hand2) {
    var set1 = 0;
    var high1 = 0;
    var low1 = 0;
    var set2 = 0;
    var high2 = 0;
    var low2 = 0;

    if (hand1[0].name == hand1[2].name) {
        set1 = hand1[0].high;
        high1 = hand1[4].high;
        low1 = hand1[3].high;
    } else if (hand1[1].name == hand1[3].name) {
        set1 = hand1[1].high;
        high1 = hand1[4].high;
        low1 = hand1[0].high;
    } else if (hand1[2].name == hand1[4].name) {
        set1 = hand1[2].high;
        high1 = hand1[1].high;
        low1 = hand1[0].high;
    }

    if (hand2[0].name == hand2[2].name) {
        set2 = hand2[0].high;
        high2 = hand2[4].high;
        low2 = hand2[3].high;
    } else if (hand2[1].name == hand2[3].name) {
        set2 = hand2[1].high;
        high2 = hand2[4].high;
        low2 = hand2[0].high;
    } else if (hand2[2].name == hand2[4].name) {
        set2 = hand2[2].high;
        high2 = hand2[1].high;
        low2 = hand2[0].high;
    }

    if (set1 > set2) {
        return 1;
    } else if (set1 < set2) {
        return 2;
    } else if (high1 > high2) {
        return 1;
    } else if (high1 < high2) {
        return 2;
    } else if (low1 > low2) {
        return 1;
    } else if (low1 < low2) {
        return 2;
    } else {
        return 0;
    }
}

function compareStraight (hand1, hand2) {
    var hand1highDiff =  getHighDiff(hand1);
    var hand1lowDiff = getLowDiff(hand1);
    var hand2highDiff =  getHighDiff(hand2);
    var hand2lowDiff = getLowDiff(hand2);
    var hand1high = null;
    var hand2high = null;

    if (hand1lowDiff == 4 && hand1highDiff != 4) {
        hand1high = hand1[3].high;
    } else {
        hand1high = hand1[4].high;
    }
    if (hand2lowDiff == 4 && hand2highDiff != 4) {
        hand2high = hand2[3].high;
    } else {
        hand2high = hand2[4].high;
    }

    if (hand1high > hand2high) {
        return 1;
    } else if (hand1high < hand2high) {
        return 2;
    } else {
        return 0;
    }
}

function compareFullHouse (hand1, hand2) {
    var hand1set = null;
    var hand1pair = null;
    var hand2set = null;
    var hand2pair = null;

    if (hand1[0].name == hand1[2].name) {
        hand1set = hand1[0].high;
        hand1pair = hand1[3].high;
    } else {
        hand1set = hand1[2].high;
        hand1pair = hand1[0].high;
    }

    if (hand2[0].name == hand2[2].name) {
        hand2set = hand2[0].high;
        hand2pair = hand2[3].high;
    } else {
        hand2set = hand2[2].high;
        hand2pair = hand2[0].high;
    }

    if (hand1set > hand2set) {
        return 1;
    } else if (hand1set < hand2set) {
        return 2;
    } else if (hand1pair > hand2pair) {
        return 1;
    } else if (hand1pair < hand2pair) {
        return 2;
    } else {
        return 0;
    }
}

function compareQuads (hand1, hand2) {
    var hand1quad = null;
    var hand1high = null;
    var hand2quad = null;
    var hand2high = null;

    if (hand1[0].name == hand1[1].name) {
        hand1quad = hand1[0].high;
        hand1high = hand1[4].high;
    } else {
        hand1quad = hand1[1].high;
        hand1high = hand1[0].high;
    }

    if (hand2[0].name == hand2[1].name) {
        hand2quad = hand2[0].high;
        hand2high = hand2[4].high;
    } else {
        hand2quad = hand2[1].high;
        hand2high = hand2[0].high;
    }

    if (hand1quad > hand2quad) {
        return 1;
    } else if (hand1quad < hand2quad) {
        return 2;
    } else if (hand1high > hand2high) {
        return 1;
    } else if (hand1high < hand2high) {
        return 2;
    } else {
        return 0;
    }
}

function evalHand (hand) {
    if (evalStraightFlush(hand)) {
        return STRAIGHTFLUSH;
    } else if (evalQuads(hand)) {
        return QUADS;
    } else if (evalFullHouse(hand)) {
        return FULLHOUSE;
    } else if (evalFlush(hand)) {
        return FLUSH;
    } else if (evalStraight(hand)) {
        return STRAIGHT;
    } else if (evalSet(hand)) {
        return SET;
    } else if (evalTwoPair(hand)) {
        return TWOPAIR;
    } else if (evalPair(hand)) {
        return PAIR;
    } else {
        return HIGHCARD;
    }
}

function evalStraightFlush (hand) {
    if (!evalFlush(hand))
        return false;

    if (getHighDiff(hand) == 4 || getLowDiff(hand) == 4)
        return true;

    return false;
}

function evalQuads (hand) {
    if (hand[0].name == hand[3].name || hand[1].name == hand[4].name)
        return true;

    return false;
}

function evalFullHouse (hand) {
    if ((hand[0].name == hand[1].name && hand[2].name == hand[4].name) ||
        (hand[0].name == hand[2].name && hand[3].name == hand[4].name))
        return true;

    return false;
}

function evalFlush (hand) {
    var currSuit = hand[0].suit;
    for (var card = 1; card < 5; card++) {
        if (hand[card].suit != currSuit) {
            return false;
        }
    }
    return true;
}

function evalStraight (hand) {
    var highs = [];
    var lows = [];

    for (var i = 0; i < 5; i++) {
        highs.push(hand[i].high);
        lows.push(hand[i].low);
    }

    var highDiff = getHighDiff(hand);
    var lowDiff = getLowDiff(hand);

    if (lowDiff != 4 && highDiff != 4) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        for (var j = i + 1; j < 5; j++) {
            if (hand[i].name == hand[j].name) {
                return false;
            }
        }
    }

    return true;
}

function evalSet (hand) {
    if (hand[0].name == hand[2].name ||
        hand[1].name == hand[3].name ||
        hand[2].name == hand[4].name)
        return true;

    return false;
}

function evalTwoPair (hand) {
    if ((hand[0].name == hand[1].name && hand[2].name == hand[3].name) ||
        (hand[0].name == hand[1].name && hand[3].name == hand[4].name) ||
        (hand[1].name == hand[2].name && hand[3].name == hand[4].name))
        return true;

    return false;
}

function evalPair (hand) {
    for (var i = 0; i < 4; i++) {
        if (hand[i].name == hand[i + 1].name)
            return true;
    }

    return false;
}

function getHighDiff (hand) {
    var highs = [];
    for (var i = 0; i < 5; i++) {
        highs.push(hand[i].high);
    }
    return Math.max.apply(null, highs) - Math.min.apply(null, highs);
}

function getLowDiff (hand) {
    var lows = [];
    for (var i = 0; i < 5; i++) {
        lows.push(hand[i].low);
    }
    return Math.max.apply(null, lows) - Math.min.apply(null, lows);
}

function convertCards (cardsStr) {
    var cards = [];
    var card = "";
    var len = cardsStr.length
    for (var i = 0; i < len/2; i++) {
        card = cardsStr.slice(0,2);
        cardsStr = cardsStr.slice(2);
        cards[i] = convertCard(card);
    }
    cards.sort(function (a, b) {
        if (a.high < b.high) {
            return -1;
        } else if (a.high > b.high) {
            return 1;
        } else {
            return 0;
        }
    });
    return cards;
}

function convertCard (cardStr) {
    var rank = cardStr.slice(0,1);
    var suit = cardStr.slice(1,2);
    var card = null;
    switch (rank) {
        case "A":
        case "a":
            card = {
                high: 14,
                low: 1,
                name: "Ace",
            };
            break;
        case "K":
        case "k":
            card = {
                high: 13,
                low: 13,
                name: "King",
            };
            break;
        case "Q":
        case "q":
            card = {
                high: 12,
                low: 12,
                name: "Queen",
            };
            break;
        case "J":
        case "j":
            card = {
                high: 11,
                low: 11,
                name: "Jack",
            };
            break;
        case "T":
        case "t":
            card = {
                high: 10,
                low: 10,
                name: "10",
            };
            break;
        default:
            card = {
                high: Number(rank),
                low: Number(rank),
                name: rank,
            };
            break;
    }
    card.suit = suit.toUpperCase();
    return card;
}

function validateCards (hand) {
    if (hand.length % 2 != 0) {
        return false;
    }

    var card = null;
    var len = hand.length;
    for (var i = 0; i < len/2; i++) {
        card = hand.slice(0,2);
        hand = hand.slice(2);
        if (!validateCard(card))
            return false;
    }

    return true;
}

function validateCard (card) {
    return card.match(/^[23456789TJQKAtjqka][sdchSDCH]$/);
}

module.exports = {
    determineWinner: determineWinner,
    compareHands: compareHands,
    evalHand: evalHand,
    validateCards: validateCards,
    validateCard: validateCard,
    convertCards: convertCards,
    convertCard: convertCard,
}