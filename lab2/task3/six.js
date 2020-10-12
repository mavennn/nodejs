"use strict";

let obj = {};
let i = 0;

function createRec(resultingObj) {

    if (!resultingObj["prop"]) {
        resultingObj["prop"] = {};
        i++;
    }

    createRec(resultingObj["prop"]);
}

try {
    createRec(obj);
} catch (e) {
    console.log(i);
}