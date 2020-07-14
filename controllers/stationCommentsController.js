const db = require("../models");

module.exports = {

    // Get latest 10 comments for station in url
    getLatestComments: function(req, res) {
        
        const stationId = req.params.station_id;

        db.StationComment.findAll({
            attributes: ['id', 'commentText','createdAt'],
            where: { BixiStationId: stationId },
            order: [['createdAt', 'DESC']],
            include: [db.User],
            limit: 50
        }).then(data => res.status(200).send(data))
        .catch(err =>  res.status(400).json(err));
    },

    // Create a new comment
    createComment: function(req, res) {

        const userId = 1;

        db.StationComment.create({
            UserId: userId,
            BixiStationId: req.body.stationId,
            rating: req.body.rating,
            commentText: req.body.commentText
        })
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).json(err));

    }
}