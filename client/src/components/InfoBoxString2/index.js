import "./style.css";
import React, { Component } from "react";
import { ModalButton } from "../ModalButton";
import ModalComment from "../ModalComment";
import CommentBox from "../CommentBox";
import M from "materialize-css";

export function ModalView() {

  return (
    <div class="div">
      <a
        className="waves-effect waves-light btn modal-trigger"
        data-target="modal2"
        id="modalViewLink"
      >
        View Comments
      </a>
    </div>
  );
}

class ModalCommentContainer extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        name: "",
        message: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
    console.log("this.state.comment.message", this.state.comment.message);
    console.log("event.target.value", event.target.value);

  };

  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    fetch("http://localhost:3001", {
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render(props) {
    return (
      <>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"
        >
          <div className="modal-content" id="commentsModal" data-reveal>
          <CommentBox
              loading={this.state.loading}
              comments={this.state.comments}
            />
            <div class="modal-footer">
              <button
                className="modal-close buttonTag"
                id="close-modal"
                data-close
                aria-label="Close modal"
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export default ModalCommentContainer;


class InfoBoxString2 extends Component {
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
            <ModalView />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export { InfoBoxString2, ModalCommentContainer };
