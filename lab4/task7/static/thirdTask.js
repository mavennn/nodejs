"use strict";

const carsSelectMultiple = document.getElementById("all-cars-multiple");
const createStockButton = document.getElementById("create-stock-btn");


// при нажатии на "Создать склад"
createStockButton.addEventListener("click", () => {
    var selectedCars = [];

    var title = document.getElementById("new-stock-title-input").value;

    for(var i = 0; i < carsSelectMultiple.length; i++) {
        if (carsSelectMultiple.options[i].selected)
            selectedCars.push(carsSelectMultiple.options[i].value);
    }

    // ... отправить на сервер
    api.createStock(title, selectedCars)
        .then(res => {
            if (res.ok)
                document.getElementById("stock-creation-result").innerText = "Успешно добавлено!";
        })
});