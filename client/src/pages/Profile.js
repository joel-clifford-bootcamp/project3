import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { UserCard } from "../components/ProfileCard";
import Nav from "../components/Nav";
import "../style.css";

function Profile(props) {
  // Setting our component's initial state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: ""
  });

  // Load all books and store them with setBooks
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
      </Container>
      </div>
    </Container>
  );
}

export default Profile;
