const db = require('../database/connect');

class User {

    constructor({ user_id, first_name, last_name, username, password, age, country, city, reason}) {
        this.id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.age = age;
        this.country = country;
        this.city = city;
        this.reason = reason;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_accounts WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_accounts WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { first_name, last_name, username, password, age, country, reason } = data;
        let response = await db.query("INSERT INTO user_accounts (first_name, last_name, username, password, age, country, city, reason) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id;",
            [first_name, last_name, username, password, age, country, reason]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;
