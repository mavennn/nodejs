"use strict";

const fs = require("fs");

class CarsContext {
    cars = [];
    filePath = "";

    constructor(filePath) {
        if (!filePath || filePath === "" || typeof filePath != "string")
            throw new Error("Invalid file path");

        this.filePath = filePath;
        this.cars = require(filePath);
    }

    GetAll() {
        return this.cars;
    }

    Commit() {
        fs.writeFile(this.filePath, JSON.stringify(this.cars, null, 2), (err) => {
            if (err) throw new Error(err.message);
        })
    }

    Add(title, price) {
        this.cars.push({ title, price });
    }

    Get(title) {
        return this.cars.filter(x => x.title === title)[0];
    }
}

module.exports = CarsContext;