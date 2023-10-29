const checkName = (req, res, next) => {
  if (req.body.name) {
    console.log("Name valid");
    next();
  } else {
    res.status(400).json({ error: "Name is required!" });
  }
};

const checkArtist = (req, res, next) => {
  if (req.body.artist) {
    console.log("Artist valid");
    next();
  } else {
    res.status(400).json({ error: "Artist is required!" });
  }
};

const checkIsFavorite = (req, res, next) => {
  if (req.body.is_favorite) {
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};

module.exports = {
  checkName,
  checkArtist,
  checkIsFavorite,
};
