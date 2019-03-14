import React, { Component } from 'react';
import NavBar from './components/NavBar';
import WineList from './components/WineList';
import WineModal from './components/WineModal';
import { Container } from 'reactstrap';
import cors from 'cors';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div>
            <NavBar />
            <Container>
              <WineModal />
              <WineList />
            </Container>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
};

export default App;
