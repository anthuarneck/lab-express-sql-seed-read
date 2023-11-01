const db = require("../db/dbConfig.js");

const getOneAlbum = async (id) => {
    try {
      const oneAlbum = await db.one("SELECT * FROM albums WHERE id=$1", id);
      return oneAlbum;
    } catch (error) {
      return error;
    }
  };

  const getAllAlbums = async () => {
    try {
      const allAlbums = await db.any("SELECT * FROM albums");
      return allAlbums;
    } catch (error) {
      return error;
    }
  };


const createAlbum = async (album) => {
    try {
      const createdAlbum = await db.one(
        "INSERT INTO albums (title, artist, is_favorite) VALUES ($1, $2, $3) RETURNING *",
        [album.title, album.artist, album.is_favorite]
      );
      return createdAlbum;
    } catch (error) {
      return error;
    }
  };

  const updateAlbum = async (id, album) => {
    try {
      const { title, artist, is_favorite } = album;
      const updatedAlbum = await db.one(
        "UPDATE albums SET title=$1, artist=$2, is_favorite=$3 WHERE id=$4 RETURNING *",
        [title, artist, is_favorite, id]
      );
      return updatedAlbum;
    } catch (error) {
      return error;
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const deletedAlbum = await db.one(
        "DELETE from albums WHERE id = $1 RETURNING *",
        id
      );
      return deletedAlbum;
    } catch (error) {
      return error;
    }
  };

  module.exports = {
    getOneAlbum,
    getAllAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum
  }