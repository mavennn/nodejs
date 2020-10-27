
const fs = require('fs');

class UsersContext {

    users = [];
    separator = "\n";
    filePath = '/Users/gadoevalex/Desktop/evm/lab3/task5/users.txt'

    constructor(filePath) {
        this.filePath = filePath;
    }

    // при инициализации считать всех пользователей в массив
    async Init() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (err, data) => {
                if (err) reject(err);

                if (!data || data === "") {
                    this.users = [];
                }

                try {
                    this.users = data
                        .toString()
                        .split(this.separator)
                        .map(user => {
                            try {
                                return JSON.parse(user);
                            } catch (e) {
                                return {};
                            }
                        });
                    resolve(this.users);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }

    async Commit() {
        return new Promise((resolve, reject) => {
            const usersString = this.users
                    .map(u => JSON.stringify(u))
                    .join(this.separator);

            fs.writeFile(this.filePath, usersString, async (err) => {
                if (err) reject(err);

                //await this.Init();
                resolve(true);
            });

        });
    }

    GetAll() {
        return this.users;
    }

    UserExists(email) {
        return this.users.findIndex(u => u.email === email) !== -1;
    }

    async Add(email, surname, phone) {
        this.users.push({ email, surname, phone });
    }

    GetByEmail(email) {
        return this.users[this.users.findIndex(u => u.email === email)];
    }

}

module.exports = UsersContext;