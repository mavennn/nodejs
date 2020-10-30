'use strict';

const fs = require('fs');

const readFilePromise= async (file) => {
        return new Promise((resolve, reject) => {
                fs.readFile(file, "utf-8", (err, data) => {
                        if (err) reject(err);

                        resolve(data);
                });
        });
}

const recursive = (obj) => {

        let maxHeight = 0;
        let maxNode = 0;

        for(var prop in obj) {
                if (typeof obj[prop] === "object") {
                        const [h, n] = recursive(obj[prop]);
                        if (maxHeight < h) {
                                maxHeight = h;
                                maxNode = { [prop]: n };
                        }
                }

                if (Array.isArray(obj[prop])) {
                        obj[prop].forEach(node => {
                                const [h, n] = height(obj[prop]);
                                if (maxHeight < h) {
                                        maxHeight = h;
                                        maxNode = { [prop]: n };
                                }
                        });
                }

                if (maxHeight < 1) {
                        maxHeight = 1;
                        maxNode = { [prop]: obj[prop] };
                }

        }


        return [maxHeight + 1, maxNode];
}

(async function main () {


        /*
        let obj = {
                alex: {
                        age: 21,
                        university: "bmstu",
                },
                alina: {
                        age: 18,
                        university: "B&D",
                        look: {
                                hat: {
                                        color: "gray",
                                        size: "medium"
                                },
                                hasTie: false,
                        }
                }
        }
        */

        try {
            let objString = await readFilePromise("/Users/gadoevalex/Desktop/evm/lab2/task3/data/generated.txt");
            let obj = JSON.parse(objString);

                    const result = JSON.stringify(recursive(obj), 0, 2);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
})();
