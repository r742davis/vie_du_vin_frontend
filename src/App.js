import React, { Component } from 'react';
import NavBar from './components/NavBar';
import WineList from './components/WineList';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div>
            <NavBar />
            <WineList />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
};

export default App;
