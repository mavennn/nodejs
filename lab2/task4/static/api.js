const API_URL = "http://localhost:3000";

const api = {
    postParams: function (body) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    },
    largerOfThree: function (a, b, c) {
        return fetch(API_URL + "/largerOfThree", this.postParams({ a, b, c })).then(res => res.json());
    },
    getByIndex: function(index) {
        return fetch(API_URL + "/infoByIndex", this.postParams({ index })).then(res => res.json());
    }
};