import React, { Component } from 'react';
// import { getWines } from '../../actions/WineActions';
import { connect } from 'react-redux';
import WineList from '../../components/WineList';
import WineModal from '../../components/WineModal';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated

    return (
      <div>
      { isAuthenticated ?
        <>
          <h4>Home Page</h4>
          <WineModal />
          <WineList />
        </>
        : ''}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home);
