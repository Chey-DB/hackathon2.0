const db = require('../database/connect');

class Diary {

    constructor({ diary_entry_id, category, diary_entry, date, month, year }) {
        this.id = diary_entry_id;
        this.category = category;
        this.diary_entry = diary_entry;
       
        this.date = date;
        this.month = month;
        this.year = year;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary_entries;");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary_entries WHERE diary_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const { category, diary_entry } = data;
        let response = await db.query("INSERT INTO diary_entries (category, diary_entry) VALUES ($1, $2) RETURNING post_id;",
            [category, diary_entry]);
        const newId = response.rows[0].post_id;
        const newPost = await Diary.getOneById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM diary_entries WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Diary(response.rows[0]);
    }

}

module.exports = Post;
