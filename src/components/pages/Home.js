import React, { Component } from 'react';
import { connect } from 'react-redux';
import WineList from '../../components/WineList';
import WineModal from '../../components/WineModal';
import Greetings from './Greetings';
import PropTypes from 'prop-types';
import wineScene from './winery-scene.jpg';
import { Container } from 'reactstrap';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated
    console.log(this.props.auth.user)
    return (

      <div className="list-background">
      { isAuthenticated
        ?
        <>
          <Container>
            <WineModal />
            <WineList />
          </Container>
        </>
        :
        <>
          <div className="home-container">
            <div className="title-img">
              <img src={wineScene} className="img-responsive" alt="Winery Title"></img>
              <h1 className="centered">Welcome!</h1>
            </div>
            <Container className="greetings-container">
              <Greetings />
            </Container>
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
