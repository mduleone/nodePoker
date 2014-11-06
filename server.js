"use strict";

var express = require("express");
var poker = require("./poker");
var holdem = require("./holdem");
var port = 8000;

var hands = ["High Card", "Pair", "Two Pair", "Set", "Straight", "Flush", "Full House", "Quads", "Straight Flush"]

var app = express();

// Allow Cross Origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/poker", function (req, res) {
    if (req.query.hand1 && req.query.hand2) {
        poker.determineWinner(req.query.hand1, req.query.hand2, function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    }
});

app.get("/holdem", function (req, res) {
    if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5 &&
        req.query.hand6 && req.query.hand7 && req.query.hand8 &&
        req.query.hand9 && req.query.hand10) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
            req.query.hand6,
            req.query.hand7,
            req.query.hand8,
            req.query.hand9,
            req.query.hand10,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5 &&
        req.query.hand6 && req.query.hand7 && req.query.hand8 &&
        req.query.hand9) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
            req.query.hand6,
            req.query.hand7,
            req.query.hand8,
            req.query.hand9,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5 &&
        req.query.hand6 && req.query.hand7 && req.query.hand8) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
            req.query.hand6,
            req.query.hand7,
            req.query.hand8,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5 &&
        req.query.hand6 && req.query.hand7) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
            req.query.hand6,
            req.query.hand7,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5 &&
        req.query.hand6) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
            req.query.hand6,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4 && req.query.hand5) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
            req.query.hand5,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3 && req.query.hand4) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
            req.query.hand4,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2 &&
        req.query.hand3) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
            req.query.hand3,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else if (req.query.board && req.query.hand1 && req.query.hand2) {
        holdem.pickWinner(
            req.query.board,
            req.query.hand1,
            req.query.hand2,
        function (err, winningHand, value, hand) {
            if (err) throw err;
            res.json({
                winningHand: winningHand,
                value: hands[value],
                hand: hand,
            });
        });
    } else {
        res.send("Invalid Endpoint!");
    }
});


app.listen(port);
