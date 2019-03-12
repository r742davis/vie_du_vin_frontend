import React, { Component } from 'react';
import NavBar from './components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
