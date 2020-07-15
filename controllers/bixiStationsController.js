const db = require("../models");
const seed = require("../utils/seed");
const getRealTimeData = require("../utils/api/StationsData");
const { red } = require("chalk");
const refreshBixiStations = require("../utils/import/bixiStations");

module.exports = {

    seed: function(req, res) {
        seed(db);
        refreshBixiStations();
        res.json({"message": "seeding users and comments"});
    },

    getNearest: function(req, res) {
        db.sequelize
        .query(`SELECT id, name, lat, lng, coordDiff, commentCount, averageRating
            FROM (
            SELECT *, ABS(lat - ${req.query.lat}) + ABS(lng - ${req.query.lng}) AS coordDiff
            FROM BixiStations
            LEFT JOIN
            ( SELECT BixiStationId, COUNT(id) AS commentCount, ROUND(AVG(rating),1) AS averageRating
            FROM StationComments
            GROUP BY BixiStationId) AS comments
            ON BixiStations.id = comments.BixiStationId) AS s
            ORDER BY coordDiff
            LIMIT 10;`, 
          {type: db.sequelize.QueryTypes.SELECT})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
    },
    
    getRealTime:  function(req, res) {
        getRealTimeData()
        .then(data => {
            
            const selectedStations = data.filter(station => req.body.stations.includes(station.number));

            res.status(200).json(selectedStations);
        })
        .catch(err => res.status(400).json(err))
    }

}
