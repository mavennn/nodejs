"use strict";

const gamesMock = require('./games.json');

class GamesContext {

    games = [];

    constructor() {
        this.games = gamesMock;
    }

    GetByAge(age) {
        return this.games.filter(g => g.age <= age);
    }
}

module.exports = GamesContext;