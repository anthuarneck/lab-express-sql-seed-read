const express = require("express");
const { getAllSongs, createSong } = require("../queries/songs.js");
const { checkName, checkArtist, checkIsFavorite } = require("../validations/checkSongs.js")

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

module.exports = songs;
