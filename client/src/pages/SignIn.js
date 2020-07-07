import React, { useState } from "react";
import "../signin.css";

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log("email is " + email);
      console.log("password is " + password);
    };

  return (
    <div className="row">
        <div className="col s12 m6">
            <div className="card signIn">
                <h1>Welcome</h1>
                    <h6>New to Link-N-Park? <span className="signUpLink">Sign up</span> for free!</h6>
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
                            <button className="btn signInBtn" type="submit">Sign In</button>
                            </form>
                        </div>

            </div>
        </div>
    </div>
  );
}

export default SignIn;