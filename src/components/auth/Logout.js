import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import '../../App.css';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    return (
      <Fragment>
        <NavLink
          className="logout btn btn-danger"
          style={{color: 'white'}}
          onClick={this.props.logout}
          href="/wines">
          Logout
        </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { logout })(Logout);
