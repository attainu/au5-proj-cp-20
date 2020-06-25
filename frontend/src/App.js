import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../src/App.css";
// import Navbar from "./components/navbar/navbar";
import Land from "./components/home/landing";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/profile/profile.js";
import TabsDefault from "../src/components/home/postCreate"
import "react-notifications/lib/notifications.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Forgetpassword from "./components/login/forgot_password";
import ResetPassword from "./components/login/reset_password";

function App() {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Route path='/' exact strict>
          <Land />
        </Route>
      </div>
      <div className='wrapper1'>
        <Route path='/login' exact strict>
          <Login />
        </Route>
      </div>
      <div className='wrapper1'>
        <Route path='/register' exact strict>
          <Register />
        </Route>
      </div>
      <div className='wrapper-profile'>
        <Route path='/profile'>
          <Profile />
        </Route>
      </div>
      <div className='wrapper'>
        <Route path='/login/reset_password'>
          <Forgetpassword />
        </Route>
      </div>
      <div className='wrapper'>
        <Route path='/change-password/:slug' component={ResetPassword}></Route>
      </div>
      <div className='wrapper'>
        <Route path='/create' component={TabsDefault}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
