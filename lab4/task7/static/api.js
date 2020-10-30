"use strict";

const api = Object.freeze({
    URL: "http://localhost:3000",
    postParams: function(body) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
    },
    getParams: {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    },
    createCar: function (title, price) {
        return fetch(this.URL + "/api/cars/add", this.postParams({ title, price }));
    },
    getAllCars: function() {
        return fetch(this.URL + "/api/cars/all", this.getParams);
    },
    getCarByTitle: function(title) {
        return fetch(this.URL + `/api/cars/${title}`, this.getParams);
    },
    createStock: function(title, cars) {
        return fetch(this.URL + "/api/stocks/add", this.postParams({ title, cars }));
    },
    getStockByTitle: function(title) {
        return fetch(this.URL + `/api/stocks/${title}`, this.getParams);
    }
})