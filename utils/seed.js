const {LoremIpsum } = require('lorem-ipsum');

const generateComments = (db, userIds, stationIds) => {
    comments = [];
    const lorem = new LoremIpsum({
        sentencesPerParagraph:  {min: 1, max: 4},
        wordsPerSentence:       {min: 5, max: 10}
    });
    
    for(i = 0; i <= 5 * stationIds.length; i++){
        uIdx = Math.floor(userIds.length * Math.random());
        sIdx = Math.floor(stationIds.length * Math.random());

        console.log(userIds[uIdx].id, stationIds[sIdx].id);

        comments.push({
            BixiStationId: stationIds[sIdx].id, 
            UserId: userIds[uIdx].id, 
            commentText: lorem.generateParagraphs(1)})
    }

    // db.StationComment.bulkCreate(comments);
};

module.exports = function(db) {

    console.log("seeding db");

    db.User.bulkCreate([
        { email: "joel@linknpark.com", password:"testpassword"},
        { email: "brice@linknpark.com", password:"testpassword"},
        { email: "laura@linknpark.com", password:"testpassword"},
        { email: "tobi@linknpark.com", password:"testpassword"},
        { email: "massimo@linknpark.com", password:"testpassword"}
    ]);

    db.User.findAll({ attributes:['id']}).then(users => {
        db.BixiStation.findAll({ attributes: ['id'] }).then(stations => {
            generateComments(db, users, stations)
        })
    });
}

