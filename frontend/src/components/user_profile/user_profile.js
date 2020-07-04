import React from "react";
import "../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from "../navbar/navbar";
import { verifyToken } from "../../actions/register_action";
import "react-circular-progressbar/dist/styles.css";
import ProfileTabs from "../profile/tabs/tabs";
import InfoCard from "../profile/info_card/infocard";
import Forbidden from "../forbidden/forbidden";
import { Redirect } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.verifyToken();
  }

  componentDidMount = () => {
    console.log("In USERPROFILE:", this.props.match.params);
    console.log("about_props", this.props.location.aboutProps);
    const data = {
      _id: this.props.user._id,
    };
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
                  <ProfileTabs selected_user_id={this.props.match.params.id} />
                </div>
                <div className='pp-div'>
                  <InfoCard user_id={this.props.match.params.id} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Redirect to='/forbidden' />
          </div>
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
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ verifyToken }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(UserProfile);
