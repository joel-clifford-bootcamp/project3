const axios = require("axios");

/**
 * Retrieve data fomr Bixi Bikes Toronto
 * @param {function} successCb callback on success
 * @param {function} errorCb  callback on error
 */
module.exports = function(successCb, errorCb=null) {
    axios({
        method:'get',
        url:'http://api.citybik.es/bixi-toronto.json'})
    .then( (response) => {
            successCb(response.data);
        })
    .catch(err => {
        if(errorCb)
            errorCb(err);
        else
            console.log(err);
    });
};