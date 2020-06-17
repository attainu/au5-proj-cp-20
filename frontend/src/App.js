import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/App.css";
// import Navbar from "./components/navbar/navbar";
import Land from "./components/home/landing"
import Login from "./components/login/login";
import Register from "./components/register/register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path='/' exact>
          <Land />
        </Route>
      </div>
      <div>
        <Route path='/login' exact strict>
          <Login />
        </Route>
      </div>
      <div>
        <Route path='/register' exact strict>
          <Register />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
