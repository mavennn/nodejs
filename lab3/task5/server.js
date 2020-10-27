const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const UserContext = require('./UserContext');

const PORT = 3000;
const FILE_PATH = '/Users/gadoevalex/Desktop/sem5/evm/lab3/task5/users.txt';

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'index.html'));
});

app.get('/find', (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'find.html'));
});

app.post('/api/users/add', async (req, res) => {

    try {
        const { email, surname, phone } = req.body;
        const context = new UserContext(FILE_PATH);
        await context.Init();

        if (!context.UserExists(email)) {
            await context.Add(email, surname, phone);
            await context.Commit();
            res.status(200).json({ message: "Пользователь был добавлен" });
        } else {
            res.status(409).json({ message: "Пользователь уже существует" });
        }


    } catch (e) {
        res.status(500).json(e);
    }
});

app.get('/api/users/:email', async (req, res) => {

    try {
        const email = req.params.email;
        const context = new UserContext(FILE_PATH);
        await context.Init();

        if (context.UserExists(email)) {
            const user = context.GetByEmail(email);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Пользователь не найден" });
        }

    } catch (e) {
        res.status(500).json(e);
    }

});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});
