import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class NavBar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-4">
            <strong><Link to="/about">About</Link></strong>
          </span>
        </NavItem>
        <NavItem>
          <span className="navbar-text mr-4">
            <strong><Link to="/contact">Contact</Link></strong>
          </span>
        </NavItem>
        <NavItem>
          <span className="navbar-text mr-4">
            <strong><Link to="/wineinfo">Wine Info</Link></strong>
          </span>
        </NavItem>
        <NavItem>
          <span className="navbar-text mr-4">
            <strong style={{color: 'crimson'}}>{ user ? `Welcome ${user.name}` : '' }</strong>
          </span>
        </NavItem>
        <NavItem>
            <Logout />
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
            <RegisterModal />
        </NavItem>
        <NavItem>
            <LoginModal />
        </NavItem>
      </Fragment>
    )

    return (
    <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
              <NavbarBrand className="title"><Link to="/wines" style={{color: 'white', textDecoration: 'none'}}>Vie du Vin</Link></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                      { isAuthenticated ? authLinks : guestLinks }
                  </Nav>
              </Collapse>
          </Container>
        </Navbar>
    </div>
  )
  }

}
const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, null)(NavBar);
