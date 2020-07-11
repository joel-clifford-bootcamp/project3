const router = require('express').Router();
const bixiStationsController = require("../../controllers/bixiStationsController");
const db = require('../../models');

// Return the closest 10 BixiStations, based on searched location
// Note: coord_diff correlates to distance well enough - Google used on
// front end to calcualte actual path distance for each plotted object
router.route('/')
    .get(bixiStationsController.getNearest);

// Return real time station data for stations identified by idx
router.route('/realtime')
    .get(bixiStationsController.getRealTime);

router.route('/seed')
    .get(bixiStationsController.seed);

module.exports = router;