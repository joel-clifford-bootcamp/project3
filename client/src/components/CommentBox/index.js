import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";
import { Comments, CommentList, CommentForm } from "../Comment";


function CommentBox() {
  return (
    <div className="commentBox">
      <h1>WOO My Comment Box</h1>
      <h2>We created a React div component! WOO!</h2>
      <CommentList />
      <CommentForm />
    </div>
  );
}

export default CommentBox;
