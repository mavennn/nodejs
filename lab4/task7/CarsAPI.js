"use strict";

const axios = require("axios");

class CarsAPI {
    url = "http://localhost:3001";

    AddCar(title, price) {
        return axios.post(this.url + "/api/cars/add", { title, price }).then(res => res.data);
    }

    GetAll() {
        return axios.get(this.url + "/api/cars/all").then(res => res.data);
    }

    GetByTitle(title) {
        console.log(title);
        return axios.get(this.url + `/api/cars/${title}`).then(res => res.data);
    }
}

module.exports = CarsAPI;