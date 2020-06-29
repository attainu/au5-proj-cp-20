import React from "react";
import Navbar from "../navbar/navbar";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  verifyToken,
  getAllUsers,
  sendFollowData,
  sendUnfollowData,
  searchUsers,
  sendUserProfileId,
} from "../../actions/register_action";
import "../../styles/search_users.css";
import { MDBInput, MDBBtn } from "mdbreact";

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_query: "",
    };

    this.props.verifyToken();
  }

  componentDidMount = () => {
    this.props.getAllUsers();
  };
  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({
      search_query: event.target.value,
    });
  };

  handleSearchClick = () => {
    const data = {
      search_query: this.state.search_query,
    };
    this.props.searchUsers(data);
  };

  handleFollowClick = (id) => {
    const data = {
      logged_user_id: this.props.user._id,
      selected_user_id: id,
    };
    this.props.sendFollowData(data);
  };

  handleUnfollowClick = (id) => {
    const data = {
      logged_user_id: this.props.user._id,
      selected_user_id: id,
    };
    this.props.sendUnfollowData(data);
  };

  getUserProfile = (_id) => {
    const data = {
      user_id: _id,
    };
    this.props.sendUserProfileId(data);
  };

  render() {
    console.log("in component", this.props.all_users);
    return (
      <div className='user-search'>
        <Navbar />
        <div className='cont-div'>
          <div className='searchbar-div'>
            <div className='col-8'>
              <MDBInput
                label='Search Users'
                icon='search'
                onChange={(event) => this.handleSearch(event)}
              />
            </div>
            <div className='col-4 mt-3'>
              <MDBBtn
                outline
                color='light'
                onClick={() => this.handleSearchClick()}>
                Search
              </MDBBtn>
            </div>
          </div>
          <div className='search-results'>
            {!this.props.searched_users
              ? this.props.all_users.map((users, index) => {
                  return (
                    <div className='folowers-div mt-4'>
                      <div className='small-logo-image '>
                        <div className='col-3 ml-5'>
                          <img
                            className='avatar_img_small'
                            htmlFor='file'
                            src={users.image_url}
                            alt=''
                          />
                        </div>
                        <div className=' col-5 followers-name-div mt-2'>
                          <h3>{users.name}</h3>
                        </div>
                        <div className='col-4 ml-2'>
                          <MDBBtn
                            outline
                            color='green'
                            onClick={() => this.handleFollowClick(users._id)}>
                            Follow
                          </MDBBtn>
                          <MDBBtn
                            outline
                            color='red'
                            onClick={() => this.handleUnfollowClick(users._id)}>
                            Unfollow
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  );
                })
              : this.props.searched_users.map((users, index) => {
                  return (
                    <div
                      className='folowers-div mt-4'
                      onClick={() => this.getUserProfile(users._id)}>
                      <div className='small-logo-image '>
                        <div className='col-3 ml-5'>
                          <img
                            className='avatar_img_small'
                            htmlFor='file'
                            src={users.image_url}
                            alt=''
                          />
                        </div>
                        <div className=' col-5 followers-name-div mt-2'>
                          <Link
                            to={{
                              pathname: "/userProfile",
                              aboutProps: { _id: users._id },
                            }}>
                            <h3>{users.name}</h3>
                          </Link>
                        </div>
                        <div className='col-4 ml-2'>
                          <MDBBtn
                            outline
                            color='green'
                            onClick={() => this.handleFollowClick(users._id)}>
                            Follow
                          </MDBBtn>
                          <MDBBtn
                            outline
                            color='red'
                            onClick={() => this.handleUnfollowClick(users._id)}>
                            Unfollow
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  return {
    all_users: state.user.all_users,
    user: state.user.user,
    searched_users: state.user.searched_users,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators(
    {
      verifyToken,
      getAllUsers,
      sendFollowData,
      sendUnfollowData,
      searchUsers,
      sendUserProfileId,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveDataToRedux)(SearchUsers);
