const router = require("express").Router();

const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

