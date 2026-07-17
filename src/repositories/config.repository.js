const db = require("../database/database");

class ConfigRepository {
  set(key, value) {
    const stmt = db.prepare(`
            INSERT INTO config(key, value)
            VALUES(?, ?)
            ON CONFLICT(key)
            DO UPDATE SET value = excluded.value
        `);

    return stmt.run(key, value);
  }

  get(key) {
    const stmt = db.prepare(`
            SELECT value
            FROM config
            WHERE key = ?
        `);

    const row = stmt.get(key);

    return row ? row.value : null;
  }

  getAll() {
    return db
      .prepare(
        `
            SELECT *
            FROM config
        `,
      )
      .all();
  }
}

module.exports = new ConfigRepository();
