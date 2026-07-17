CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,

    command TEXT NOT NULL,

    state TEXT NOT NULL DEFAULT 'pending',

    attempts INTEGER DEFAULT 0,

    max_retries INTEGER DEFAULT 3,

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL,

    next_retry_at TEXT
);

CREATE TABLE IF NOT EXISTS config (

    key TEXT PRIMARY KEY,

    value TEXT NOT NULL

);