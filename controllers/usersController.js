
var db = require("../models");

module.exports = {

  signIn: function(req,res) {
    res.json({ 
      email: req.user.email,
      id: req.user.id
    });
  },

  validateInput: function(req, res) {
    // block queries about password
    if(req.body.fieldName === 'password')
      res.status(401).end();
    else{
      db.User.findAll({
        limit: 1,
        where: db.sequelize.literal(`${req.body.fieldName} = '${req.body.value.toLowerCase().trim()}'`) 
      })
      .then(result => res.status(200).json(result.length === 0))
      .catch(err => res.status(400).json(err))
    }
  },

  signUp: function(req, res) {
    console.log(req.body)
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password
    })
    .then(user =>  
      res.redirect(307, "/api/users/signin"))
    .catch(err => {
      // Do not return error as it can contain hashed password
      console.log(err);
      res.status(401)
      res.send()
    });
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

