import React from "react";
import "../../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  sendUserProfileId,
  sendFollowData,
  sendUnfollowData,
  getAllUsers,
  getFollowers,
  getFollowing,
} from "../../../actions/register_action";
import { verifyToken } from "../../../actions/register_action";

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_profile: "",
    };
    this.props.verifyToken();
  }

  componentDidMount = () => {
    const data = {
      user_id: this.props.user_id,
    };
    this.props.sendUserProfileId(data);
    this.props.getAllUsers();
    this.props.getFollowers();
    this.props.getFollowing();
  };

  handleFollowClick = (id) => {
    const data = {
      logged_user_id: this.props.user._id,
      selected_user_id: id,
    };
    this.props.sendFollowData(data);
    this.props.getFollowers();
    this.props.getFollowing();
    this.props.verifyToken();
    window.location.reload();
  };

  handleUnfollowClick = (id) => {
    const data = {
      logged_user_id: this.props.user._id,
      selected_user_id: id,
    };
    this.props.sendUnfollowData(data);
    this.props.getAllUsers();
    this.props.getFollowers();
    this.props.getFollowing();
    this.props.verifyToken();
    window.location.reload();
  };

  render() {
    console.log("loading in infocard", this.props.loading);
    return (
      <div className='flip-card-div'>
        <div id='container'>
          <div className='card' id='card'>
            <div className='card_front' id='card_front'>
              <div className='upper-card-div'>
                {!this.props.loading ? (
                  <div></div>
                ) : (
                  <div className='spinner-div'>
                    <div
                      class='spinner-border text-success'
                      style={{
                        width: "5rem",
                        height: "5rem",
                        marginTop: "2rem",
                      }}
                      role='status'>
                      <span class='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='lower-card-div'>
                <img
                  className='avatar_img'
                  htmlFor='file'
                  src={
                    this.props.user_profile
                      ? this.props.user_profile.image_url
                      : [
                          this.props.user.image_url
                            ? this.props.user.image_url
                            : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png",
                        ]
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
                    {this.props.user_profile ? (
                      <div>
                        {this.props.show_follow ? (
                          <a
                            className='btn follow-btnn'
                            onClick={() =>
                              this.handleFollowClick(
                                this.props.user_profile._id
                              )
                            }>
                            Follow <i className='fas fa-user-plus'></i>
                          </a>
                        ) : (
                          <a
                            className='btn unfollow-btnn'
                            onClick={() =>
                              this.handleUnfollowClick(
                                this.props.user_profile._id
                              )
                            }>
                            Unfollow <i className='fas fa-user-plus'></i>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div>
                  <div class='ds-info'>
                    <div class='ds pens col-6'>
                      <h6>
                        Followers
                        <i class='fa fa-user-plus' aria-hidden='true'></i>
                      </h6>

                      {this.props.user_profile ? (
                        <p> {this.props.user_profile.followers.length}</p>
                      ) : (
                        <p> {this.props.user.followers.length}</p>
                      )}
                    </div>
                    <div class='ds projects col-6'>
                      <h6>
                        following
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
                <hr />
                <div
                  className='col-10 mt-1 offset-2'
                  style={{ justifyContent: "center" }}>
                  {this.props.user_profile ? (
                    <div>{this.props.user_profile.mobile}</div>
                  ) : (
                    <div>{this.props.user.mobile}</div>
                  )}
                </div>
                <div className='col-10 mt-1 offset-2'>
                  {this.props.user_profile ? (
                    <div>{this.props.user_profile.username}</div>
                  ) : (
                    <div>{this.props.user.username}</div>
                  )}
                </div>
                <div className='col-10 mt-1 offset-2'>
                  {this.props.user_profile ? (
                    <div>{this.props.user_profile.email}</div>
                  ) : (
                    <div>{this.props.user.email}</div>
                  )}
                </div>
                <hr />
                <div className='col-10 mt-1 mb-3 offset-1'>
                  {this.props.user_profile ? (
                    <div>{this.props.user_profile.bio}</div>
                  ) : (
                    <div>{this.props.user.bio}</div>
                  )}
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
  // console.log("infocard", state.user);
  return {
    login: state.user.login,
    user: state.user.user,
    google: state.user.google,
    user_profile: state.user.user_profile,
    show_follow: state.user.show_follow,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators(
    {
      sendUserProfileId,
      sendFollowData,
      sendUnfollowData,
      verifyToken,
      getFollowers,
      getFollowing,
      getAllUsers,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveDataToRedux)(InfoCard);
