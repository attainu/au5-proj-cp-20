import React from "react";
import { Route } from "react-router-dom";

class Forbidden extends React.Component {
  render() {
    return (
      <Route path='/forbidden'>
        <div>
          <h1>Forbidden</h1>
          <img
            src='https://docs.litespeedtech.com/imgs/cp/cpanel/troubleshoot/403.png'
            alt=''
          />
        </div>
        <hr />
        <div>You do not have permission to access this page</div>
      </Route>
    );
  }
}

export default Forbidden;
