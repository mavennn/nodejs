"use strict";

const fs = require('fs');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readLinePromise = (text) => {
    return new Promise((resolve, reject) => {
        rl.question(text, (result) => {
            if (!result) reject();
            resolve(result);
        });
    });
}

const readFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const readdirPromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
} 

(async function main() {

    try {
        const ext = await readLinePromise('Enter file extension: ');

        const path = await readLinePromise('Enter file path: ');

        let files = await readdirPromise(path);

        for (let file of files) {
            let parts = file.split('.');
            if (parts[parts.length - 1] == ext) {
                readFilePromise(path + "/" + file)
                    .then(fileText => console.log(fileText))
                    .catch(err => console.log(err))
            }
        }

    } catch (e) {
        console.log(e);
    }

    
})()