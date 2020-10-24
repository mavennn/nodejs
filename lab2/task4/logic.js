const fs = require('fs');

const INFO_FILE_PATH = '/Users/gadoevalex/Desktop/evm/lab2/task4/jsonstring.txt';

const readFilePromise = (filePath) => {
		  return new Promise((resolve, reject) => {
					 fs.readFile(filePath, "utf-8", (err, data) => {
						  if (err) reject(err);

						  resolve(data);
					 });
		  });
}


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

async function readFromFileByIndex(index) {
    if (isNaN(index))
        throw new Error("index is NaN");
	 
	 let allData = await readFilePromise(INFO_FILE_PATH)
	 
	 return JSON.parse(allData).info[index];

}

function generateHTML(fields, url) {
    if (!url || !fields)
        throw new Error();

    let firstHtml=
        `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form</title>
    </head>
    <body>
        <form method="POST" action="${url}">\n
		  `

		  for(let field of fields) {
			  firstHtml += `\t<input id="${field}" placeholder="${field}"/>\n`
		  }

	 let secondHtml = `
        </form>
    </body>
    </html>
    `

    return firstHtml += secondHtml;
}

module.exports = {
    readFromFileByIndex,
    simpleNumbers,
    generateHTML
}
