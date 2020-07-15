import React from "react";
import "./style.css";

export default function Comment(props) {
  const { name, message, time } = props.comment;

  return (

    <div>
      <div className="col s12 comment-container1">
        <div className="row ratingHeading comment-container2">
        <div className="col s12 comment-container3">
          Rating:
          <label>
            {/* <div className="ratingHeading">Rating:</div> */}
            <span className="rating">
              <i className="far fa-star edit-star fa-lg" data-rating="1"></i>
              <i className="far fa-star edit-star fa-lg" data-rating="2"></i>
              <i className="far fa-star edit-star fa-lg" data-rating="3"></i>
              <i className="fas fa-star edit-star fa-lg" data-rating="4"></i>
              <i className="fas fa-star edit-star fa-lg" data-rating="5"></i>
            </span>
          </label>
          </div>
        </div>
        <div className="row comment-container4">
          <div className="col s12 comment-container5">
            {/* <p className="date-example">At ${moment(createdAt).format("h:mma on dddd, MMMM Do YYYY")}</p> */}
            <p className="date-example">At <small className="float-right text-muted">{time}</small> on 12 July 2020</p>
            <p className="thank-example">{message}</p>
            <p className="author-name">
              Written by <span class="name-example">{name}</span>
            </p>
            <a
              className="waves-effect waves-light btn delete-thank"
              data-id="1"
            >
              <i class="material-icons">delete</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}