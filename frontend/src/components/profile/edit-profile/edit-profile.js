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
          <form
            className='needs-validation'
            onSubmit={this.handleDataSave}
            noValidate>
            <div class='card-body'>
              <div className='md-form' id='card-content'>
                <div className='small-logo-image'>
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
                <MDBInput
                  label='Name'
                  valueDefault={this.state.name}
                  type='text'
                  icon='user'
                  onChange={(event) => this.handleNameUpdate(event)}
                />
                <MDBInput
                  label='User Name'
                  valueDefault={this.state.username}
                  type='text'
                  icon='user-tag'
                  onChange={(event) => this.handleUsernameUpdate(event)}
                />
                <MDBInput
                  label='Mobile'
                  valueDefault={this.state.mobile}
                  type='tel'
                  icon='phone'
                  onChange={(event) => this.handleMobileUpdate(event)}
                />
                <MDBInput
                  id='md-input'
                  valueDefault={this.state.bio}
                  label='Bio'
                  type='textarea'
                  icon='user-circle'
                  rows='4'
                  onChange={(event) => this.handleBioUpdate(event)}
                />
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
  console.log("in EP", state.user.user);
  return {
    user: state.user.user,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ sendEditProfileData, sendImageUrl }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(EditProfile);
