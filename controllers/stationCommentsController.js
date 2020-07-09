const db = require("../models");

module.exports = {

    getLatestComments: function(req, res) {
        
        const stationId = req.params.station_id;

        db.StationComment.findAll({
            attributes: ['id', 'commentText','createdAt'],
            where: { BixiStationId: stationId },
            order: [['createdAt', 'DESC']],
            include: [db.User],
            limit: 10
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).end();
      });
    }
}