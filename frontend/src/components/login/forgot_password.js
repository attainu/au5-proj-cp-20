import React from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../../styles/login/forgot_password.css";
import { MDBBtn, MDBInput } from "mdbreact";

class Forgetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", errors: {} };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = (e) => {
    // e.preventDefault();
    console.log(e.target.value);
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleForm = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      NotificationManager.warning("Email is Required");
      return false;
    }
    const data = { email: this.state.email };
    axios({
      method: "post",
      url: "http://localhost:8000/register/reset",
      data,
    })
      .then((res) => {
        console.log(res);
        NotificationManager.success(
          "Password Reset link sent to you email .Please check the your email.Link Will be Valid For 30 min"
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 404)
          NotificationManager.error(err.response.data.msg);
        else NotificationManager.error("Something Went Wrong");
        this.setState({ errors: err.response });
      });
  };
  render() {
    return (
      <div className='content'>
        <NotificationContainer />
        <form onSubmit={this.handleForm}>
          <div className='row' id='fg-row'>
            <div className='fg-col'>
              <div className='card bg-dark text-light' id='reset-card'>
                <div className='card-header text-center'>Forgot Password</div>
                <div className='card-body bg-dark-gray'>
                  <div className='form-group'>
                    <label>Please provide your email address</label>
                    <MDBInput
                      name='email'
                      value={this.state.email}
                      onChange={this.handleInput}
                      label='Email'
                      type='email'
                      icon='envelope'
                      outline
                      required>
                      <div className='invalid-feedback'>
                        Please Enter Your Email.
                      </div>
                    </MDBInput>
                  </div>
                </div>
                <input
                  type='button'
                  id='reset-button'
                  value='send Mail'
                  onClick={this.handleForm}
                  className='btn btn-primary'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  return {
    state: state,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Forgetpassword);
