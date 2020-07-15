import React from "react"

export const PrimaryButton = props => (
    <div className="div">
        <a class={"waves-effect waves-light btn"} onClick={props.onClick}>{props.children}</a>
    </div>
)