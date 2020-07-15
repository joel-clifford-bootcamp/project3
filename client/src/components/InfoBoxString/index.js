import "./style.css";
import React, { Component, useState, useEffect } from "react";
import { ModalButton, ModalComment } from "../Modal";
import CommentBox from "../CommentBox";
import { Container, Row, Column } from "../GridComponents";
import { PrimaryButton } from "../Buttons"
import api from "../../utils/API";

function InfoBoxString(props) {

  const comments = [];
  const [bikesAvailable, setBikesAvailable] = useState(null);
  const [spotsAvailable, setSpotsAvailable] = useState(null);

  useEffect(() => {
    api.getComments(props.place.id)
    .then(resp => comments = resp.data)
    .catch(err => console.log(err));
  });

  const addComment = (comment) => {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  return (
    <Container>
        <Row>
          <h5 className="LocationName">{props.name}</h5>
        </Row>
        <Row>
          <Column width="9">Bike Available:</Column>
          <Column width="3">{props.place.currentData.bikes}</Column>
        </Row>
        <Row>
          <Column width="9">Empty Spaces:</Column>
          <Column width="3">{props.place.currentData.free}</Column>
        </Row>
        <Row>
          <p>updated at ${props.place.currentData.timestamp}</p>
        </Row>
        <Row>
          <Column width="6">
            <ModalButton addComment={addComment}/>
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
