"use strict";

const fs = require('fs');

const readFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) reject(err);

            resolve(data);
        })
    })
}

const writeToFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err) => {
            if (err) reject(err);

            resolve();
        })
    })
}

/**
 * возвращает true если символ - гласная
 * @param {*} char 
 */
function isVowelRegEx(char) {
  if (char.length == 1) {
    return /[aeiou]/.test(char);
  }
}

const firstObj = {
    alex: "darkStralker"
};

const secondObj = {
    aaa: "aaaaa"
};

const thirdObj = {
    "sdfsdf": "1ffsdf"
};

const isAllVowels = (string) => {
    for(let s of string) {
        if (!isVowelRegEx(s)) return false;
    }
    return true;
}

(async function main() {
 
    let str = JSON.stringify(firstObj) + "," + JSON.stringify(secondObj) + "," + JSON.stringify(thirdObj);

    // записываем в файл
    try {
        await writeToFile('second.txt', str)
    } catch (err) {
        console.log(err);
    }

    try {

        let data = await readFilePromise('second.txt');

        if (!data || data == ''){
            throw new Error('file is empty');
        }

        data.split(",").map(string => {
            try {
                let obj = JSON.parse(string);
                for (let prop in obj) {
                    if (isAllVowels(prop.toString()) && isAllVowels(obj[prop].toString())) {
                        console.log(JSON.stringify(obj));
                    }
                }
            } catch (e) {
                console.log(e);
            }
        })


    } catch (err) {
        console.log(err);
    }
})()

