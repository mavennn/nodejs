"use strict";

let obj = {
    first: {
        first1: {
            first2: {
                first3: {}
            }
        }
    },
    second: {
        second1: {
            second2: {}
        }
    },
    third: {
        third1: {}
    }
}

let resultObj = {};
let depth = 0;

function recursive(obj) {
    console.log(JSON.stringify(obj, null, ' '))
    for(let prop in obj) {
        if (typeof(obj[prop]) == 'object') {
            recursive(obj[prop]);
        }
    }
}

recursive(obj);