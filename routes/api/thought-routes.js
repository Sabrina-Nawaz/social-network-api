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
const { create } = require("../../models/User");

// Route to GET and POST all thoughts
router.route("/").get(getThoughts).post(createThought);

// Route to GET, PUT and DELETE a single thought
router
  .route("/:id")
  .get(getOneThought)
  .put(updateThought)
  .delete(removeThought);

// Route to create reactions
router.route("/:thoughtId/reactions"), post(createReaction);

// Route to delete reactions
router.route("/:thoughtId/reactions").post(removeReaction);

module.exports = router;
