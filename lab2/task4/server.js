const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const logic = require('logic');

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

app.get("/larger", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "largestOfThree.html"));
});

app.get("/getByIndex", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "getByIndex.html"));
});

// получить наибольшее число
app.post('/largerOfThree', (req, res) => {
    let { a, b, c } = req.body;

    res.status(200).json({ result: Math.max(a, b, c) });
});

// получить объет из массива по индексу 
app.post('/infoByIndex', (req, res) => {
    const index = Number(req.body.index);

    try {
        logic.readFromFileByIndex(index);
    } catch (err) {
        res.status(500).json(err);
    }

});


//TODO: доделать
app.post('/generatehtml', (req, res) => {
    const filedsArray = req.body.fields;
    const url = req.body.url;

    try {
        logic.generateHTML(fieldsArray, url);
    } catch (e) {
        res.status(500).json(e);
    }

});

app.post('/numbers', (req, res) => {

    const { a, b, c } = req.body;

    try {
        const result = logic.simpleNumbers(a, b, c);

        res.status(200).json({ result });
    } catch(e) {
        res.status(500).json(e);
    }
})


app.listen(PORT, (err) => {
    if (err) console.log(err);

    console.log(`server is listening on port ${PORT}`);
});
