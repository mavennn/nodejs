"use strict";

const carsSelect = document.getElementById("all-cars");

// для форматирования цены
var formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
});


// при выборе машины в селекте, где все машины
carsSelect.onchange = (event) => {
    var s = document.getElementById("all-cars");
    var selectedCar = s.options[s.selectedIndex].value;

    api.getCarByTitle(selectedCar)
        .then(res => {
            if (res.ok)
                return res.json()
        })
        .then(res => {
            if (res.price)
                document.getElementById("price-result").innerText = formatter.format(res.price);
        });

};

// заполняет селект со всеми машинами
function fillCarsSelect (cars, selectId) {
    if (Array.isArray(cars)) {
        var select = document.getElementById(selectId);

        for(var car of cars) {
            var option = document.createElement("option");
            option.innerText = car.title;

            select.appendChild(option);
        }
    }
}