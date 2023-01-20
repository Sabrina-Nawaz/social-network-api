const { User, Thought } = require("../models");

const thoughtController = {
  // To get ALL thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate("reactions")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // To get a SINGLE thought by id
  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate("reactions")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Cannot find a thought with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //Create a thought
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought by ID
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : User.findOneAndUpdate(
              { _id: req.body.userId },
              { $pull: { thoughts: req.params.id} },
              { new: true }
            )
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    console.log(req.body, req.params);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  removeReaction(req, res) {
    console.log(req.params);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators:true,new: true }
      ).then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this ID" });
         
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {res.status(500).json(err)})
    }
};

module.exports = thoughtController;
