import axios from "axios";

export default {
  /**
   * Get detailed informatio for current user
   */
  getUserDetails: function() {
    return axios.get("/api/users/user_data");
  },

  /**
   * Retrieve the 10 Bixi bike stations closest to a reference location
   * @param {double} lat latitude on which to centre search 
   * @param {double} lng longitude on wich to centre search
   */
  getBixiBikeLocations: function(lat, lng) {
    return axios.get(`/api/bixi/?lat=${lat}&lng=${lng}`)
  },

  /**
   * Retreive the 10 most recent comments for a bixi station
   * @param {int} stationId id of station for which to retrieve comments
   */
  getComments: function(stationId) {
    return axios.get(`/api/bixi/comments/${stationId}`);
  },

  /**
   * Post a new comment for a bixi bike station
   * @param {object} comment comment object to be saved
   */
  postComment: function(comment) {
    return axios.post("/api/bixi/comments", comment)
  },

  /**
   * Get realtime bike/availability data for select location
   * @param {Array} stationIds array of station ids to return real-time data for
   */
  getBixiStationAvailability: function(stationIds){
    return axios.post("/api/bixi/realtime", { stations: stationIds } );
  }
};
