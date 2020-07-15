const path = require("path");

const express = require("express");

const session = require("express-session");

const passport = require("./config/passport");

const dataRefreshCron = require("./utils/cron/index");

const refreshBixiStations = require('./utils/import/bixiStations'); 

const updateAllPackages = require('./utils/import/TorontoDataPackages');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3001;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Regularly update data from external APIs 
  dataRefreshCron();
}


const routes = require("./routes");
app.use(routes);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: false }).then(function() {
  
  db.BixiStation.findAll({}).then(data => {
    if(data.length === 0){
      refreshBixiStations();
      updateAllPackages();
    }
  });
  
  // Start the API server
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
