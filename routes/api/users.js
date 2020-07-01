const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require("../../config/passport");

router.route("/signin")
  .post(passport.authenticate("local"),usersController.signIn);

router.route("/signup")
  .post(usersController.signUp)

router.route("/logout")
  .get(usersController.logout);

router.route("/user_data")
  .get(usersController.userData)

router.route("/test")
  .get(usersController.test);

module.exports = router;
