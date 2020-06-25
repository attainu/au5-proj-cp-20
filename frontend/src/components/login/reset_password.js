import React from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../../styles/login/forgot_password.css";
import { MDBBtn, MDBInput } from "mdbreact";

class Resetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkDate: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
    };
  }
  componentDidMount() {
    let slugParam = this.props.match.params.slug;
    let splitSlug = slugParam.split("+++");
    let reqDate = splitSlug[0];
    let email = splitSlug[1];
    console.log(reqDate);
    console.log(email);
    this.setState({ email: email, linkDate: reqDate });
    let date1 = new Date(reqDate);
    let currentDate = new Date();
    let differenceinMS = currentDate - date1;
    if (differenceinMS > 3600000) {
      NotificationManager.error(
        "Link Not Valid link will be valid for 15 min.Please sent the reset link Again"
      );
      this.props.history.push("/login");
    }
  }
  handleInput = (e) => {
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
    // const data = { email: this.state.email, };
    // console.log(data)
    axios
      .post("http://localhost:8000/register/update_password", this.state)
      .then((result) => {
        NotificationManager.success(result.data.msg);
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
              <div className='card bg-dark text-light' id='reset-card1'>
                <div className='card-header text-center'>Reset Password</div>
                <div className='card-body'>
                  <div className='form-group'>
                    <label>Enter your new password</label>
                    <MDBInput
                      name='password'
                      value={this.state.password}
                      onChange={this.handleInput}
                      label='Password'
                      type='password'
                      icon='key'
                      className='form-control'
                      outline
                      required>
                      <div className='invalid-feedback'>
                        Please Enter Your Email.
                      </div>
                    </MDBInput>
                  </div>
                  <div className='form-group'>
                    <MDBInput
                      type='password'
                      name='confirm_password'
                      value={this.state.confirm_password}
                      onChange={this.handleInput}
                      label='Confirm Password'
                      icon='clipboard-check'
                      className='form-control'
                      outline
                      required>
                      <div className='invalid-feedback'>
                        Please Enter Your Email.
                      </div>
                    </MDBInput>
                  </div>
                </div>
                <div className='card-footer text-center'>
                  <input
                    type='button'
                    value='Reset'
                    onClick={this.handleForm}
                    className='btn btn-primary'
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Resetpassword;
