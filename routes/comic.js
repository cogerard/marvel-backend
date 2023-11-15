const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTE POUR AFFICHER LES COMICS

router.get("/comics", async (req, res) => {
  try {
    let endOfUrl = "";
    if (req.query.name) {
      endOfUrl = endOfUrl + "&name=" + req.query.name;
    }
    if (req.query.page && typeof page == "number") {
      let skip = 100 * req.query.page;
      endOfUrl = endOfUrl + "&skip=" + skip;
    }
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=100&${endOfUrl}`
      )
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE POUR AFFICHER LES COMICS D'UN CHARACTER SPÉCIFIQUE

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE POUR AFFICHER LES INFOS D'UN COMIC SPÉCIFIQUE

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
