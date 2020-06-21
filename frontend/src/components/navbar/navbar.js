import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { MDBBtn, MDBTypography } from "mdbreact";
// import axios from 'axios'
import { verifyToken, logoutAgain } from "../../actions/register_action";
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
  }
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    console.log("Navbar", this.props.state.user);
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
            <MDBNavItem className='ml-2'>
              <MDBNavLink to='#!'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className='ml-2'>
              <MDBNavLink to='#!'>Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className='ml-2'>
              <MDBNavLink to='#!'>Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
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
              <div>
                <MDBNavItem>
                  <MDBDropdown dropleft>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon='user' />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className='dropdown-default'>
                      <MDBDropdownItem size='sm' href='/profile'>
                        My Profile
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
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ verifyToken, logoutAgain }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
