import React from "react";
import "../../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { sendEditProfileData } from "../../../actions/register_action";

class InfoCard extends React.Component {
  state = {
    email: "",
    name: "",
    username: "",
    mobile: "",
    bio: "",
  };

  render() {
    return (
      <div className='flip-card-div'>
        <div class='container' ontouchstart="this.classList.toggle('hover');">
          <div class='card' id='card'>
            <div class='card_front' id='card_front'>
              <div>
                <h3>{this.props.user.name}</h3>
              </div>
              <img
                className='avatar_img'
                htmlFor='file'
                src={
                  this.props.user.image_url
                    ? this.props.user.image_url
                    : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                }
                alt=''
              />
              <div>
                <span class='badge badge-light'>View profile</span>
              </div>
            </div>

            <div class='card_back' id='card_back'>
              <p>{this.props.user.name}</p>
              <p>{this.props.user.email}</p>
              <p>{this.props.user.username}</p>
              <p>{this.props.user.mobile}</p>
              <p>{this.props.user.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("in EP", state.user.user);
  return {
    login: state.user.login,
    user: state.user.user,
    google: state.user.google,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(InfoCard);
