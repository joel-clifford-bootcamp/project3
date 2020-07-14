import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";
import { Comments, CommentList, CommentForm } from "../Comment";
import ModalComment from "../ModalComment";
import ModalButton from "../Modal";


function CommentBox(props) {
// // Medium CommentBOX https://medium.com/@gsuppy/coding-an-interactive-comment-box-with-react-js-50d7d20587d8
// class CommentBox extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       comments: [],
//       loading: false
//     };

//     this.addComment = this.addComment.bind(this);

//   }

//   componentDidMount() {
//     // loading
//     this.setState({ loading: true });

//     // get all the comments
//     fetch("http://localhost:3001")
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           comments: res,
//           loading: false
//         });
//       })
//       .catch(err => {
//         this.setState({ loading: false });
//       });
//   }

//   addComment(comment){
//     this.setState({
//       loading: false,
//       comments: [comment, ...this.state.comments]
//     });
//   }

//     render(props) {
    // <div className="commentBox">
    //   <h1>WOO My Comment Box</h1>
    //   <h2>We created a React div component! WOO!</h2>
    //   <CommentList data={this.props.data} />
    //   {/* <CommentList /> */}
    //   <CommentForm />
    // </div>

    // link: https://www.qcode.in/learn-react-by-creating-a-comment-app/
    return (

        <div className="commentList">
          <h6 className="text-muted mb-4">
            <span className="badge badge-success">{props.comments.length}</span>{" "}
            Reviews{props.comments.length > 0 ? "s" : ""}
          </h6>
    
          {props.comments.length === 0 && !props.loading ? (
            <div className="alert text-center alert-info">
              Be the first to review!
            </div>
          ) : null}
    
          {props.comments.map((comment, index) => (
            <ModalComment key={index} comment={comment} />
          ))}
        </div>
      );
    }
// }

export default CommentBox;
