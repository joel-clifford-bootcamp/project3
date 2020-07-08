const router = require('express').Router();
const bixiStationsController = require("../../controllers/bixiStationsController");
const db = require('../../models');

// Calculate distance in m between two coordinates  
// const calculateDistance = (location1, location2) => {
//     const {lat1, lng1} = location1;
//     const {lat2, lng2} = location2;

//     const R = 6371e3;
//     const phi1 = lat1 * Math.PI/180;
//     const phi2 = lat2 * Math.PI/180;
//     const deltaPhi = phi2 - phi1;
//     const deltaLambda = (lng2 - lng1) * Math.PI/180;

//     const a 

// };

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