import React, { Component } from 'react';
import NavBar from './components/NavBar';
import WineList from './components/WineList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar />
          <WineList />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
