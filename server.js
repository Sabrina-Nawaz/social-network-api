const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/connection");

// Establish express and the PORT
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require("./routes"));

// Establishes successful connection to the PORT
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

mongoose.connect(process);
