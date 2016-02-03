"use strict";

var express = require("express");
var cors = require("cors");
var poker = require("./poker");
var holdem = require("./holdem");
var path = require('path');
var port = 8000;

var HANDS = [
    "High Card",
    "Pair",
    "Two Pair",
    "Set",
    "Straight",
    "Flush",
    "Full House",
    "Quads",
    "Straight Flush",
];

var app = express();
    app.set('port', port || 8000);

// Allow Cross Origin
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use('/static', express.static(__dirname + '/public'));

app.get("/holdemAnalyzer", cors(), function (req, res) {
    res.sendFile(path.join(__dirname, 'public/holdemAnalyzer.html'));
});

app.get("/poker", cors(), function (req, res) {
    if (req.query.hand1 && req.query.hand2) {
        poker.determineWinner(null, req.query.hand1, req.query.hand2, function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: HANDS[value],
                hand: hand,
            });
        });
    }
});

app.get("/holdem", cors(), function (req, res) {
    if (!req.query.board) {
        return res.end("Please send a Board!");
    }

    var hands = {};
    if (req.query.hand1)
        hands.hand1 = req.query.hand1;
    if (req.query.hand2)
        hands.hand2 = req.query.hand2;
    if (req.query.hand3)
        hands.hand3 = req.query.hand3;
    if (req.query.hand4)
        hands.hand4 = req.query.hand4;
    if (req.query.hand5)
        hands.hand5 = req.query.hand5;
    if (req.query.hand6)
        hands.hand6 = req.query.hand6;
    if (req.query.hand7)
        hands.hand7 = req.query.hand7;
    if (req.query.hand8)
        hands.hand8 = req.query.hand8;
    if (req.query.hand9)
        hands.hand9 = req.query.hand9;
    if (req.query.hand10)
        hands.hand10 = req.query.hand10;

    if (Object.keys(hands).length >= 2) {
        holdem.pickWinner(null, req.query.board, hands, function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: HANDS[value],
                hand: hand,
            });
        });
    } else {
        return res.end("Please provide at least two hands!");
    }
});


app.listen(app.get('port'));
console.log('Poker server listening on port', app.get('port'));