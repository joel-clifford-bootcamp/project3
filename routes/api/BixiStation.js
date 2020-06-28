const express = require('express');
const db = require('../../models');
const getRealTimeData = require('../../utils/api/StationsData');

const router = express.Router();

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
router.get('/bixi/', (req, res) => {

    db.BixiStation.findAll({
        attributes:['id', 'idx', 'name', 'lat', 'lng', 'capacity', 
            [db.sequelize.literal(`ABS(lat - ${req.query.lat}) + ABS(lng - ${req.query.lng})`), 'coord_diff']],
        order: db.sequelize.col('coord_diff'),
        limit: 10
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(400).end();
    })
});

// Return real time station data for stations identified by idx
router.get('/bixi/realtime', (req, res) => {
        getRealTimeData((data) => {
            const stationsArray = [];

            try{            
                req.body.idxArray.forEach(idx => {
                    stationsArray.push(data[idx]);
                });

                res.status(200).send(stationsArray);
            }
            catch{
                res.status(400).end();
            }
        });
});

module.exports = router;