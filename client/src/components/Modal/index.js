import "./style.css";
import React, { Component } from "react";
import { M } from "materialize-css";

class Modal extends Component {
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

  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
          id="modalLink"
        >
          Add Review
        </a>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
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
                    className="fas fa-star edit-star fa-lg"
                    data-rating="1"
                  ></i>
                  <i
                    className="fas fa-star edit-star fa-lg"
                    data-rating="2"
                  ></i>
                  <i
                    className="fas fa-star edit-star fa-lg"
                    data-rating="3"
                  ></i>
                  <i
                    className="far fa-star edit-star fa-lg"
                    data-rating="4"
                  ></i>
                  <i
                    className="far fa-star edit-star fa-lg"
                    data-rating="5"
                  ></i>
                </span>
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

export default Modal;
