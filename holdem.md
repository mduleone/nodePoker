# Hold'em Engine 

This file describes the Algorithms and defines the GameState Schema that the engine (dealer) will use to run the game.

## Algorithms

### Play
1. Set `GameState.gameData.playing`<sup>\*</sup>
2. Set `GameState.gameData.board = []`
3. Set `GameState.deck = new shuffled deck`
4. Set `GameState.gameData.dealer`<sup>\*\*</sup>
5. Get small & big blinds<sup>\*\*\*</sup>
    + Set `GameState.gameData.action`
    + Set `GameState.gameData.currentBets`
    + Set `GameState.gameData.pot`
6. Set `GameState.gameData.lastRaiser = null`
7. Set `GameState.gameData.minBet = GameState.gameData.blinds.big`
8. Set `GameState.gameData.minRaise = 2 * GameState.gamteData.minBet`
9. Deal Hands<sup>\*\*\*\*</sup>
10. Run round of betting<sup>\*\*\*\*\*</sup>
11. if `GameState.gameData.playing.length <= 1` Go to `18` else Deal Flop
12. Run round of betting
13. if `GameState.gameData.playing.length <= 1` Go to `18` else Deal Turn
14. Run round of betting
15. if `GameState.gameData.playing.length <= 1` Go to `18` else Deal River
16. Run round of betting
17. if `GameState.gameData.playing.length <= 1` Go to `18` else Determine Winner
18. Pay winner `GameState.gameData.pot` and Go to `1`.

#### <sup>\*</sup>Set `GameState.gameData.playing`
``` javascript
for (player in GameState.players) {
    if (GameState.players[player].inNextHand) {
        GameState.gameData.playing.push(player.seat);
    }
}
```
#### <sup>\*\*</sup>Set `GameState.gameData.dealer`
``` javascript
// Assuming nothing fancy with the button
var dealer = false;
for (seatTest = (Number(GameState.gameData.dealer) + 1) % 10;
     seatTest != Number(GameState.gameData.dealer) || !dealer;
     seatTest = (seatTest + 1) % 10) {
    if (GameState.gameData.playing.indexOf(seatTest.toString()) != -1) {
        GameState.gameData.dealer = seatTest;
        dealer = true;
    }    
}
```

#### <sup>\*\*\*</sup>Get small & big blinds
``` javascript
// Assuming nothing fancy with blinds
var smallBlind = false;
var bigBlind = false;
var action = false;
var stack;
var seatTest;
var paying;
if (GameState.gameData.playing.length > 2) {
    // Find first three positions left of the dealer that has a player playing
    for (seatTest = (Number(GameState.gameData.dealer) + 1) % 10;
         seatTest != Number(GameState.gameData.dealer) || !(smallBlind && bigBlind && action);
         seatTest = (seatTest + 1) % 10) {
        if (GameState.gameData.playing.indexOf(seatTest.toString()) != -1) {
            stack = GameState.players[seatTest].stack;
            if (bigBlind) {
                GameState.gameData.action = seatTest;
                action = true;
            } else if (smallBlind) {
                paying = Math.min(stack, GameState.gameData.blinds.big);
                GameState.gameData.pot += paying;
                stack -= paying;
                GameState.gameData.currentBets[seatTest] = paying;
                bigBlind = true;
            } else {
                paying = Math.min(stack, GameState.gameData.blinds.small);
                stack -= paying;
                GameState.gameData.pot += paying;
                GameState.gameData.currentBets[seatTest] = paying;
                smallBlind = true;
            }
            GameState.players[seatTest].stack = stack;
        }
    }
} else {
    // Dealer is always small blind
    stack = GameState.players[GameState.gameData.dealer].stack;
    paying = Math.min(stack, GameState.gameData.blinds.small);
    GameState.gameData.currentBets[GameState.gameData.dealer] = paying;
    GameState.gameData.pot += paying;
    GameState.players[GameState.gameData.dealer].stack -= paying;
    GameState.gameData.action = GameState.gameData.dealer;
    smallBlind = true;

    // Find other player
    for (seatTest = (Number(GameState.gameData.dealer) + 1) % 10;
         seatTest != Number(GameState.gameData.dealer) || !bigBlind;
         seatTest = (seatTest + 1) % 10) {
        if (GameState.gameData.playing.indexOf(seatTest.toString()) != -1) {
            stack = GameState.players[seatTest].stack;
            paying = Math.min(stack, GameState.gameData.blinds.big);
            stack -= paying;
            GameState.gameData.currentBets[seatTest] = paying;
            bigBlind = true;
            GameState.players[seatTest].stack = stack;
        }
    }
}
```

#### <sup>\*\*\*\*</sup>Deal Hands
```
Assign hands
    Construct a currentPlayers object
        Spin through GameState.gameData.playing, grab associated player from the GameState.players object
    Pass currentPlayers and deck to holdem.dealHand
    Replace GameState.players with players from result
    Replace GameState.deck with deck from result
```

#### <sup>\*\*\*\*\*</sup> Round of betting
* While `GameState.gameData.action != GameState.gameData.lastRaiser
    1. `playerResponse = getPlayerAction(GameState.gameData, GameState.players[action])`
        + `playerResponse` will be one of fold, check, bet, call, raise
    2. `handlePlayerResponse = handlePlayerAction(playerResponse, GameState)`
        + if (bet/call/raise && GameState.gameData.lastRaiser == null) GameState.gameData.lastRaiser = GameState.gameData.actiion
    3. `GameState = handlePlayerResponse`

##Schema

### GameState
```
{players, playing, board, deck, dealer, action, blinds, minBet, minRaise, lastRaiser, currentBets, pot,}
```

Example
```
{
    players: {
        '0': {
            id: 0,
            name: 'RiverBitch'.
            seat: 0,
            hand: ['As', 'Qs',],
            stack: 1500,
            inNextHand: true,
            canBeDealer: true,
            bank: 1000000,
        },
        '1': {
            id: 1,
            name: 'SirFoldsAlot',
            seat: 1,
            hand: null,
            stack: 1500,
            inNextHand: true,
            canBeDealer: true,
            bank: 1000000,
        },
        '5': {
            id: 2,
            name: 'KoJack',
            seat: 5,
            hand: ['Kc', 'Jd',],
            stack: 1500,
            inNextHand: true,
            canBeDealer: true,
            bank: 1000000,
        },
    },
    deck: [ ... ],
    gameData: {
        playing: ['0', '5',],
        board: ['Ks', 'Js', 'Jc', '5d', 'Ts',],
        dealer: 0,
        action: 1,
        blinds: {
            small: 2,
            big: 5,
        },
        minBet: 0,
        minRaise: 5,
        lastRaiser: 1,
        currentBets: {
            '0': 0,
            '5': 0,
        },
        pot: 20,
    },
}
```

### Player
```
{id, name, seat, hand, stack, inNextHand, canBeDealer, bank,}
```

Example
```
{
    id: 0,
    name: 'RiverBitch'.
    seat: 0,
    hand: ['As', 'Qs',],
    stack: 1500,
    inNextHand: true,
    canBeDealer: true,
    bank: 1000000,
}
```

### GameData
```
{playing, board, dealer, action, blinds, minBet, minRaise, lastRaiser, currentBets, pot,}
```

Example
```
{
    playing: ['0', '5',],
    board: ['Ks', 'Js', 'Jc', '5d', 'Ts',],
    dealer: 0,
    action: 1,
    blinds: {
        small: 2,
        big: 5,
    },
    minBet: 0,
    minRaise: 5,
    lastRaiser: 1,
    currentBets: {
        '0': 0,
        '5': 0,
    },
    pot: 20,
},
```