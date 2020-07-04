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
} from "../../actions/register_action";
import "../../styles/search_users.css";
import { MDBInput, MDBBtn } from "mdbreact";
import { useParams } from "react-router-dom";
import Forbidden from "../forbidden/forbidden";
import { Redirect } from "react-router-dom";
var { _id } = useParams;

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_query: "",
    };
    this.props.verifyToken();
    this.props.getAllUsers();
  }

  componentDidMount = () => {
    console.log("in ID", _id);
    this.props.getAllUsers();
  };
  handleSearch = (event) => {
    console.log();
    // this.setState({
    //   search_query: event.target.value,
    // });
    const data = {
      search_query: event.target.value,
    };
    this.props.searchUsers(data);
  };

  getUserProfile = (_id) => {
    this.props.sendUserProfileId(_id);
  };

  render() {
    console.log("in component", this.props.all_users);
    console.log("this is ID", _id);
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
          </div>
          <div className='search-results'>
            {this.props.searched_users.length === 0
              ? this.props.all_users.map((users, index) => {
                return (
                  <div className='folowers-div ' key={index}>
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
                        <h5>
                          <strong>{users.name}</strong>
                        </h5>
                        <h6>{users.email}</h6>
                      </div>
                      <div className='col-4 ml-2'>
                        {this.props.login ? (
                          <Link
                            to={{
                              pathname: `/userProfile/${users._id}`,
                              aboutProps: {
                                _id: users._id,
                              },
                            }}>
                            <MDBBtn size='sm' outline color='amber'>
                              View Profile
                              </MDBBtn>
                          </Link>
                        ) : (
                            <div>
                              <Link to='/forbidden'>
                                <MDBBtn size='sm' outline color='amber'>
                                  View Profile
                                </MDBBtn>
                              </Link>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })
              : this.props.searched_users.map((user, index) => {
                return (
                  <div className='folowers-div mt-4' key={index}>
                    <div className='small-logo-image '>
                      <div className='col-3 ml-5'>
                        <img
                          className='avatar_img_small'
                          htmlFor='file'
                          src={user.image_url}
                          alt=''
                        />
                      </div>
                      <div className=' col-5 followers-name-div mt-2'>
                        <h5>
                          <strong>{user.name}</strong>
                        </h5>
                        <h6>{user.email}</h6>
                      </div>
                      <div className='col-4 ml-2'>
                        {this.props.login ? (
                          <Link
                            to={{
                              pathname: `/userProfile/${user._id}`,
                              aboutProps: {
                                _id: user._id,
                              },
                            }}>
                            <MDBBtn size='sm' outline color='amber'>
                              View Profile
                              </MDBBtn>
                          </Link>
                        ) : (
                            <div>
                              <Link to='/forbidden'>
                                <MDBBtn size='sm' outline color='amber'>
                                  View Profile
                                </MDBBtn>
                              </Link>
                            </div>
                          )}
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
  console.log("In searched Users", state.user.all_users);
  return {
    login: state.user.login,
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
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveDataToRedux)(SearchUsers);
