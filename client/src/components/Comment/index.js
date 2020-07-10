import "./style.css";
import React, { Component } from "react";
// import Remarkable from 'remarkable';
// import RemarkableReactRenderer from 'remarkable-react';
import M from "materialize-css";

class Comments extends Component {
  

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
}

class CommentList extends Component {
  // rawMarkup() {
  //   let md = new Remarkable();
  //   let rawMarkup = md.render(this.props.children.toString());
  //   return { __html: rawMarkup };
  // }

  render() {
    return (
      <div>
        <div className="commentList">
          <p>Yeahhhh I am a CommentList.</p>
        </div>
        <div className="comment">
          <Comments author="Kevin Kim">Nice, Comment Box</Comments>
          <Comments author="Kevin Kim">Sometimes I talk to myself</Comments>
          <h2 className="commentAuthor">{this.props.author}</h2>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class CommentForm extends Component {
  render() {
    return (
      <div className="commentForm">Party Parrot time. I am a CommentForm.</div>
    );
  }
}

export { CommentList, CommentForm };
