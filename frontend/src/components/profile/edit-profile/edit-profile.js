import React from "react";
import "../../../styles/profile.css";
import { MDBInput } from "mdbreact";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  sendEditProfileData,
  sendImageUrl,
} from "../../../actions/register_action";
// import { toggle } from "../profile";
// import InfoCard from "../info_card/infocard";
import "react-image-crop/dist/ReactCrop.css";
import { MDBBtn } from "mdbreact";

class EditProfile extends React.Component {
  state = {
    new_email: this.props.user.email,
    name: this.props.user.name,
    username: this.props.user.username,
    mobile: this.props.user.mobile,
    bio: this.props.user.bio,
  };

  handleNameUpdate = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleUsernameUpdate = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleMobileUpdate = (event) => {
    this.setState({
      mobile: event.target.value,
    });
  };

  handleBioUpdate = (event) => {
    this.setState({
      bio: event.target.value,
    });
  };

  handleDataSave = (event, email) => {
    console.log(this.state);
    event.target.className += " was-validated";
    const data = {
      email: this.props.user.email,
      name: this.state.name,
      username: this.state.username,
      mobile: this.state.mobile,
      bio: this.state.bio,
    };
    event.preventDefault();
    this.props.sendEditProfileData(data);
  };

  sendDataToTabs = (nr) => {
    console.log("NR1", nr);
    this.props.sendDataFromEDP(nr);
  };
  render() {
    return (
      <div>
        <div class='card bg-dark' id='edit-profile-card'>
          <div class='card-header' style={{ color: "white" }}>
            Edit Profile
          </div>
          <div className='small-logo-image mt-2'>
            <div className='col-4 ml-5'>
              <img
                className='avatar_img_small'
                htmlFor='file'
                src={
                  this.props.user.image_url
                    ? this.props.user.image_url
                    : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                }
                alt=''
              />
            </div>
            <div className='col-8'>
              <button
                className='btn btn-outline-light'
                onClick={() => this.sendDataToTabs(14)}>
                <i className='fas fa-edit'></i> edit profile pic
              </button>
            </div>
          </div>
          <hr />
          <form className='needs-validation' onSubmit={this.handleDataSave}>
            <div class='card-body'>
              <div className='md-form' id='card-content'>
                <div className='form-group'>
                  <MDBInput
                    label='Name'
                    valueDefault={this.state.name}
                    type='text'
                    icon='user'
                    onChange={(event) =>
                      this.handleNameUpdate(event)
                    }></MDBInput>
                </div>
                <div className='form-group'>
                  <MDBInput
                    label='User Name'
                    valueDefault={this.state.username}
                    type='text'
                    icon='user-tag'
                    onChange={(event) =>
                      this.handleUsernameUpdate(event)
                    }></MDBInput>
                </div>
                <div className='form-group'>
                  <MDBInput
                    label='Mobile'
                    valueDefault={this.state.mobile}
                    type='tel'
                    pattern='[0-9]{2}-[0-9]{10}'
                    icon='phone'
                    maxLength='13'
                    minLength='13'
                    onChange={(event) => this.handleMobileUpdate(event)}>
                    <small style={{ color: "whitesmoke" }}>
                      Format:91-9876543210
                    </small>
                  </MDBInput>
                </div>
                <div className='form-group'>
                  <MDBInput
                    id='md-input'
                    valueDefault={this.state.bio}
                    label='Bio'
                    type='text'
                    icon='user-circle'
                    rows='4'
                    onChange={(event) =>
                      this.handleBioUpdate(event)
                    }></MDBInput>
                </div>
              </div>
            </div>
            <div class='card-footer text-muted'>
              <MDBBtn type='submit' outline color='light'>
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
    user: state.user.user,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ sendEditProfileData, sendImageUrl }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(EditProfile);
