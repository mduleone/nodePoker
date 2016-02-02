var deck = [
    ['As', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks',],
    ['Ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd',],
    ['Ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc',],
    ['Ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh',],
];

function rebuildSelector(exclude) {
    if (typeof exclude === 'undefined') {
        exclude = [];
    }

    var selector = $('#cardSelector');
    selector.children().remove();
    for (var i = 0; i < deck.length; i++) {
        var hand = $(document.createElement('ul')).addClass('hand');
        
        for (var j = 0; j < deck[i].length; j++) {
            if (exclude.indexOf(deck[i][j]) === -1) {
                var classes = deck[i][j].split('');
                var classes = _.map(classes, rankToRank);
                var classes = _.map(classes, suitToSuit);
                var card = $(document.createElement('li')).addClass('card ' + classes.join(' '));

                var rank = $(document.createElement('span'));
                var rankConversion = rankToRank(classes[0]);
                rank.addClass('rank').text(rankConversion === 'T' ? '10' : rankConversion);
                var suit = $(document.createElement('span'));

                suit.addClass('suit').html('&' + classes[1] + ';');
                card.append(rank);
                card.append(suit);
                hand.append(card);
            }
        }
        selector.append(hand);
    }

    $('#cardSelector li').on('click', clickCard);
}

$('#cardSelector li').on('click', clickCard);

function clickCard(e) {
    var target = $(e.delegateTarget).clone();

    if ($($('#holdem .hand1').children()[0]).hasClass('empty')){
        $('#holdem .hand1').children().remove();
    }
    $('#holdem .hand1').append(target);
    target.on('click', deleteCard);

    var cardVal = getCard($(e.delegateTarget)[0]);

    $(e.delegateTarget).remove();
    console.log(cardVal);
}

function deleteCard(e) {
    $(e.delegateTarget).remove();
    var hand = [];
    for (var i in $('#holdem .hand1').children()) {
        hand.push(getCard($('#holdem .hand1').children()[i]));
    }
    rebuildSelector(hand);
    if (!$('#holdem .hand1').children().length) {
        $('#holdem .hand1').append($(document.createElement('li')).addClass('empty back card'));
    }
}

function getCard(card) {
    var target = card;
    
    var card = target.classList;

    card = _.map(card, rankToRank);
    card = _.map(card, suitToSuit);
    card.shift();
    card = card.join('');
    return card;
};

function rankToRank(rank) {
    switch (rank) {
        case 'rank-a':
            return 'A';
        case 'rank-2':
            return '2';
        case 'rank-3':
            return '3';
        case 'rank-4':
            return '4';
        case 'rank-5':
            return '5';
        case 'rank-6':
            return '6';
        case 'rank-7':
            return '7';
        case 'rank-8':
            return '8';
        case 'rank-9':
            return '9';
        case 'rank-10':
            return 'T';
        case 'rank-j':
            return 'J';
        case 'rank-q':
            return 'Q';
        case 'rank-k':
            return 'K';
        case 'A':
            return 'rank-a';
        case '2':
            return 'rank-2';
        case '3':
            return 'rank-3';
        case '4':
            return 'rank-4';
        case '5':
            return 'rank-5';
        case '6':
            return 'rank-6';
        case '7':
            return 'rank-7';
        case '8':
            return 'rank-8';
        case '9':
            return 'rank-9';
        case 'T':
            return 'rank-10';
        case 'J':
            return 'rank-j';
        case 'Q':
            return 'rank-q';
        case 'K':
            return 'rank-k';
        default:
            return rank;
    }
};

function suitToSuit(suit) {
    switch (suit) {
        case 'spades':
            return 's';
        case 'diams':
            return 'd';
        case 'clubs':
            return 'c';
        case 'hearts':
            return 'h';
        case 's':
            return 'spades';
        case 'd':
            return 'diams';
        case 'c':
            return 'clubs';
        case 'h':
            return 'hearts';
        default:
            return suit;
    }
};