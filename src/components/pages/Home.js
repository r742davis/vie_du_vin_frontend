import React, { Component } from 'react';
import { connect } from 'react-redux';
import WineList from '../../components/WineList';
import WineModal from '../../components/WineModal';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal'
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated
    console.log(this.props.auth.user)
    return (

      <div>
      { isAuthenticated
        ?
        <>
          <h4>Your Wines:</h4>
          <WineModal />
          <WineList />
        </>
        :
        <>
          <h2>Let's log in!</h2>
          <RegisterModal />
          <LoginModal />
        </>
      }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home);
