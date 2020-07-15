import "./style.css";
import React from "react";
import Comment from "../Comment";

function CommentBox(props) {

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
            <Comment key={index} comment={comment} />

          ))}
        </div>
      );
    }

export default CommentBox;
