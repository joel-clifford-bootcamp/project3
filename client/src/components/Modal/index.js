import "./style.css";
import React, { Component } from "react";
import M from "materialize-css";

export function ModalButton() {

    return (
      <div>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
          id="modalLink"
        >
          Add Review
        </a>
      </div>
    );
  }

