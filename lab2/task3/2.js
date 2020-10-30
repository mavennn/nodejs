"use strict";

const fs = require('fs');

const DATA_DIRECTORY = "/Users/gadoevalex/Desktop/evm/lab2/task3/data/"

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
 
    let str = JSON.stringify({ array: [firstObj, secondObj, thirdObj] })

    // записываем в файл
    try {
        await writeToFile(DATA_DIRECTORY + 'second.txt', str)
    } catch (err) {
        console.log(err);
    }

    try {

        let dataString = await readFilePromise(DATA_DIRECTORY + '2_result.txt');

        if (!dataString || dataString == ''){
            throw new Error('file is empty');
        }

        let data = JSON.parse(dataString);


        if (data.hasOwnProperty("array")) {
            let array = data.array;
        
            array.map(obj => {
                    try {
                        for (let prop in obj) {
                            if (isAllVowels(prop.toString()) && isAllVowels(obj[prop].toString())) {
                                console.log(JSON.stringify(obj));
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
            })

        }

    } catch (err) {
        console.log(err);
    }
})()

