import React from "react";
import "../../../styles/profiletabs.css";
import Upvotes from "../upvotes/upvotes";
import Downvotes from "../downvotes/downvotes";
import { bindActionCreators } from "redux";
import Posts from "../posts/posts";
import EditProfile from "../../profile/edit-profile/edit-profile";
import {
  getFollowing,
  getFollowers,
  getSelectedUserFollowing,
  getSelectedUserFollowers,
} from "../../../actions/register_action";
import { connect } from "react-redux";

class ProfileTabs extends React.Component {
  componentDidMount = () => {
    const data = {
      _id: this.props.user._id,
    };
    const selected_user_id = {
      _id: this.props.selected_user_id,
    };

    this.props.getFollowing(data);
    this.props.getFollowers(data);
    this.props.getSelectedUserFollowing(selected_user_id);
    this.props.getSelectedUserFollowers(selected_user_id);
  };
  sendDataFromEDP = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div>
        <nav id='tab-nav'>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <a
              className='nav-item nav-link active profile-nav-link'
              id='nav-posts-tab'
              data-toggle='tab'
              href='#nav-posts'
              role='tab'
              aria-controls='nav-posts'
              aria-selected='true'>
              POSTS
            </a>
            <a
              className='nav-item nav-link profile-nav-link'
              id='nav-upvotes-tab'
              data-toggle='tab'
              href='#nav-upvotes'
              role='tab'
              aria-controls='nav-upvotes'
              aria-selected='false'>
              UPVOTES
            </a>
            <a
              className='nav-item nav-link profile-nav-link'
              id='nav-downvotes-tab'
              data-toggle='tab'
              href='#nav-downvotes'
              role='tab'
              aria-controls='nav-downvotes'
              aria-selected='false'>
              DOWNVOTES
            </a>
            <a
              className='nav-item nav-link profile-nav-link'
              id='nav-followers-tab'
              data-toggle='tab'
              href='#nav-followers'
              role='tab'
              aria-controls='nav-followers'
              aria-selected='false'>
              FOLLOWERS
            </a>
            <a
              className='nav-item nav-link profile-nav-link'
              id='nav-following-tab'
              data-toggle='tab'
              href='#nav-following'
              role='tab'
              aria-controls='nav-following'
              aria-selected='false'>
              FOLLOWING
            </a>
            {this.props.selected_user_id ? (
              <div></div>
            ) : (
              <a
                className='nav-item nav-link profile-nav-link'
                id='nav-ep-tab'
                data-toggle='tab'
                href='#nav-ep'
                role='tab'
                aria-controls='nav-ep'
                aria-selected='false'>
                EDIT PROFILE
              </a>
            )}
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='nav-posts'
            role='tabpanel'
            aria-labelledby='nav-posts-tab'>
            <Posts />
          </div>
          <div
            className='tab-pane fade'
            id='nav-upvotes'
            role='tabpanel'
            aria-labelledby='nav-upvotes-tab'>
            <Upvotes />
          </div>
          <div
            className='tab-pane fade'
            id='nav-downvotes'
            role='tabpanel'
            aria-labelledby='nav-downvotes-tab'>
            <Downvotes />
          </div>
          <div
            className='tab-pane fade'
            id='nav-followers'
            role='tabpanel'
            aria-labelledby='nav-followers-tab'>
            <h3 style={{ color: "white", margin: "1rem" }}>FOLLOWERS</h3>
            {this.props.selected_user_id ? (
              <div>
                {this.props.selected_followers.map((ele, index) => (
                  <div className='folowers-div' key={index}>
                    <div className='small-logo-image'>
                      <div className='col-4 ml-5'>
                        <img
                          className='avatar_img_small'
                          htmlFor='file'
                          src={
                            ele.image_url
                              ? ele.image_url
                              : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                          }
                          alt=''
                        />
                      </div>
                      <div className='col-8' className='followers-name-div'>
                        <h3>{ele.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {this.props.followers.map((ele, index) => (
                  <div className='folowers-div' key={index}>
                    <div className='small-logo-image'>
                      <div className='col-4 ml-5'>
                        <img
                          className='avatar_img_small'
                          htmlFor='file'
                          src={
                            ele.image_url
                              ? ele.image_url
                              : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                          }
                          alt=''
                        />
                      </div>
                      <div className='col-8' className='followers-name-div'>
                        <h3>{ele.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            class='tab-pane fade'
            id='nav-following'
            role='tabpanel'
            aria-labelledby='nav-following-tab'>
            <h3 style={{ color: "white", margin: "1rem" }}>FOLLOWING</h3>
            {this.props.selected_user_id ? (
              <div>
                {this.props.selected_following.map((ele, index) => (
                  <div className='folowers-div' key={index}>
                    <div className='small-logo-image'>
                      <div className='col-4 ml-5'>
                        <img
                          className='avatar_img_small'
                          htmlFor='file'
                          src={
                            ele.image_url
                              ? ele.image_url
                              : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                          }
                          alt=''
                        />
                      </div>
                      <div className='col-8' className='followers-name-div'>
                        <h3>{ele.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {this.props.following.map((ele, index) => (
                  <div className='folowers-div' key={index}>
                    <div className='small-logo-image'>
                      <div className='col-4 ml-5'>
                        <img
                          className='avatar_img_small'
                          htmlFor='file'
                          src={
                            ele.image_url
                              ? ele.image_url
                              : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                          }
                          alt=''
                        />
                      </div>
                      <div className='col-8' className='followers-name-div'>
                        <h3>{ele.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            class='tab-pane fade'
            id='nav-ep'
            role='tabpanel'
            aria-labelledby='nav-ep-tab'>
            <EditProfile sendDataFromEDP={(nr) => this.sendDataFromEDP(nr)} />
          </div>
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("In tabs", state.user.selected_followers.name);
  return {
    user: state.user.user,
    followers: state.user.followers,
    following: state.user.following,
    selected_followers: state.user.selected_followers,
    selected_following: state.user.selected_following,
    user_profile: state.user.user_profile,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators(
    {
      getFollowing,
      getFollowers,
      getSelectedUserFollowing,
      getSelectedUserFollowers,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveDataToRedux)(ProfileTabs);
