import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../src/App.css";
// import Navbar from "./components/navbar/navbar";
import Land from "./components/home/landing";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/profile/profile.js";
import "react-notifications/lib/notifications.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Forgetpassword from "./components/login/forgot_password";
import ResetPassword from "./components/login/reset_password";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path='/' exact strict>
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
      <div>
        <Route path='/profile'>
          <Profile />
        </Route>
      </div>
      <div>
        <Route path='/login/reset_password'>
          <Forgetpassword />
        </Route>
      </div>
      <div>
        <Route path='/change-password/:slug' component={ResetPassword}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
