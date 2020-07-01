import React from "react";
import { Link } from "react-router-dom";
import NavLanding from "../components/NavLanding"
import "../signup.css";

function SignUp() {
  return (
    <div class="row">
        <NavLanding />
        <div class="col s12 m6">
            <div className="card signIn">
                <h1>Welcome</h1>
                <h6>Already have an <span className="signUpLink">
                    <Link className="signInPageLink" to="/signin">account?</Link>
                    </span></h6>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" className="validate"/>
                                <label for="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" type="text" className="validate"/>
                                <label for="last_name">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="validate"/>
                                        <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div classNme="input-field col s12">
                                    <input id="password" type="password" className="validate"/>
                                        <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div classNme="input-field col s12">
                                    <input id="confirmPassword" type="password" className="validate"/>
                                        <label for="confirmPassword">Confirm Password</label>
                                </div>
                            </div>
                    </form>
                    <a className="btn signInBtn">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignUp;