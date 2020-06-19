import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../../styles/login/login.css";
import { MDBInput, MDBBtn } from "mdbreact";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { sendLoginData } from "../../actions/register_action";
import { GoogleLogin } from "react-google-login";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error_msg: null
  };
  responseGoogle = (response) => {
    console.log(response);
  };
  handleEmail(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handlePassword(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleLogin = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (this.state.email !== "" && this.state.password !== "") {
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      axios({ method: "post", url: "http://localhost:8000/register/login", data }).then((res) => {
        console.log("Login res", res)
        localStorage.setItem('auth-token', res.data.token)
        let { name, email } = res.data.user
        this.props.sendLoginData({ name, email })
      }).catch((err) => {
        this.setState({ error_msg: "User not Found Please Register" })
        console.log("USER Data Not Found plz Register", err)
      })
    }
  };
  render() {
    console.log(this.props.state.user);
    if (this.props.state.user.login === true) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <div className='login_div'>
          <div className='head_div'>LOGIN</div>
          <hr />
          <div className='form_div'>
            <form
              className='needs-validation'
              onSubmit={this.handleLogin}
              noValidate>
              <div className='form-group'>
                <MDBInput
                  value={this.state.email}
                  name='email'
                  onChange={(event) => this.handleEmail(event)}
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
              <div className='form-group'>
                <MDBInput
                  value={this.state.password}
                  name='password'
                  onChange={(event) => this.handlePassword(event)}
                  label='Password'
                  type='password'
                  icon='key'
                  outline
                  minLength='8'
                  required>
                  <div className='invalid-feedback'>
                    Password needs to be minimum 8 characters long.
                  </div>
                </MDBInput>
              </div>
              <p className="error_div">{this.state.error_msg}</p>
              <MDBBtn type='submit' rounded gradient='blue'>
                Login
              </MDBBtn>
            </form>
            <div className='social_login'>
              <GoogleLogin
                clientId='189392606316-gophi88gi150u8rg4b0gotokdfe36ufk.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className='info-div-login'>
              Not a Member Yet ..? <Link to='/register'>Click Here</Link> to
              register
            </div>
          </div>
        </div>
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
  return bindActionCreators({ sendLoginData }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Login);
