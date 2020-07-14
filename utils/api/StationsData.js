const axios = require("axios");

module.exports = _ => new Promise((resolve, reject) => {
    axios({
        method:'get',
        url:'http://api.citybik.es/bixi-toronto.json'
    })
    .then( response => resolve(response.data))
    .catch(err => reject(err));
});