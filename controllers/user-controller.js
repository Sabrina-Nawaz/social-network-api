// Require the User model
const { User } = require("../models");

const userController = {
  // To get ALL users
  getUsers(req, res) {
    User.find()
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // To get a SINGLE user by ID
  getOneUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Cannot find user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Create a user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Update a user
  updateUser(req, res) {
    console.log(req.params)
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Delete a user and thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend by id
  addFriend(req, res) {
    console.log("You are adding a friend!");
    console.log(req.params);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
