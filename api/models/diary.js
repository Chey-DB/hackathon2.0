const db = require('../database/connect');

class Diary {

    constructor({ diary_entry_id, category, diary_entry, user_id, date, month, year }) {
        this.id = diary_entry_id;
        this.category = category;
        this.diary_entry = diary_entry;
        this.user_id = user_id;
        this.date = date;
        this.month = month;
        this.year = year;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary_entries;");
        return response.rows.map(p => new Diary(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary_entries WHERE diary_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate diary entry.")
        }
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { category, diary_entry } = data;
        let response = await db.query("INSERT INTO diary_entries (category, diary_entry) VALUES ($1, $2) RETURNING diary_entry_id;",
            [category, diary_entry]);
        const newId = response.rows[0].diary_entry_id;
        const newDiaryEntry = await Diary.getOneById(newId);
        return newDiaryEntry;
    }

    async update(data) {
        const { category, diary_entry, user_id, date, month, year } = data
    const response = await db.query("UPDATE diary SET (category, diary_entry, user_id, date, month, year) = ($1, $2, $3, $4, $5, $6) WHERE diary_entry_id = $7 RETURNING *;", [category, diary_entry, user_id, date, month, year, this.id])
    if (response.rows.length != 1) {
      throw new Error("Not able to update the Diary entry")
    }
    return new Pokemon(response.rows[0])
    }

    async destroy() {
        let response = await db.query("DELETE FROM diary_entries WHERE diary_entry_id = $1 RETURNING *;", [this.id]);
        return new Diary(response.rows[0]);
    }

}

module.exports = Diary;
