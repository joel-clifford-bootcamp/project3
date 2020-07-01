
var db = require("../models");

module.exports = {
  test: function(req, res) {
    res.json({message: "It worked!!"})
  },
  signIn: function(req,res) {
    res.json({ 
      email: req.user.email,
      id: req.user.id
    });
  },
  signUp: function(req, res) {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(_ => res.redirect(307, "/api/users/login"))
    .catch(err => res.status(401).json(err));
  },
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },
  userData: function(req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({ 
          email: req.user.email,
          id: req.user.id
        });
      }
  }
}

