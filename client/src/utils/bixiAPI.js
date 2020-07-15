import axios from "axios";

export default {
    getStations: function() {
        return axios.get(`http://api.citybik.es/bixi-toronto.json`);
    }
};