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

const readFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

(async function main() {

    var filesAmount = null;
    var result = '';

    // считываем число - количество файлов
    while (!filesAmount) {
        try {
            let result = await readLinePromise('Enter number of files: ');

            if (!isNaN(result)) {
                filesAmount = result;
            }

        } catch (e) {
            console.log(e);
        }
    }


    /*
        /Users/gadoevalex/Desktop/study/nodejs/task3/result.txt
        /Users/gadoevalex/Desktop/study/nodejs/task3/five.js
        /Users/gadoevalex/Desktop/study/nodejs/task3/second.txt
    */

    if (filesAmount&& !isNaN(filesAmount)) {
        for(let i = 0; i < filesAmount; i++) {
            let fileName = await readLinePromise(`Enter ${i + 1}'s file: `);

            // считываем содержимое файла и конкатенируем
            result += await readFilePromise(fileName);
        }
    }

    // записать в файл
    writeToFile('five.txt', result)
        .then(() => {
            process.exit(1);
        })
        .catch(err => console.log(err))


})();
