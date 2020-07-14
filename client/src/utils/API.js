import axios from "axios";

export default {
  // Gets all books
  getUserDetails: function() {
    return axios.get("/api/users/user_data");
  }
};
