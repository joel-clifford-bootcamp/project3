const {LoremIpsum } = require('lorem-ipsum');
const { text } = require('express');

const generateComments = (db, userIds, stationIds) => {
    comments = [];
    const lorem = new LoremIpsum({
        sentencesPerParagraph:  {min: 1, max: 2},
        wordsPerSentence:       {min: 5, max: 10}
    });
    
    for(i = 0; i <= 5 * stationIds.length; i++){
        uIdx = Math.floor(userIds.length * Math.random());
        sIdx = Math.floor(stationIds.length * Math.random());

        let text = lorem.generateParagraphs(1);
        
        if(text.length > 255) 
            text = text.substring(0, 254); 
    
        comments.push({
            BixiStationId: stationIds[sIdx].id, 
            UserId: userIds[uIdx].id, 
            rating: 1 + Math.floor(4*  Math.random()),
            commentText: text});
    }

    db.StationComment.bulkCreate(comments);
};

module.exports = function(db) {

    console.log("seeding db");

    db.User.bulkCreate([
        { username: "joel", email: "joel@linknpark.com", password:"testpassword"},
        { username: "brice",  email: "brice@linknpark.com", password:"testpassword"},
        { username: "tobi",  email: "tobi@linknpark.com", password:"testpassword"},
        { username: "mossimo",  email: "massimo@linknpark.com", password:"testpassword"}
    ])
    .then(results => {
        
        db.User.findAll({ attributes:['id']}).then(users => {
            db.BixiStation.findAll({ attributes: ['id'] }).then(stations => {
                generateComments(db, users, stations)
            });
        });
    })
    .catch(err => {
       
        console.log("usernames already populated")
        db.User.findAll({ attributes:['id']}).then(users => {

            db.BixiStation.findAll({ attributes: ['id'] }).then(stations => {
                generateComments(db, users, stations)
            });
        });
    });
}

