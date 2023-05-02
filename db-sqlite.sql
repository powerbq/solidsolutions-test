PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS nodes;
CREATE TABLE IF NOT EXISTS "nodes"
(
    id        INTEGER PRIMARY KEY,
    name      TEXT    NOT NULL,
    parent_id INTEGER REFERENCES nodes (id) ON DELETE CASCADE,
    expanded  INTEGER NOT NULL DEFAULT 1
    );
