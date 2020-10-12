const fs = require('fs');

const INFO_FILE_PATH = '/Users/gadoevalex/Desktop/study/nodejs/task4/jsonstring.txt';

function simpleNumbers(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c))
        throw new Error();
    let result = [];

    for(let i = a; i <= b; i++) {
        if (i % c === 0) {
            result.push(i);
        }
    }

    return result;
}

function readFromFileByIndex(index) {
    if (isNaN(index))
        throw new Error("index is NaN");

    fs.readFile(INFO_FILE_PATH, (err, data) => {
        if (err)
            throw new Error(err);

        let result = JSON.parse(data).info[index];
        res.status(200).json(result);
    })
}

function generateHTML(fields, url) {
    if (!url || !fields)
        throw new Error();

    let html =
        `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form</title>
    </head>
    <body>
    
        <form method="POST" action=${url}>
            ${
                fields.map(field => {
                    if (field.value && field.name) {
                        return `<input name="${field.name}" value="${field.value}" />`
                    }
                })
            }
        </form>
        
    </body>
    </html>
    `

    return html;
}

module.exports = {
    readFromFileByIndex,
    simpleNumbers,
    generateHTML
}