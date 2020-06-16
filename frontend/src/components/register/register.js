import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login/login.css";
import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";

class Register extends React.Component {
  render() {
    return (
      <div>
        <div className='login_div'>
          <div className='head_div'>REGISTER</div>
          <hr />
          <div className='form_div'>
            <form>
              <div className='form-group'>
                <MDBInput label='Full Name' type='text' icon='user' size='sm' />
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Email'
                  type='email'
                  icon='envelope'
                  size='sm'
                />
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Password'
                  type='password'
                  icon='key'
                  size='sm'
                />
              </div>
              <div className='form-group'>
                <MDBInput
                  label='Confirm Password'
                  type='password'
                  icon='clipboard-check'
                  size='sm'
                />
              </div>
              <MDBBtn rounded gradient='blue'>
                Register
              </MDBBtn>
            </form>

            <div className='social'>
              <MDBBtn social='fb' color='blue'>
                <MDBIcon fab icon='facebook-f' className='pr-1' />
                Facebook
              </MDBBtn>
              <MDBBtn social='gplus' color='red'>
                <MDBIcon fab icon='google-plus-g' className='pr-1' />
                Google+
              </MDBBtn>
            </div>
            <div className='info-div-login'>
              Forgot Password ? <Link>Click Here</Link> to reset.
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

export default Register;
