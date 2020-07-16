import "./style.css";
import React, { Component, useState, useEffect } from "react";
import { ModalButton, ModalComment } from "../Modal";
import CommentBox from "../CommentBox";
import { Container, Row, Column } from "../GridComponents";
import { PrimaryButton } from "../Buttons";
import api from "../../utils/API";
import Moment from 'react-moment';
import 'moment-timezone';


// Display today's date in the "Infobox" using moment.js
// dateTodayEntry.text(moment().format("dddd, MMMM Do, YYYY").toString());

function InfoBoxString(props) {
  const comments = [];
  const [bikesAvailable, setBikesAvailable] = useState(null);
  const [spotsAvailable, setSpotsAvailable] = useState(null);

  useEffect(() => {
    api
      .getComments(props.place.id)
      .then((resp) => (comments = resp.data))
      .catch((err) => console.log(err));
  });

  const addComment = (comment) => {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments],
    });
  };

  const toUpperCaseFilter = (d) => {
    return d.toUpperCase();
};

  return (
    <Container>
      <Row>
        <h5 className="LocationName">{props.name}</h5>
      </Row>
      <Row>
        <Column width="2" className="commentTable"></Column>
        <Column width="6" className="commentTable">
          Bike(s) Available:
        </Column>
        <Column width="3">{props.place.currentData.bikes}</Column>
        <Column width="1" className="commentTable"></Column>
      </Row>
      <Row>
        <Column width="2" className="commentTable"></Column>
        <Column width="6" className="commentTable">
          Empty Spaces:
        </Column>
        <Column width="3">{props.place.currentData.free}</Column>
        <Column width="1" className="commentTable"></Column>

      </Row>
      <Row>
        <Column width="1" className="commentTable"></Column>
        <Column width="11" className="commentTable">
          <Moment local>{props.place.currentData.timestamp}</Moment>
        </Column>
      </Row>
      <Row>
        <Column width="6">
          <ModalButton addComment={addComment} />
        </Column>
        <Column width="6">
          <PrimaryButton>Select</PrimaryButton>
        </Column>
      </Row>
      {/* <Row>
          <CommentBox
            loading={this.state.loading}
            comments={this.state.comments}/>
          </Row> */}
    </Container>
  );
}

export default InfoBoxString;
