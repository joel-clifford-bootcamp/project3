import React, { useState } from "react";
import "../signin.css";


const SignUp = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = e => {
      e.preventDefault();
      console.log("first name is " + firstName);
      console.log("last name is " + lastName);
      console.log("email is " + email);
      console.log("password is " + password);
    };

  return (
    <div className="row">
        <div className="col s12 m1">
            <img src="../assets/logo1.png" alt="Full White Logo"></img>
        </div>
        <div className="col s12 m6">
            <div className="card signIn">
                <h1>Welcome</h1>
                <h6>Already have an <span className="signUpLink">account?</span></h6>
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                id="first_name" 
                                type="text" 
                                className="validate"
                                placeholder="First Name"
                                name="firstName"
                                onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="input-field col s6">
                                <input 
                                id="last_name" 
                                type="text" 
                                className="validate"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                    id="email" 
                                    type="email" 
                                    className="validate"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                    id="password"
                                    type="password" 
                                    className="validate"
                                    placeholder="Password"
                                    name="password"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                    id="confirmPassword" 
                                    type="password" 
                                    className="validate"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div> */}
                            <button className="btn signInBtn" type="submit">Sign Up</button>
                        </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignUp;