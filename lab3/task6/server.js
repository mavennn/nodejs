"use strict";

const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const User = require('./User');
const UserContext = require('./UsersContext');
const GamesContext = require('./GamesContext');

const userCtx = new UserContext();
const gamesCtx = new GamesContext();

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/static"));
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));
app.use(bodyParser.json());

// middleware function to check for logged-in users
function sessionChecker (req, res, next) {
    if (req.session.login) {
        res.redirect('/home');
    } else {
        next();
    }
}


app.get("/", sessionChecker, (req, res) => {
    res.redirect("/auth");
});

/**
 * Страница авторизации
 */
app.get("/auth", (req, res) => {
    const infoObject = {};
    res.render("auth.hbs", infoObject);
});

app.get("/home", (req, res) => {

    // если нет инфы о пользователях, то перенаправить на страницу авторизации
    if (userCtx.IsEmpty()) {
        res.redirect("/auth");
    }

    const user = userCtx.GetByLogin(req.session.login);
    const games = gamesCtx.GetByAge(user.age);

    const infoObject = {
        user,
        games
    };

    res.render("home.hbs", infoObject);
});

/**
 * Страница с играми
 */
app.get("/games/:age", (req, res) => {
    const age = Number(req.params.age);

    if (isNaN(age)) res.status(400).json({ err: "age is not a number" });

    const ctx = {
        games: gamesCtx.GetByAge(age)
    };

    res.render("games.hbs", ctx);
});

app.post("/api/users/auth", (req, res) => {
    try {
        const { login, password, hobby, age } = req.body;

        req.session.login = login;
        req.session.password = password;

        userCtx.Add(new User(login, password, hobby, age));

        res.redirect("/home");
    } catch (e) {
        res.status(500).json(e);
    }

});

app.post("/api/users/exit", (req, res) => {
    userCtx.Remove(req.session.login);
    req.session = null;
    res.status(200).json(true);
})



app.listen(PORT, () => console.log(`Server on port ${PORT}`));
