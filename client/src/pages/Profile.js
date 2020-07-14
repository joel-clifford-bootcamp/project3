import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { UserCard, RecentActivityCard } from "../components/ProfileCard";
import ProfileContainer from "../components/ProfileContainer";
import CommentBox from "../components/CommentBox";
import Nav from "../components/Nav";
import "../style.css";

function Profile() {

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

  // Loads all books and sets them to books
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
