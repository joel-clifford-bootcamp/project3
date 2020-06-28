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

function Profile() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Profile</h1>
          </Jumbotron>
        </Col>
        <Col size="md-12 sm-12">
            <div className="container" 
            style={{
                margin: "auto",
                padding: "10px",
                width: "50%",
                textAlign: "center"  
            }}>
            <UserCard />
            <h3 className="userNameHeading red-text text-lighten-2" style={{margin: "10px", textAlign: "center"}}>USER NAME</h3>
            <p className="userEmailHeading" style={{textAlign: "center"}}>
              <a href="mailto:user@email.com" target="_blank" style={{margin: "10px", color: "cyan darken-1"}}>
                user@email.com
              </a>
            </p>
            <RecentActivityCard />
            <RecentActivityCard />
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;