import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";

export function CommentList() {

  return (
    <div>
      <div className="commentList">
        <p>Yeahhhh I am a CommentList.</p>
      </div>
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        {this.props.children}
      </div>
    </div>
  );
}

export function CommentForm() {
  return (
    <div className="commentForm">Party Parrot time. I am a CommentForm.</div>
  );
}
export default CommentForm;
