const express = require("express");
const {
  getAllSongs,
  getOneSong,
  deleteSong,
  createSong,
  updateSong,
} = require("../queries/songs.js");

const { getOneAlbum } = require("../queries/albums.js");

const {
  checkName,
  checkArtist,
  checkIsFavorite,
} = require("../validations/checkSongs.js");

const songs = express.Router({ mergeParams: true });

songs.get("/", async (req, res) => {
  const { album_id } = req.params;
  try {
    const album = await getOneAlbum(album_id);
    const allSongs = await getAllSongs(album_id);
    res.status(200).json({ ...album, allSongs });
  } catch (error) {
    res.json(error);
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneSong = await getOneSong(id);
  if (oneSong.id) {
    res.json(oneSong);
  } else {
    res.status(404).json({ error: "Song not found!" });
  }
});

songs.delete("/:song_id", async (req, res) => {
  try {
    const { song_id } = req.params;
    const deletedSong = await deleteSong(song_id);

    if (deletedSong) {
      res.status(200).json({ success: true, payload: { data: deletedSong } });
    } else {
      res.status(404).json("No song found!");
    }
  } catch (error) {
    res.send(err);
  }
});

songs.post("/", async (req, res) => {
  try {
    const { album_id } = req.params;
    const createdSong = await createSong(album_id, req.body);
    res.json(createdSong);
  } catch (error) {
    res.status(400).json({ error: "Error creating Song!" });
  }
});

songs.put("/:id", async (req, res) => {
  const { id, album_id } = req.params;
  const updatedSong = await updateSong({ album_id, id, ...req.body });
  if (updatedSong.id) {
    res.status(200).json(updatedSong);
  } else {
    res.status(404).json("Review not found!");
  }
});

module.exports = songs;
