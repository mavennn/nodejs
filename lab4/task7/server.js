"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const CarsAPI = require("./CarsAPI");
const StocksAPI = require("./StocksAPI");

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render("index.hbs");
});

/**
 * Создать новую машину
 */
app.post("/api/cars/add", async (req, res) => {
    try {
        const { title, price } = req.body;

        if (!title || !price)
            throw new Error("Invalid title or price");

        const carsAPI = new CarsAPI();
        const result = await carsAPI.AddCar(title, price);

        if(result) {
            res.status(200).json(true);
        } else {
            throw new Error(result.message);
        }

    } catch (e) {
        res.status(500).json(e.message);
    }
});

/**
 * Получить все машины
 */
app.get("/api/cars/all", async (req, res) => {
    try {
        const carsAPI = new CarsAPI();
        const cars = await carsAPI.GetAll();
        res.status(200).json(cars);
    } catch (e) {
        console.log(e);
        res.status(500).json(e.message);
    }
});

/**
 * Получить машину по названию
 */
app.get("/api/cars/:title", async (req, res) => {
    try {
        const title = req.params.title;

        if (!title || title === "")
            res.status(400).json("Invalid title");

        const carsAPI = new CarsAPI();

        const car = await carsAPI.GetByTitle(title);

        if (car.title)
            res.status(200).json(car);
        else
            res.status(404).json({ message: "Not found" })
    } catch (e) {
        console.log(e);
        res.status(500).json(e.message);
    }
});

/**
 * Создать склад
 */
app.post("/api/stocks/add", async (req, res) => {
    try {
        const { title, cars } = req.body;

        if (!title || !cars || title === "")
            res.status(400).json({ message: "Invalid title or cars" });

        const stocksAPI = new StocksAPI();
        const result = await stocksAPI.AddStock(title, cars);
        if (result)
            res.status(200).json(true);
        else
            res.status(500).json({ message: "Something went wrong" });

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

/**
 * Получить склад по названию
 */
app.get("/api/stocks/:title", async (req, res) => {
    try {
        const title = req.params.title;
        if (!title || title === "")
            res.status(400).json({ message: "Invalid title" });

        const stocksAPI = new StocksAPI();
        const stock = await stocksAPI.GetByTitle(title);
        if (stock.title)
            res.status(200).json(stock);
        else
            res.status(400).json(false);

    } catch (e) {
        console.log(e);
    }
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));