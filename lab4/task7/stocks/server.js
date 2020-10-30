"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3002;
app.use(bodyParser.json());
const StockContext = require("./StocksContext");
const storagePath = __dirname + "/stocks.json";

/**
 * Добавить склад
 */
app.post("/api/stocks/add", (req, res) => {
   try {
       const { title, cars } = req.body;

       if (!title || !cars)
           res.status(400).json({ message: "Invalid title or cars" });

       const ctx = new StockContext(storagePath);
       ctx.Add(title, cars);
       ctx.Commit();
       res.status(200).json(true);
   } catch (e) {
        res.status(500).json(e.message);
   }
});


/**
 * Получить по названию
 */
app.get("/api/stocks/:title", (req, res) => {
    try {
        const title = req.params.title;

        const ctx = new StockContext(storagePath);
        const stock = ctx.GetByTitle(title);

        if (stock)
            res.status(200).json(stock);
        else
            res.status(400).json(false);

    } catch (e) {
        console.log(e);
    }
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));