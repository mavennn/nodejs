const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const logic = require('./logic');

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "largestOfThree.html"));
});

app.get("/larger", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "largestOfThree.html"));
});

app.get("/getByIndex", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "getByIndex.html"));
});

app.get("/generate", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "generate.html"));
});

app.get("/numbers", (req, res) => {
    res.sendFile(path.join(__dirname, "/static", "numbers.html"));
});

// получить наибольшее число
app.post('/largerOfThree', (req, res) => {
    let { a, b, c } = req.body;

    res.status(200).json({ result: Math.max(a, b, c) });
});

// получить объет из массива по индексу 
app.post('/infoByIndex', async (req, res) => {
    const index = Number(req.body.index);

    try {
		  let data = await logic.readFromFileByIndex(index);
				console.log(data);
		  res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }

});


// сформировать html с формой отправки
app.post('/generateHtml', (req, res) => {

    try {
		  let fields = ["alpha", "beta", "gamma"];
		  let url = "/myurl";
        let html = logic.generateHTML(fields, url);
		  console.log(html);
				
		  res.status(200).json({ html });
    } catch (e) {
        res.status(500).json(e);
    }

});


// получить числа, входящие в диапазон A до Bо
// и которые делятся нацело на С 
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
