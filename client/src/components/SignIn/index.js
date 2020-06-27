import React from "react";

function SignIn() {
  return (
      <div>
          <h1>Welcome</h1>
            <h6>New to Link-N-Park? Sign up for free!</h6>
                <div className="row">
                    <form className="col s12">
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
                    </form>
                    <a className="waves-effect waves-light btn">Sign In</a>
                </div>
      </div>
  );
}

export default SignIn; 