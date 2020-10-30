"use strict";

const createNewCarButton = document.getElementById("create-new-car");

// при нажатии на кнопку "Создать"
createNewCarButton.addEventListener("click", () => {
    var title = document.getElementById("new-car-title-input").value;
    var price = Number(document.getElementById("new-car-price-input").value);

    //TODO: добавить валидацию

    api.createCar(title, price)
        .then(res => {
            if (res.ok) {
                document.getElementById("creation-result").innerText = "Успешно добавлено!";
                setTimeout(() => {
                    document.getElementById("creation-result").innerText = "";
                }, 2000);
            }
        })
});