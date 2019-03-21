import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

//Routes
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import WineInfo from './components/pages/WineInfo';

import { Container } from 'reactstrap';
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
        <BrowserRouter>
        <React.Fragment>
          <div>
            <NavBar />
            <div>
              <Route exact path="/wines" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/wineinfo" component={WineInfo} />
            </div>
          </div>
        </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;
