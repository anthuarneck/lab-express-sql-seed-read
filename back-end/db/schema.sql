DROP DATABASE IF EXISTS tuner;
CREATE DATABASE tuner;

\c tuner;

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    is_favorite BOOLEAN
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN,
    album_id INTEGER REFERENCES albums (id)
    ON DELETE CASCADE
);
