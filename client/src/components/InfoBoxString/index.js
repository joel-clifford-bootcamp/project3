import "./style.css";
import React, { Component } from "react";
import { ModalButton } from "../Modal";
import ModalComment from "../ModalComment";
import CommentBox from "../CommentBox";
import M from "materialize-css";

class InfoBoxString extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);

  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  addComment(comment){
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  render(props) {
    return (
      <div>
        {/* <div id="content"> */}
        {/* <div id="siteNotice"></div> */}
        {/* <h1 id="firstHeading" class="firstHeading">
          Location
        </h1> */}
        <div id="bodyContent">
          <div>
            <h5 className="LocationName">Location Name</h5>
          </div>
          <div>
            <p className="addressLine1">42 Wallaby Way</p>
            <p className="cityAndProvinceAndPostalCode">Sydney, NSW</p>
            <p className="country">Australia</p>
          </div>
          <div>
            <p className="ratingCount">No Ratings</p>
          </div>
          <div>
            <p className="capacity">Capacity: 0</p>
          </div>
          <div>
            <ModalButton addComment={this.addComment}/>
          </div>
          <div>
            <CommentBox
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default InfoBoxString;
