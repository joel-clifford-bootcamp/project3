// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

const dataRefreshCron = require("./utils/cron/index");

var refreshBixiStations = require('./utils/import/bixiStations'); 

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3001;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes/api/BixiStation");
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else{
  app.use(express.static("public"));
}

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Regularly update data from external APIs 
dataRefreshCron();

// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api/index.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  
  // Call external APIs to populate data
  refreshBixiStations();

  // Start the API server
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
