const express = require("express");
const {
  getAllSongs,
  createSong,
  getOneSong,
  updateSong,
  deleteSong,
} = require("../queries/songs.js");
const {
  checkName,
  checkArtist,
  checkIsFavorite,
} = require("../validations/checkSongs.js");

const songs = express.Router();

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({
      success: false,
      data: { error: "There is an error with Server!" },
    });
  }
});

songs.post("/", checkName, checkArtist, checkIsFavorite, async (req, res) => {
  try {
    const createdSong = await createSong(req.body);
    res.json(createdSong);
  } catch (error) {
    res.status(400).json({ error: "Error detected" });
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

songs.put("/:id", checkName, checkArtist, checkIsFavorite, async (req, res) => {
  const { id } = req.params;
  const updatedSong = await updateSong(id, req.body);
  if (updatedSong.id) {
    res.json(updatedSong);
  } else {
    res.status(404).json({ error: "Song not found!" });
  }
});

songs.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
      res.json(deletedSong);
    } else {
      res.status(404).json({ error: "Song not found!" });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = songs;
