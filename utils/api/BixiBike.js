const axios = require("axios");

function getStationData(successCb, errorCb) {
    axios({
        method:'get',
        url:'http://api.citybik.es/bixi-toronto.json'})
    .then( (response) => {
            successCb(response.data);
        })
    .catch(err => {
        if(erroCb)
            errorCb(err);
        else
            console.log(err);
    })
};

module.exports = getStationsData;