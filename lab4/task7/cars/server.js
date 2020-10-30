"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3001;
const storagePath = __dirname + "/cars.json";
const CarsContext = require("./CarsContext");

app.use(bodyParser.json());

/**
 * Создать машину
 */
app.post("/api/cars/add", (req, res) => {

    try {
        const { title, price } = req.body;

        if (!title || title === "" || !price)
            res.status(400).json({ message: "Invalid title or price" });

        const ctx = new CarsContext(storagePath);
        ctx.Add(title, price);
        ctx.Commit();
        res.status(200).json(true);
    } catch (e) {
        console.log(e);
        res.status(500).json(e.message);
    }
});


/**
 * Получить все машины
 */
app.get("/api/cars/all", (req, res) => {
    try {
        const ctx = new CarsContext(storagePath);
        const cars = ctx.GetAll();
        res.status(200).json(cars);
    } catch (e) {
        console.log(e);
        res.status(500).json(e.message);
    }

});

/**
 * Получить машину по названию
 */
app.get("/api/cars/:title", (req, res) => {
    try {
        const title = req.params.title;

        if (!title || title === "")
            res.status(400).json({ message:"Invalid title in request" });

        const ctx = new CarsContext(storagePath);
        const car = ctx.Get(title);
        if (car.title) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));