function randInt(min, max) {
    if (typeof max === 'undefined') {
        var max = min--;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}

var shuffle = function (array) {
    for (var i = 0; i < array.length; i++) {
        var j = randInt(i);
        var hold = array[i];
        if (j != i) {
            array[i] = array[j];
        }
        array[j] = hold;
    }
    return array;
}

module.exports = shuffle;