const db = require("../database/database");

class JobRepository {
  create(job) {
    const stmt = db.prepare(`
            INSERT INTO jobs (
                id,
                command,
                state,
                attempts,
                max_retries,
                created_at,
                updated_at,
                next_retry_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

    return stmt.run(
      job.id,
      job.command,
      job.state,
      job.attempts,
      job.max_retries,
      job.created_at,
      job.updated_at,
      job.next_retry_at,
    );
  }

  getById(id) {
    const stmt = db.prepare(`
            SELECT *
            FROM jobs
            WHERE id = ?
        `);

    return stmt.get(id);
  }

  getAll() {
    const stmt = db.prepare(`
            SELECT *
            FROM jobs
            ORDER BY created_at DESC
        `);

    return stmt.all();
  }

  getByState(state) {
    const stmt = db.prepare(`
            SELECT *
            FROM jobs
            WHERE state = ?
            ORDER BY created_at DESC
        `);

    return stmt.all(state);
  }

  update(job) {
    const stmt = db.prepare(`
            UPDATE jobs
            SET
                command=?,
                state=?,
                attempts=?,
                max_retries=?,
                updated_at=?,
                next_retry_at=?
            WHERE id=?
        `);

    return stmt.run(
      job.command,
      job.state,
      job.attempts,
      job.max_retries,
      job.updated_at,
      job.next_retry_at,
      job.id,
    );
  }

  delete(id) {
    const stmt = db.prepare(`
            DELETE FROM jobs
            WHERE id=?
        `);

    return stmt.run(id);
  }
  claimNextJob() {
    const transaction = db.transaction(() => {
      const now = new Date().toISOString();

      const job = db
        .prepare(
          `
      SELECT *
      FROM jobs
      WHERE state = 'pending'
        AND (
          next_retry_at IS NULL
          OR next_retry_at <= ?
        )
      ORDER BY created_at ASC
      LIMIT 1
    `,
        )
        .get(now);

      if (!job) return null;

      const result = db
        .prepare(
          `
      UPDATE jobs
      SET
        state = 'processing',
        updated_at = ?
      WHERE id = ?
        AND state = 'pending'
    `,
        )
        .run(now, job.id);

      if (result.changes === 0) {
        return null;
      }

      return {
        ...job,
        state: "processing",
      };
    });

    return transaction();
  }
  markProcessing(id) {
    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state='processing',
            updated_at=?
        WHERE id=?
    `);

    return stmt.run(new Date().toISOString(), id);
  }
  markCompleted(id) {
    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state='completed',
            updated_at=?
        WHERE id=?
    `);

    return stmt.run(new Date().toISOString(), id);
  }
  markFailed(id, attempts) {
    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state='failed',
            attempts=?,
            updated_at=?
        WHERE id=?
    `);

    return stmt.run(attempts, new Date().toISOString(), id);
  }
  retryJob(id, attempts, nextRetryAt) {
    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state = 'pending',
            attempts = ?,
            next_retry_at = ?,
            updated_at = ?
        WHERE id = ?
    `);

    return stmt.run(attempts, nextRetryAt, new Date().toISOString(), id);
  }
  moveToDead(id, attempts) {
    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state = 'dead',
            attempts = ?,
            updated_at = ?
        WHERE id = ?
    `);

    return stmt.run(attempts, new Date().toISOString(), id);
  }
  getStatus() {
    const stmt = db.prepare(`
        SELECT
            state,
            COUNT(*) as count
        FROM jobs
        GROUP BY state
    `);

    return stmt.all();
  }
}

module.exports = new JobRepository();
