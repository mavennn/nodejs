
var i = 1;
const ONE_SECOND = 1000;
const TWO_SECONDS = 2000;

function controlCounter () {
    i++;

    if (i == 12) {
        clearInterval(intv);
        intv = getInterval(ONE_SECOND);
    }

    if (i == 21) {
        i = 1;
        clearInterval(intv);
        intv = getInterval(TWO_SECONDS);
    }
}

const getInterval = (time) => setInterval(() => {
    console.log(i);
    controlCounter();
}, time);

var intv = getInterval(TWO_SECONDS);