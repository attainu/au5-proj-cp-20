import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login/login.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MDBInput, MDBBtn } from "mdbreact";
import { sendSignupData } from "../../Redux/actions/register_action";
import { GoogleLogin } from "react-google-login";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    error_msg: {
      password_error: "",
      c_password_error: "",
    },
  };

  responseGoogle = (response) => {
    console.log(response);
  };

  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    if (event.target.value.length < 8) {
      this.setState({
        error_msg: { password_error: "Password Must be 8 characters long" },
      });
    } else if (event.target.value.length >= 8) {
      this.setState({ error_msg: { password_error: "" } });
      this.setState({ password: event.target.value });
    }
  }
  handleConfirmPassword(event) {
    const password = this.state.password;
    const confirm_password = event.target.value;
    if (password !== confirm_password) {
      this.setState({ error_msg: { c_password_error: "Password Mismatch" } });
    }
    if (password === confirm_password) {
      this.setState({ error_msg: { c_password_error: "" } });
      this.setState({ confirm_password: event.target.value });
    }
  }
  handleClick = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    console.log(this.state);
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    if (
      this.state.name.length !== 0 &&
      this.state.email.length !== 0 &&
      this.state.password.length !== 0 &&
      this.state.confirm_password.length !== 0
    ) {
      this.props.sendSignupData(data);
    }
  };
  render() {
    return (
      <div>
        <div className='login_div'>
          <div className='head_div'>REGISTER</div>
          <hr />
          <div className='form_div'>
            <form
              className='needs-validation'
              onSubmit={this.handleClick}
              noValidate>
              <div className='form-group'>
                <MDBInput
                  label='Full Name'
                  type='text'
                  icon='user'
                  size='sm'
                  onChange={(event) => this.handleName(event)}
                  outline
                  required>
                  <div className='invalid-feedback'>
                    Please enter your Name.
                  </div>
                </MDBInput>
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Email'
                  type='email'
                  icon='envelope'
                  size='sm'
                  onChange={(event) => this.handleEmail(event)}
                  outline
                  required>
                  <div className='invalid-feedback'>
                    Please enter a valid email address containing '@'.
                  </div>
                </MDBInput>
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Password'
                  type='password'
                  icon='key'
                  size='sm'
                  onChange={(event) => this.handlePassword(event)}
                  minLength='8'
                  outline
                  required>
                  <div className='error_div'>
                    {this.state.error_msg.password_error}
                  </div>
                  <div className='invalid-feedback'></div>
                </MDBInput>
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Confirm Password'
                  type='password'
                  icon='clipboard-check'
                  size='sm'
                  onChange={(event) => this.handleConfirmPassword(event)}
                  minLength='8'
                  maxLength={this.state.password.length}
                  outline
                  required>
                  <div className='invalid-feedback'>
                    {this.state.error_msg.c_password_error}
                  </div>
                </MDBInput>
              </div>
              <MDBBtn rounded gradient='blue' type='submit'>
                Register
              </MDBBtn>
            </form>
            <div className='social_register'>
              <GoogleLogin
                clientId='189392606316-gophi88gi150u8rg4b0gotokdfe36ufk.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className='info-div-login'>
              Forgot Password ? <Link to='/forgot-password'>Click Here</Link> to
              reset.
            </div>
            <div className='info-div-login'>
              Already a user..? <Link to='/login'>Click Here</Link> to Login
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  return {};
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ sendSignupData }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Register);
