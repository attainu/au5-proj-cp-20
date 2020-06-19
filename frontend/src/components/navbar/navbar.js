import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { MDBBtn } from "mdbreact";
// import axios from 'axios'
import { verifyToken } from '../../actions/register_action'
import { connect } from "react-redux";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import { Link } from 'react-router-dom';

class Navbar extends Component {
  componentDidMount() {

  }
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    console.log("Navbar", this.props.state.user)
    // verifyToken()
    return (
      <MDBNavbar color="elegant-color" dark expand="md">
        <Link to='/'>
          <MDBNavbarBrand>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Ddk77xa-APCWbCOETR0NggAAAA%26pid%3DApi&f=1" alt="logo" height='35px' width='40px' />
          </MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem className="ml-2" >
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="ml-2" >
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="ml-2" >
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="ml-2" >
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className="mr-1">
            {this.props.state.user.login === false ?
              <Fragment>
                <Link to='/register'>
                  <MDBBtn color="unique" size="sm" >Signup</MDBBtn>
                </Link>
                <Link to='/login'>
                  <MDBBtn color="purple" size="sm" >Login</MDBBtn>
                </Link>
              </Fragment>
              : <div>
                <MDBNavItem>
                  <MDBDropdown dropleft>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">My Profile</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </div>}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ verifyToken }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)