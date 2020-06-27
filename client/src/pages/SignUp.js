import React from "react";

function SignUp() {
  return (
    <div>
        <h1>Welcome</h1>
        <h6>Already have an account?</h6>
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
            <h6>Forgot password?</h6>
            <a class="waves-effect waves-light btn">Sign Up</a>
        </div>
    </div>
    );
}

export default SignUp;