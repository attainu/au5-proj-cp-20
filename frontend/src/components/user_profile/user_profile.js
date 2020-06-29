import React from "react";
import "../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from "../navbar/navbar";
import {
  verifyToken,
  getFollowing,
  getFollowers,
} from "../../actions/register_action";
import "react-circular-progressbar/dist/styles.css";
import ProfileTabs from "../profile/tabs/tabs";
import InfoCard from "../profile/info_card/infocard";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.verifyToken();
  }

  componentDidMount = () => {
    console.log("about_props", this.props.location.aboutProps);
    const data = {
      _id: this.props.user._id,
    };
    this.props.getFollowing(data);
    this.props.getFollowers(data);
  };
  sendDataFromEDP = () => {
    this.props.toggle();
  };

  render() {
    const { crop } = this.state;

    return (
      <div>
        <Navbar />
        <div className='the-bg'></div>
        {this.props.login === true ? (
          <div>
            <div className='main_profile'>
              <div className='user-contents'>
                <div className='nav-div'>
                  <ProfileTabs />
                </div>
                <div className='pp-div'>
                  <InfoCard />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>{/* <Redirect to='/login' Component={Login} /> */}</div>
        )}
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("in user profile", state.user);
  return {
    login: state.user.login,
    user: state.user.user,
    followers: state.user.followers,
    following: state.user.following,
    user_profile: state.user.user_profile,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators(
    { verifyToken, getFollowing, getFollowers },
    dispatch
  );
};

export default connect(getDataFromRedux, giveDataToRedux)(UserProfile);
