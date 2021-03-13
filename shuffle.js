function randInt(min, max) {
    if (typeof max === 'undefined') {
        max = min - 1;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const j = randInt(i);
        const hold = array[i];
        if (j !== i) {
            array[i] = array[j];
        }
        array[j] = hold;
    }
    return array;
}

module.exports = shuffle;