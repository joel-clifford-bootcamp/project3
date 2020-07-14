import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../assets/link-n-park.png";
import axios from "axios";


const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = e => {
      e.preventDefault();
    //   console.log("email is " + email);
    //   console.log("password is " + password);

      if (!email || !password) {
        return;
      }
  
      signinUser();
    }


  const signinUser = () => {
    axios.post("/api/users/signin", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/home");
      })
      .catch(function(err) {
        console.log(err);
      });
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
        <div className="col s12 m6 offset-m2">    
            <div className="card signIn">
                <h2>Welcome</h2>
                    <h6>New to <i><b>Link-N-Park?</b></i> <span className="signUpLink">
                        <Link className="signUpPageLink" to="/signup">Sign up</Link>
                        </span> for free!</h6>
                        <div className="row">
                            <form onSubmit={handleSubmit}>
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
                                    <div className="input-field col s12 password">
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
                            <button className="btn signInBtn" type="submit">Sign In</button>
                            </form>
                        </div>

            </div>
        </div>
    </div>    
        </div>
  );
}

export default SignIn;