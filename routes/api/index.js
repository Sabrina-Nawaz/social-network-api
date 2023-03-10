// Sets Express Router
const router = require("express").Router();

// Establish routes for user and thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
