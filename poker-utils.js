"use strict";

const shuffle = require('./shuffle');
const cards = [
    'As', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks',
    'Ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd',
    'Ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc',
    'Ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh',
];

function newDeck() {
    return shuffle(cards.slice());
}

function drawCards(numCards, deck) {
    const draw = [];
    for (let i = 0; i < numCards; i++) {
        draw.push(deck.shift());
    }

    return {
        deck: deck,
        draw: draw,
    };
}

function existInHand(card, hand) {
    if (hand.indexOf(card) > -1) {
        return true;
    }

    return false;
}

function convertCardToEmoji(card) {
    let rank = card.slice(0, 1);
    let suit = card.slice(1, 2);

    if (rank === 'T') {
        rank = '10';
    }

    if (suit === 's') {
        suit = '♠️';
    } else if (suit === 'd') {
        suit = '♦️';
    } else if (suit === 'c') {
        suit = '♣️';
    } else if (suit === 'h') {
        suit = '♥️';
    }

    return `${rank}${suit}`;
}

function convertHandToEmoji(hand) {
    return hand.map(convertCardToEmoji).join('');
}

function convertCardToSpeech(card) {
    let rank = card.slice(0, 1);
    let suit = card.slice(1, 2);

    if (rank === 'A') {
        rank = 'Ace';
    }
    if (rank === 'K') {
        rank = 'King';
    }
    if (rank === 'Q') {
        rank = 'Queen';
    }
    if (rank === 'J') {
        rank = 'Jack';
    }
    if (rank === 'T') {
        rank = '10';
    }

    if (suit === 's') {
        suit = 'spades'
    } else if (suit === 'd') {
        suit = 'diamonds'
    } else if (suit === 'c') {
        suit = 'clubs'
    } else if (suit === 'h') {
        suit = 'hearts'
    }

    return `${rank} of ${suit}`;
}

function convertHandToSpeech(hand) {
    return hand.map(convertCardtoSpeech).join(', ');
}

module.exports = {
    newDeck: newDeck,
    drawCards: drawCards,
    existInHand: existInHand,
    convertCardToEmoji: convertCardToEmoji,
    convertHandToEmoji: convertHandToEmoji,
    convertCardToSpeech: convertCardToSpeech,
    convertHandToSpeech: convertHandToSpeech,
};
