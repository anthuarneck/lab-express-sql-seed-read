const express = require("express");
const { getAllSongs } = require("../queries/songs.js");

const songs = express.Router();

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res
      .status(500)
      .json({
        success: false,
        data: { error: "There is an error with Server!" },
      });
  }
});

module.exports = songs;