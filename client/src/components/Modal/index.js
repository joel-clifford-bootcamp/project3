import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";
import api from "../../utils/API"

class ModalButton extends Component {
  
  state = {
    showModal: false
  }

  handleOpenModal() {

    this.setState({
      showModal: true,
    })

  }

  handleCloseModal() {

    this.setState({
      showModal: false,
    })
  }

  render(props) {


  return (
    <div className="div">
      <a
        className="btn modal-trigger"
        data-target="modal1"
        id="modalLink"
        // onClick={() => this.setState({
        //   showModal: true,
        // })}
      >
        Add Review
      </a>
    </div>
  );
}

}

class ModalComment extends Component {
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
  
  state = {
    loading: false,
    error: "",
    comment: "",
  }

  ///constructor(props) {
    //super(props);
    //this.state = {
      //loading: false,
      //error: "",
      //comment: '',
      //comment: {
      //  name: "",
      //  message: "",
      //},
    //};

    // bind context to methods
  //   this.handleFieldChange = this.handleFieldChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = (event) => {
    const { value, name } = event.target;

    this.setState({comment: {message:value}})
    // this.setState({
    //   ...this.state,
    //   comment: {
    //     ...this.state.comment,
    //     [name]: value,
    //   },
    // });
    // console.log("this.state.comment.message", this.state.comment.message);
    // console.log("event.target.value", event.target.value);
  };

  onSubmit = (e) =>{
  
    // prevent default form submission
    e.preventDefault();

    // this.setState({
    //   showModal: false,
    // })
    // this.handleCloseModal();

    
    M.toast({html: 'Comment posted!'})
   


    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;

      comment['rating'] = 3;
      comment['stationId'] = 7000;
      console.log(comment); 
    
      api.postComment(comment)
      .then((res) => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "" },
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false,
        });
      });
      // this.handleCloseModal();
  }

  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (

      // M.toast({html: 'error!'})
      M.toast(this.state.error)

    ) : null;
  }

  render(props) {
    return (
      <>
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
                  <div className="divLocation">
                    Location: 
                  </div>
                </label>
              </div>

              <div>
                <label>
                  <div className="ratingHeading">Rating:
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
                      className="far fa-star edit-star fa-lg"
                      data-rating="4"
                    ></i>
                    <i
                      className="far fa-star edit-star fa-lg"
                      data-rating="5"
                    ></i>
                  </span>
                  </div>
                </label>
              </div>
              
              <div>
                <label>
                  <div className="divAuthor">
                    Author: {this.props.author}
                  </div>
                </label>
              </div>

              <div>
                <label>
                  <div className="ratingHeading">Comments:</div>
                  <textarea
                    id="comment"
                    className="materialize-textarea"
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
                aria-label="Close modal"
                // data-target="close-modal"
                data-close
                onClick={this.onSubmit}
                // options={{html: 'Commented submited!'}}
              >
                <span aria-hidden="true" 
                className="submitCommentBuffon" 
                style={{ fontWeight: "lighter" }}
                >Submit</span>
              </button>
            </form>
            <div className="modal-footer">
              <button
                className="modal-close buttonTag"
                id="close-modal"
                data-close
                aria-label="Close modal"
                type="button"
                // onClick={() => this.setState({
                //   showModal: false,
                // })}
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
export { ModalButton, ModalComment };

// export default ModalComment;

// For back-end? .send or .json?
// .then(data => res.status(200).json(data))
