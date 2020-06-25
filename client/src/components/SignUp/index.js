import React from "react";

function SignUp() {
  return (
    <div className="row">
        <form className="col s12">
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" class="validate">
                        <label for="email">Email</label>
                    </input>
                </div>
            </div>
            <div className="row">
                <div classNme="input-field col s12">
                    <input id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </input>
                </div>
            </div>
        </form>
    </div>
  );
}

export default SignUp;