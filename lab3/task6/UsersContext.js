"use strict";

class UsersContext {
    users = [];

    constructor() {
    }

    GetAll() {
        return this.users;
    }

    IsEmpty() {
        return this.users.length === 0;
    }

    Add(user) {
        this.users.push(user);
    }

    Exists(login) {
        return this.users.findIndex(u => u.login === login) !== -1;
    }

    Remove(login) {
        const index = this.users.findIndex(u => u.login === login);
        this.users.splice(index, 1);
    }

    GetByLogin(login) {
        return this.users[this.users.findIndex(u => u.login === login)];
    }
}

module.exports = UsersContext;