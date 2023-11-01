const express = require("express");
const {
  getOneAlbum,
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum
} = require("../queries/albums.js");
// const {
//   checkName,
//   checkArtist,
//   checkIsFavorite,
// } = require("../validations/checkAlbums.js");
const songController = require("./songController.js")

const albums = express.Router();
albums.use("/:album_id/songs", songController)

albums.get("/", async (req, res) => {
  const allAlbums = await getAllAlbums();
  if (allAlbums[0]) {
    res.status(200).json(allAlbums);
  } else {
    res.status(500).json({
      success: false,
      data: { error: "There is an error with Server!" },
    });
  }
});

albums.post("/",  async (req, res) => {
  try {
    const createdAlbum = await createAlbum(req.body);
    res.json(createdAlbum);
  } catch (error) {
    res.status(400).json({ error: "Error detected" });
  }
});

albums.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneAlbum = await getOneAlbum(id);
  if (oneAlbum.id) {
    res.json(oneAlbum);
  } else {
    res.status(404).json({ error: "album not found!" });
  }
});

albums.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAlbum = await updateAlbum(id, req.body);
  if (updatedAlbum.id) {
    res.json(updatedAlbum);
  } else {
    res.status(404).json({ error: "album not found!" });
  }
});

albums.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAlbum = await deleteAlbum(id);
    if (deletedAlbum.id) {
      res.json(deletedAlbum);
    } else {
      res.status(404).json({ error: "album not found!" });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = albums;
