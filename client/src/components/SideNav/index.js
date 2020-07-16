import React, { Component } from "react"
import M from "materialize-css";

export class SideNav extends Component {

    componentDidMount(){
        M.Sidenav.init(this.Modal, {});
    }

    render(){
        <ul id="slide-out" className="sidenav">
            {props.children}
        </ul>
    }
}

export const OpenSideNavButton = (props) => {

    return( <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>)
}

