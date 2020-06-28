const api = require('../api/StationsData');
const db = require('../../models');
const updateTables = require('./updateTables');

module.exports = function() {
    db.BixiStation.findAll()
        .then(dbStations => {
            api(apiStations => {
                updateTables(db.BixiStation, apiStations)
        })
    })
};