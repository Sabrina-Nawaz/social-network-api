const router = require("express").Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,
  addFriend,
} = require("../../controllers/user-controller");

// Route to GET and POST all users /api/users
router.route("/").get(getUsers).post(createUser);

// Route to GET, PUT and DELETE one user /api/users/:id
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

// Route to add and delete a friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
