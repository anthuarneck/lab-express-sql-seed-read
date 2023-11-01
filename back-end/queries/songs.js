const db = require("../db/dbConfig.js");

const getAllSongs = async (album_id) => {
  try {
    const allSongs = await db.any(
      "SELECT * FROM songs WHERE album_id=$1",
      album_id
    );
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getOneSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE from songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

const createSong = async (album_id, song) => {
  try {
    const { name, artist, album, time, is_favorite } = song;
    const createdSong = await db.one(
      `INSERT INTO songs (name, artist, album, time, is_favorite, album_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, artist, album, time, is_favorite, album_id]
    );
    return createdSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (song) => {
  try {
    const { name, artist, album, time, is_favorite, id, album_id } = song;
    const updatedSong = await db.one(
      `UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5, album_id=$6 WHERE id=$7 RETURNING *`,
      [name, artist, album, time, is_favorite, album_id, id]
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getOneSong,
  deleteSong,
  createSong,
  updateSong,
};
