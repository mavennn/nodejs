"use strict";

const fs = require("fs");

class StocksContext {
    stocks = [];
    filePath = "";

    constructor(filePath) {
        if (!filePath || filePath === "" || typeof filePath != "string")
            throw new Error("Invalid file path");

        this.filePath = filePath;
        this.stocks = require(filePath);
    }

    Commit() {
        fs.writeFile(this.filePath, JSON.stringify(this.stocks, null, 2), (err) => {
            if (err) throw new Error(err.message);
        })
    }

    Add(title, cars) {
        this.stocks.push({ title, cars });
    }

    GetAll() {
        return this.stocks;
    }

    GetByTitle(title) {
        return this.stocks.filter(x => x.title === title)[0];
    }
}

module.exports = StocksContext;