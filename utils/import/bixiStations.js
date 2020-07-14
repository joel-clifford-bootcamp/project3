const getRealTimeData = require('../api/StationsData');
const db = require('../../models');
const updateTables = require('./updateTables');
const map = require("./maps/BixiStation.json");

/**
 * Update BixiBikes table with latest dta from bikeshare api
 */
module.exports = _ => new Promise((resolve, reject) => {
    db.BixiStation.findAll()
        .then(results => {
            getRealTimeData()
            .then(data => {
                updateTables(map, db.BixiStation, data)
                .then(result => resolve(result))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err));            
});