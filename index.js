// Permet l'accès aux variables d'environnement
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// app.use(express.json());
app.use(cors());

// const userRoutes = require("./routes/user");
const comicRoutes = require("./routes/comic");
const characterRoutes = require("./routes/character");
// app.use(userRoutes);
app.use(comicRoutes);
app.use(characterRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
