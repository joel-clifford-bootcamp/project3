const router = require('express').Router();
const commentsController = require("../../controllers/stationCommentsController");
const db = require('../../models');


router.route("/")
    .post(commentsController.createComment);

// Return 10 most recent StationComments for BixiStation with supplied id
router.route('/:station_id')
    .get(commentsController.getLatestComments)
    

module.exports = router;