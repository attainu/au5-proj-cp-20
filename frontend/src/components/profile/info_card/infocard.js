import React from "react";
import "../../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { sendEditProfileData } from "../../../actions/register_action";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='flip-card-div'>
        <div
          className='container'
          onTouchStart="this.classList.toggle('hover');">
          <div className='card' id='card'>
            <div className='card_front' id='card_front'>
              <div className='upper-card-div'></div>
              <div className='lower-card-div'>
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
                <div className='card-name-div'>
                  {this.props.user_profile ? (
                    <h3>{this.props.user_profile.name}</h3>
                  ) : (
                    <h3>{this.props.user.name}</h3>
                  )}
                </div>
                <div className='col-10 ml-5'>
                  <div>
                    <a href='#' class='btn follow-btn'>
                      Follow <i class='fas fa-user-plus'></i>
                    </a>
                  </div>
                </div>
                <div>
                  <div class='ds-info'>
                    <div class='ds pens col-6'>
                      <h6 title='Number of pens created by the user'>
                        Followers{" "}
                        <i class='fa fa-user-plus' aria-hidden='true'></i>
                      </h6>

                      {this.props.user_profile ? (
                        <p> {this.props.user_profile.followers.length}</p>
                      ) : (
                        <p> {this.props.user.followers.length}</p>
                      )}
                    </div>
                    <div class='ds projects col-6'>
                      <h6 title='Number of projects created by the user'>
                        following{" "}
                        <i class='fa fa-user-plus' aria-hidden='true'></i>
                      </h6>

                      {this.props.user_profile ? (
                        <p> {this.props.user_profile.following.length}</p>
                      ) : (
                        <p> {this.props.user.following.length}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("in EP", state.user.user_profile);
  return {
    login: state.user.login,
    user: state.user.user,
    google: state.user.google,
    user_profile: state.user.user_profile,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(InfoCard);
