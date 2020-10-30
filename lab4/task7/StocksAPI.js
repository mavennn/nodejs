"use strict";

const axios = require("axios");

class StocksAPI {
    url = "http://localhost:3002";

    AddStock(title, cars) {
        return axios.post(this.url + "/api/stocks/add", { title, cars }).then(res => res.data);
    }

    GetAll() {
        return axios.get(this.url + "/api/stocks/all").then(res => res.data);
    }

    GetByTitle(title) {
        return axios.get(this.url + `/api/stocks/${title}`).then(res => res.data);
    }
}

module.exports = StocksAPI;