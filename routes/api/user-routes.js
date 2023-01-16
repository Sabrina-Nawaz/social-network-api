const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  deleteFriend,
  addFriend,
} = require("../../controllers/user-controller");
