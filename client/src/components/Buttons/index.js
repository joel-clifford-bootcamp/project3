import React from "react"
import "./style.css";


export const PrimaryButton = props => (
    <div className="div">
        <a className={"btn"} 
            id="selectButton" onClick={props.onClick} 
            >{props.children}</a>
    </div>
)

