import React from "react";
import { Link, Route } from "react-router-dom";

function Forbidden() {
  return (
    <div className='forbidden-top'>
      <div className='forbidden-inner'>
        <div>
          <p style={{ fontSize: "100px" }}>403 Forbidden</p>
          <hr />
        </div>
        <div>
          <h3>Access to this resource on the server is denied</h3>
        </div>
        <div>
          <h6>You need to be logged in as a user to access this page</h6>
        </div>
        <hr />
        <div>
          <h6>
            Click on <Link to='/login'>LOGIN</Link> to login. If not registered
            click on <Link to='/register'>REGISTER</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;
