'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};




if(process.env.JAWDB.URL){
  var sequelize = new Sequelize(process.env.JAWDB_URL);
}
else if(process.env.GCSDB_IP){
  var sequelize = new Sequelize("link_n_park", "heroku_app", process.env.GCSDB_PWD,{
    dialect: "mysql",
    host: process.env.GCSDB_IP
  });
} else {
  try{
    var config    = require(__dirname + '/../config/connection_config.json')[env];
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  } catch {
    
  }
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
