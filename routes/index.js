// Require express router
const router = require("express").Router();

//Import all the routes under api folder
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// Sets up 404 error if route cannot be reached
router.use((req, res) => {
  res.status(404).send("<h1>404 Error! Route cannot be reached!</h1>");
});

module.exports = router;
