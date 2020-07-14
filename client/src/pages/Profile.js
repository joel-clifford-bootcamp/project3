import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { UserCard, RecentActivityCard } from "../components/ProfileCard";
import ProfileContainer from "../components/ProfileContainer";
import CommentBox from "../components/CommentBox";
import Nav from "../components/Nav";
import "../style.css";

function Profile() {
  // Setting our component's initial state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: ""
  });

  // Load all information and store it
  useEffect(() => {
    loadUserData();
  }, []);

  // Loads all information and sets it
  function loadUserData() {
    API.getUserDetails()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Nav />
      <div className="profileBackground">
      <Container>
              <UserCard name={user.firstName + " " + user.lastName} email={user.email}/>
          {/* <div className="col s12 m6 offset-m4"> */}
            {/* <h4 className="activity">Recent Activity</h4>
            <Row size="row-cols-1 row-cols-md-2 pt-4 pb-4">
              <div className="container valign-wrapper center-align">
              <RecentActivityCard />
              <RecentActivityCard />
              <RecentActivityCard /> */}
              {/* </div>
            </Row>
          </div> */}
      </Container>
      </div>
    </Container>
  );
}

export default Profile;
