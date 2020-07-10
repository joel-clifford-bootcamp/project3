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
  // // Setting our component's initial state
  // const [books, setBooks] = useState([]);
  // const [formObject, setFormObject] = useState({});

  // // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks();
  // }, []);

  // // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getBooks()
  //     .then((res) => setBooks(res.data))
  //     .catch((err) => console.log(err));
  // }

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then((res) => loadBooks())
  //     .catch((err) => console.log(err));
  // }

  // // Handles updating component state when the user types into the input field
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormObject({ ...formObject, [name]: value });
  // }

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
        <Row>
          <Col size="md-12 sm-12">
          <CommentBox />
          <div className="reveal" id="commentsModal" data-reveal>
      <form>
        <span className="display-inline-block">
          <h4 id="modal-title"></h4>
        </span>

        <label>
          Rating:
          <span className="rating-input">
            <i className="fas fa-star edit-star fa-lg" data-rating="1"></i>
            <i className="fas fa-star edit-star fa-lg" data-rating="2"></i>
            <i className="fas fa-star edit-star fa-lg" data-rating="3"></i>
            <i className="far fa-star edit-star fa-lg" data-rating="4"></i>
            <i className="far fa-star edit-star fa-lg" data-rating="5"></i>
          </span>
        </label>

        <label>
          Comments:
          <textarea id="comment" placeholder="What did you think of this location?"></textarea>
        </label>

        <button type="button" className="button" id="submitReview">Submit</button>
        </form>
        <button className="close-button" id="close-modal" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>

            <div className="off-canvas-wrapper">
              <div
                className="off-canvas-absolute position-right"
                id="off-canvas"
                data-off-canvas
                data-transition="overlap"
              >
                <div>
                  <div className="off-canvas-header secondary">
                    <h4 id="comments-title"></h4>
                  </div>
                  <ul
                    id="comments-list"
                    className="comments-list"
                    data-accordion
                  ></ul>
                </div>
              </div>
              <div
                className="off-canvas-content"
                style={{ minHeight: "300px" }}
                data-off-canvas-content
              >
                <input
                  id="pac-input"
                  className="controls"
                  type="text"
                  placeholder="Enter You Destination"
                />
                <div id="map"></div>
              </div>
            </div>

            {/* <div className="my-wrapper left-align-wrapper"> */}
            {/* <div className="center-align"> */}
            {/* <div className="row center"> */}
            <div className="valign-wrapper">
              <UserCard />
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="col-lg-12 md-12 s-12">
            <h4 className="activity">Recent Activity</h4>
            <Row size="row-cols-1 row-cols-md-2 pt-4 pb-4">
              <div className="container valign-wrapper center-align">
                <RecentActivityCard />
                <RecentActivityCard />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      </div>
    </Container>
  );
}

export default Profile;
