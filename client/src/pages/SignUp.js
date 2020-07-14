import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../assets/link-n-park.png";
import axios from "axios";


const SignUp = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = e => {
      e.preventDefault();
    //   console.log("first name is " + firstName);
    //   console.log("last name is " + lastName);
    //   console.log("email is " + email);
    //   console.log("password is " + password);'
        signUpUser()
    };

    const signUpUser = _ => {
        axios.post("/api/users/signup", {
          firstName: firstName,
          lastName: lastName,
          username: firstName + lastName,
          email: email,
          password: password
        })
        .then(function(data) {
            console.log(data);
            window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(err => handleLoginErr);
      }
    
      function handleLoginErr(err) {
        //$("#alert .msg").text(err.responseJSON);
        // $("#alert").fadeIn(500);
      }

  return (
<div className="signUpBackground">  
    <nav className="transparent z-depth-0">
        <div className="nav-wrapper">
            <div className="brand-logo">
                <img className="signinLogo" src={logo} alt="Full White Logo"></img>
            </div> 
        </div>
    </nav>              
<div className="row valign-wrapper primary">      
    <div className="col s12 m6 offset-m2 cardSize">    
            <div className="card signIn">
                <h2>Welcome</h2>
                <h6>Already have an <span className="signUpLink">
                    <Link className="signInPageLink" to="/signin">account?</Link>
                    </span></h6>
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                id="first_name" 
                                type="text"
                                maxLength ="30" 
                                className="validate"
                                placeholder="First Name"
                                name="firstName"
                                onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="input-field col s6">
                                <input 
                                id="last_name"
                                maxLength="30" 
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
                            <button className="btn signInBtn" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default SignUp;