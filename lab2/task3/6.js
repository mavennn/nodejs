"use strict"

var count = 1;
var obj = { prop: 'prop' };
var string = '';

while (true) {
        try {
                string = JSON.stringify(obj);
                obj = { 'prop': { ...obj } };
                count++;
        } catch (e) {
                console.log(e);
                console.log(`Result is ${count}`);
                break;
        }
}
