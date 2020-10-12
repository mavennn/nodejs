"use strict";

const readLine = require('readline');
const fs = require('fs');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});



const readLinePromise = (text) => {
    return new Promise((resolve, reject) => {
        rl.question(text, (result) => {
            if (!result) reject();
            resolve(result);
        })
    });
}

const writeToFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err) => {
            if (err) reject(err);

            resolve();
        })
    })
}


(async function main() {

    var rowsAmount = null;
    var resultArray = [];

    // считываем число - количество строк
    while (!rowsAmount) {
        try {
            let result = await readLinePromise('Enter number of lines: ');

            if (!isNaN(result)) {
                rowsAmount = result;
            }
        } catch (e) {

        }
    }

    if (rowsAmount && !isNaN(rowsAmount)) {
        
        for(let i = 0; i < rowsAmount; i++) {
            let data = await readLinePromise(`Enter ${i + 1}'s string: `);

            if (typeof(data) == 'string' && data.length % 2 == 0) {
                resultArray.push(data);
            }
        }
    }

    // записать в файл
    if (Array.isArray(resultArray)) {
        console.log(JSON.stringify(resultArray));
        writeToFile('result.txt', JSON.stringify(resultArray))
            .then(() => {
                process.exit(1);
            })
            .catch(err => console.log(err))
    }


})();
