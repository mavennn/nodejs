"use strict";

class User {
    login;
    password;
    hobby;
    age;

    constructor(login, password, hobby, age) {
        this.login = login;
        this.password = password;
        this.hobby = hobby;
        this.age = age;
    }
}

module.exports = User;