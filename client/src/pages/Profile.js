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

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: ""
  });

  // // Setting our component's initial state
  // const [books, setBooks] = useState([]);
  // const [formObject, setFormObject] = useState({});

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


  // // When the form is submitted, use the API.saveBook method to save the book data
  // // Then reload books from the database
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.saveBook({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis,
  //     })
  //       .then((res) => loadBooks())
  //       .catch((err) => console.log(err));
  //   }
  // }

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
