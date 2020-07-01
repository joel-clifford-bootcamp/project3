const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require("../config/passport");


router.route("/api/signin")
  .post(passport.authenticate("local"),usersController.signIn);

router.route("api/signup")
  .post(usersController.signUp)

router.route("/logout")
  .get(usersController.logout);

router.route("/api/user_data")
  .get(usersController.userData)

module.exports = router;
