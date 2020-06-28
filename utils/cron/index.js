const cron = require('node-cron');
const importBixiStations = require('../import/bixiStations');

/**
 * Schedule updates of database at 11:59 pm, every day
 */
module.exports = function() {
    cron.schedule('59 23 * * *', importBixiStations);
};
