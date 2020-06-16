import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login/login.css";
import { MDBInput, MDBBtn } from "mdbreact";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { sendLoginData } from "../../Redux/actions/login_actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleEmail(event) {
    this.setState({ [event.target.name]: event.target.value });
    // this.setState({
    //   email: event.target.value,
    // });
  }

  handlePassword(event) {
    this.setState({ [event.target.name]: event.target.value });
    // this.setState({
    //   password: event.target.value,
    // });
  }

  handleLogin = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.state.email !== "" && this.state.password !== "") {
      this.props.sendLoginData(this.state);
    }
  };

  render() {
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

              <MDBBtn type='submit' rounded gradient='blue'>
                Login
              </MDBBtn>
            </form>

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
  return {};
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ sendLoginData }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Login);
