// Require the User model
const { User } = require("../models");

const userController = {
  // To get ALL users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
};
