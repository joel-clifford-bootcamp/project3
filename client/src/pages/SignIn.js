import React from "react";
import { Link } from "react-router-dom";
import NavLanding from "../components/NavLanding"
import "../signin.css";
import Nav from "../components/Nav";


function SignIn() {
  return (
    <div class="row">
        <NavLanding />
        <div class="col s12 m6">
            <div className="card signIn">
                <h1>Welcome</h1>
                    <h6>New to Link-N-Park? <span className="signUpLink">
                        <Link className="signUpPageLink" to="/signup">Sign up</Link>
                        </span> for free!</h6>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate"/>
                                            <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" type="password" className="validate"/>
                                            <label for="password">Password</label>
                                    </div>
                                </div>
                            </form>
                            <a className="btn signInBtn">Sign In</a>
                        </div>

            </div>
        </div>
    </div>
  );
}

export default SignIn;