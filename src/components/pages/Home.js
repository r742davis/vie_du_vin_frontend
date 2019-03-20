import React, { Component } from 'react';
import { connect } from 'react-redux';
import WineList from '../../components/WineList';
import WineModal from '../../components/WineModal';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal'
import PropTypes from 'prop-types';
import wineScene from './winery-scene.jpg';

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
          <div className="title-img">
            <img src={wineScene} className="img-fluid" alt="Winery Title"></img>
          </div>
          <div className="login-register-div">
            <RegisterModal />
            <LoginModal />
          </div>
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
