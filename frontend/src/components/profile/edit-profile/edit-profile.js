import React from "react";
import "../../../styles/profile.css";
import { MDBInput, MDBBtn } from "mdbreact";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { sendEditProfileData } from "../../../actions/register_action";

class EditProfile extends React.Component {
  state = {
    email: "",
    name: "",
    username: "",
    mobile: "",
    bio: "",
  };

  handleEmailUpdate = (event) => {
    console.log(event.target.value);
    this.setState({
      email: event.target.value,
    });
  };

  handleNameUpdate = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };

  handleUsernameUpdate = (event) => {
    console.log(event.target.value);
    this.setState({
      username: event.target.value,
    });
  };

  handleMobileUpdate = (event) => {
    console.log(event.target.value);
    this.setState({
      mobile: event.target.value,
    });
  };

  handleBioUpdate = (event) => {
    console.log(event.target.value);
    this.setState({
      bio: event.target.value,
    });
  };

  handleDataSave = (event) => {
    event.preventDefault();
    this.props.sendEditProfileData(this.state);
  };

  render() {
    console.log(this.state.email);
    return (
      <div>
        <div class='card bg-dark' id='edit-profile-card'>
          <div class='card-header' style={{ color: "white" }}>
            Edit Profile
          </div>
          <form
            className='needs-validation'
            onSubmit={this.handleDataSave}
            noValidate>
            <div class='card-body'>
              <div className='md-form' id='card-content'>
                <MDBInput
                  label='E-mail address'
                  type='email'
                  icon='envelope'
                  onChange={(event) => this.handleEmailUpdate(event)}
                />
                <MDBInput
                  label='Name'
                  type='text'
                  icon='user'
                  onChange={(event) => this.handleNameUpdate(event)}
                />
                <MDBInput
                  label='User Name'
                  type='text'
                  icon='user-tag'
                  onChange={(event) => this.handleUsernameUpdate(event)}
                />
                <MDBInput
                  label='Mobile'
                  type='tel'
                  icon='phone'
                  onChange={(event) => this.handleBioUpdate(event)}
                />
                <MDBInput
                  id='md-input'
                  label='Bio'
                  type='textarea'
                  icon='user-circle'
                  rows='4'
                  onChange={(event) => this.handleEmailUpdate(event)}
                />
              </div>
            </div>
            <div class='card-footer text-muted'>
              <MDBBtn outline color='light'>
                Save Changes
              </MDBBtn>
            </div>
          </form>
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
  return bindActionCreators({ sendEditProfileData }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(EditProfile);
