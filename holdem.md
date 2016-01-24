# Hold'em Engine 

This file describes the Algorithms and defines the GameState Schema that the engine (dealer) will use to run the game.

## Algorithm

### New Hand
1. Set `GameState.playing`<sup>*</sup>
2. Set `GameState.board = []`
3. Set `GameState.deck = new shuffled deck`
4. Set `GameState.dealer`<sup>**</sup>
5. Get small & big blinds<sup>***</sup>
    + Set `GameState.action`
    + Set `GameState.lastRaiser`
    + Set `GameState.currentBets`
    + Set `GameState.pot`
6. Set `GameState.minBet = GameState.blinds.big`
7. Set `GameState.minRaise = 2 * GameState.minBet`
8. Deal Hands<sup>****</sup>

#### <sup>\*</sup>Set `GameState.playing`
```
for (player in GameState.players() {
    if (GameState.players[player].inNextHand) {
        GameState.playing.push(player.seat)
    }
}
```
#### <sup>\*\*</sup>Set `GameState.dealer`
```
// Assuming nothing fancy with the button
dealer = false
for (seatTest = (Number(dealer) + 1) % 10;
     seatTest != Number(dealer) || !dealer;
     seatTest = (seatTest + 1) % 10) {
    if (GameState.playing.indexOf(seatTest.toString()) != -1) {
        GameState.dealer = seatTest
        dealer = true
    }    
}
```

#### <sup>\*\*\*</sup>Get small & big blinds
```
// Assuming nothing fancy with blinds
var smallBlind = false;
var bigBlind = false;
var action = false;
if (GameState.playing.length > 2) {
    // Find first three positions left of the dealer that has a player playing
    for (seatTest = (Number(dealer) + 1) % 10;
         seatTest != Number(dealer) || !(smallBlind && bigBlind && action);
         seatTest = (seatTest + 1) % 10) {
        if (GameState.playing.indexOf(seatTest.toString()) != -1) {
            stack = GameState.players[seatTest].stack
            if (bigBlind) {
                GameState.action = seatTest
                action = true
            } else if (smallBlind) {
                paying = min(stack, GameState.blinds.big)
                GameState.pot += paying
                stack -= paying
                GameState.currentBets[seatTest] = paying
                GameState.lastRaiser = seatTest
                bigBlind = true
            } else {
                paying = min(stack, GameState.blinds.small)
                stack -= paying
                GameState.pot += paying
                GameState.currentBets[seatTest] = paying
                smallBlind = true
            }
            GameState.players[seatTest].stack = stack
        }
    }
} else {
    // Dealer is always small blind
    stack = GameState.players[dealer].stack
    paying = min(stack, GameState.blinds.small)
    GameState.currentBets[dealer] = paying
    GameState.pot += paying
    GameState.players[dealer].stack -= paying
    GameState.action = dealer
    smallBlind = true

    // Find next dude
    for (seatTest = (Number(dealer) + 1) % 10;
         seatTest != Number(dealer) || !bigBlind;
         seatTest = (seatTest + 1) % 10) {
        if (GameState.playing.indexOf(seatTest.toString()) != -1) {
            stack = GameState.players[seatTest].stack
            paying = min(stack, GameState.blinds.big)
            stack -= paying
            GameState.currentBets[seatTest] = paying
            GameState.lastRaiser = seatTest
            bigBlind = true
            GameState.players[seatTest].stack = stack
        }
    }
}
```

#### <sup>\*\*\*\*</sup>Deal Hands
```
Assign hands
    Construct a currentPlayers object
        Spin through GameState.playing, grab associated player from the GameState.players object
    Pass currentPlayers and deck to holdem.dealHand
    Replace GameState.players with players from result
    Replace GameState.deck with deck from result
```

### Preflop betting
```

```

### Postflop betting
```

```

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
    playing: ['0', '5',],
    deck: [ ... ]
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
