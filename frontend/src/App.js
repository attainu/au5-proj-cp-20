import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/App.css";
// import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path='/login'>
          <Login />
        </Route>
      </div>
      <div>
        <Route path='/register'>
          <Register />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
