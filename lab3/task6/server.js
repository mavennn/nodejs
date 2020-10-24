"use strict";

const express = require("express");
const games = require('./games');

const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/:age", (req, res) => {
    const age = Number(req.params.age);

    if (isNaN(age)) res.status(400).json({ err: "age is not a number" });

    const infoObject = {
        games: games.filter(g => g.age <= age)
    }

    res.render("games.hbs", infoObject);
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
