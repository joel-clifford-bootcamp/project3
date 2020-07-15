const router = require("express").Router();
const userRoutes = require("./users");
const bixiRoutes = require("./bixiStation");
const stationCommentRoutes = require("./stationComment");

// User routes
router.use("/users", userRoutes);
router.use("/bixi", bixiRoutes);
router.use("/bixi/comments", stationCommentRoutes);


module.exports = router;