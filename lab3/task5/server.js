const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const FILE_PATH = '/Users/gadoevalex/Desktop/evm/lab3/task5/users.txt';

const SEPARATOR = '\n';

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'index.html'));
});

app.get('/find', (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'find.html'));
});

const readFilePromise = async (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const writeFilePromise = async (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const getUsers = async () => {
    let usersString = await readFilePromise(FILE_PATH);
    return new Promise(async (resolve, reject) => {
        try {
            // если файл пуст, то вернем пустой массив, иначе вернем массив объектов
            let users =
                !usersString || usersString == ''
                    ? []
                    : usersString
                          .split(SEPARATOR)
                          .map((user) => JSON.parse(user));
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

const isUserExists = (email, phone, users) => {
    return users.findIndex((x) => x.email == email && x.phone == phone) !== -1;
};

app.post('/sendInfo', async (req, res) => {
    const { email, surname, phone } = req.body;

    try {
        let users = await getUsers();
        if (!isUserExists(email, phone, users)) {
            // пользователя еще нет, добавляем в файл
            users.push({ email, surname, phone });
            const newUsersString = users
                .map((user) => JSON.stringify(user))
                .join(SEPARATOR);
            await writeFilePromise(FILE_PATH, newUsersString);
            res.status(200).json(newUsersString);
        } else {
            // уже есть, вернуть 409
            res.status(409).json({});
        }
    } catch (e) {
        res.status(500).json(e);
    }
});

app.get('/api/users/:email', async (req, res) => {
    const email = req.params.email;
    const users = await getUsers();

    try {
      let index = users.findIndex(x => x.email == email);
      if (index == -1) res.status(404).json();

      let user = users[index];
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }

});

app.listen(PORT, (err) => {
    if (err) console.log(err);

    console.log(`server is listening on port ${PORT}`);
});
