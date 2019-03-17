import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import WineList from './components/WineList';
import WineModal from './components/WineModal';

//Routes
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import WineInfo from './components/pages/WineInfo';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';

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
            <Container>
              <Route exact path="/wines" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/wineinfo" component={WineInfo} />

            </Container>
          </div>
        </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;
