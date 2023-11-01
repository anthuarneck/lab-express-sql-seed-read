const express = require("express");
const cors = require("cors");
const app = express();
const songsController = require("./controllers/songController.js");
const albumsController = require("./controllers/albumController.js")

app.use(cors());
app.use(express.json());

app.use("/albums", albumsController);

app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, data: { error: "Page not found!" } });
});

module.exports = app;
