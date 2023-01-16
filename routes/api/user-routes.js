const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  deleteFriend,
  addFriend,
} = require("../../controllers/");
