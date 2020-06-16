import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login/login.css";
import { MDBInput, MDBBtn } from "mdbreact";

class Login extends React.Component {
  render() {
    return (
      <div>
        <div className='login_div'>
          <div className='head_div'>LOGIN</div>
          <hr />
          <div className='form_div'>
            <form>
              <div className='form-group'>
                <MDBInput label='Email' icon='envelope' size='sm' />
              </div>
              <div className='form-group'>
                <MDBInput label='Password' icon='key' size='sm' />
              </div>
              <MDBBtn rounded gradient='blue'>
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

export default Login;
