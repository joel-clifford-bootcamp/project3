import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";

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

    comment['rating'] = 3;
    console.log(comment);

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

  render() {
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
            <form>
              <span className="display-inline-block">
                <h4 id="modal-title"></h4>
              </span>

              <div>
              <label>
                <div className="ratingHeading">
                Rating: 
                </div>
                <span className="rating">
                  <i
                    className="far fa-star edit-star fa-lg"
                    data-rating="1"
                  ></i>
                  <i
                    className="far fa-star edit-star fa-lg"
                    data-rating="2"
                  ></i>
                  <i
                    className="far fa-star edit-star fa-lg"
                    data-rating="3"
                  ></i>
                  <i
                    className="fas fa-star edit-star fa-lg"
                    data-rating="4"
                  ></i>
                  <i
                    className="fas fa-star edit-star fa-lg"
                    data-rating="5"
                  ></i>
                </span>
              </label>
              </div>

              <div>
                <label>
                  <div className="divAuthor">
                    Author: 
                    {/* {this.props.author} */}
                  </div>
                </label>
              </div>

              <div>
              <label>
              <div className="ratingHeading">
                Comments:
              </div>
                <textarea
                  id="comment"
                  class="materialize-textarea"
                  data-length="350"
                  placeholder="What did you think of this location?"
                  onChange={this.handleFieldChange}
                  value={this.state.comment.message}
                ></textarea>
                <label for="textarea2"></label>
              </label>
              </div>

              <button
                type="button"
                className="btn waves-effect waves-dark buttonTag"
                type="submit"
                name="action"
                id="submitReview"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </form>
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

export default ModalCommentContainer;
