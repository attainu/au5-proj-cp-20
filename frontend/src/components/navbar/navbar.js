import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { MDBBtn, MDBTypography } from "mdbreact";
// import axios from 'axios'
import {
  verifyToken,
  logoutAgain,
  articleCall,
<<<<<<< HEAD
<<<<<<< HEAD
  getallPost
=======
>>>>>>> ebc8f5a84d2fd086addec9cc80c6567bdd257ea4
=======
  getallPost,
>>>>>>> 5862aefbb9300fcf4b1c0928bce71dff5e604b79
} from "../../actions/register_action";
import { connect } from "react-redux";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.props.verifyToken();
    this.props.articleCall("Reddit");
<<<<<<< HEAD
<<<<<<< HEAD
    this.props.getallPost()
=======
>>>>>>> ebc8f5a84d2fd086addec9cc80c6567bdd257ea4
=======
    this.props.getallPost();
>>>>>>> 5862aefbb9300fcf4b1c0928bce71dff5e604b79
  }
  state = {
    isOpen: false,
    querry: "meme",
  };
  article = () => {
    this.props.articleCall(this.state.querry);
  };
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    console.log("Navbar", this.props.state.user, "state", this.state);
    // verifyToken()
    return (
      <MDBNavbar color='elegant-color' dark expand='md'>
        <Link to='/'>
          <MDBNavbarBrand>
            <span className='logo-title2'>#</span>
            <span className='logo-title1'>raise</span>
            <span className='logo-title2'>it</span>
          </MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id='navbarCollapse3' isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem className='ml-2 mt-1'>
              <MDBNavLink to='/'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className='ml-2 mt-1'>
              <MDBNavLink to='/search-users'>Search Users</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className='ml-2 mt-1'>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className='mr-2'>Posts Filter</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href='#!'>All Posts</MDBDropdownItem>
                  <MDBDropdownItem href='#!'>Popular</MDBDropdownItem>
                  <MDBDropdownItem href='#!'>Up Voted</MDBDropdownItem>
                  <MDBDropdownItem href='#!'>Down Voted</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <div className='md-form my-0 ml-2'>
              <input
                className='form-control mr-sm-2 text-white'
                type='text'
                placeholder='Search'
                aria-label='Search'
                onKeyUp={(e) => this.setState({ querry: e.target.value })}
              />
            </div>
            <MDBNavItem onClick={() => this.article()}>
              <MDBIcon
                fab
                icon='reddit-alien'
                size='2x'
                className='d-inline text-white'
              />
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className='mr-1'>
            {this.props.state.user.login === false ? (
              <Fragment>
                <Link to='/register'>
                  <MDBBtn color='unique' size='sm'>
                    Signup
                  </MDBBtn>
                </Link>
                <Link to='/login'>
                  <MDBBtn color='purple' size='sm'>
                    Login
                  </MDBBtn>
                </Link>
              </Fragment>
            ) : (
<<<<<<< HEAD
                <div>
                  <MDBNavItem>
                    <MDBDropdown dropleft>
                      <MDBDropdownToggle nav caret>
                        <img
                          className='avatar_img_navbar'
                          src={this.props.user.image_url}
                          alt=''
                        />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className='dropdown-default'>
                        <MDBDropdownItem href='/profile' size='sm'>
                          My Profile
                      </MDBDropdownItem>
                        <MDBDropdownItem href='/create' size='sm'>
                          Create Post
                      </MDBDropdownItem>
                        <MDBDropdownItem
                          onClick={() => this.props.logoutAgain()}
                          size='sm'>
                          Logout
                      </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </div>
              )}
=======
              <div>
                <MDBNavItem>
                  <MDBDropdown dropleft>
                    <MDBDropdownToggle nav caret>
                      <img
                        className='avatar_img_navbar'
                        src={this.props.user.image_url}
                        alt=''
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className='dropdown-default'>
                      <MDBDropdownItem href='/profile' size='sm'>
                        {this.props.user.name}
                      </MDBDropdownItem>
                      <MDBDropdownItem href='/create' size='sm'>
                        Create Post
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        onClick={() => this.props.logoutAgain()}
                        size='sm'>
                        Logout
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </div>
            )}
>>>>>>> ebc8f5a84d2fd086addec9cc80c6567bdd257ea4
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
<<<<<<< HEAD
<<<<<<< HEAD
    { verifyToken, logoutAgain, articleCall, getallPost },
=======
    { verifyToken, logoutAgain, articleCall },
>>>>>>> ebc8f5a84d2fd086addec9cc80c6567bdd257ea4
=======
    { verifyToken, logoutAgain, articleCall, getallPost },
>>>>>>> 5862aefbb9300fcf4b1c0928bce71dff5e604b79
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
