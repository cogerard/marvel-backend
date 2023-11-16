const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTE POUR AFFICHER LES CHARACTERS

router.get("/characters", async (req, res) => {
  try {
    let endOfUrl = "";
    if (req.query.name) {
      endOfUrl = endOfUrl + "&name=" + req.query.name;
    }
    if (req.query.page) {
      let skip = 100 * (req.query.page - 1);
      endOfUrl = endOfUrl + "&skip=" + skip;
    }
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=100&${endOfUrl}`
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

// ROUTE POUR AFFICHER LES INFOS D'UN CHARACTER SPÉCIFIQUE

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
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
