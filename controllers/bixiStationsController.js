const db = require("../models");
const seed = require("../utils/seed");
const getRealTimeData = require("../utils/api/StationsData");

module.exports = {

    seed: function(req, res) {
        seed(db);
        res.json({"message": "seeding users and comments"});
    },
    getNearest: function(req, res) {
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
        });
    },
    
    getRealTime:  function(req, res) {
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
    }

}
