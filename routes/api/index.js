const router = require("express").Router();
const userRoutes = require("./users");
const bixiRoutes = require("./bixiStation")

// User routes
router.use("/users", userRoutes);
router.use("/bixi", bixiRoutes);

module.exports = router;