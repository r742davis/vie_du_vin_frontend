import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getWines, deleteWine } from '../actions/WineActions';
import PropTypes from 'prop-types';


class WineList extends Component {
  static propTypes = {
    getWines: PropTypes.func.isRequired,
    wine: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  //Problem with code where it tries to load wine list before user is logged in
  componentDidMount() {
    this.props.getWines()
  }

  //Test code for updating component and mounting after log in; if logged in then run getWines()
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.props.getWines()
    }
  }

  onDeleteClick = id => {
    this.props.deleteWine(id)
  }

  render() {
    const { wines } = this.props.wine;

    const isAuthenticated = this.props.isAuthenticated

    const wineList = (
      <ListGroup>
      <TransitionGroup className='wine-list'>
          {wines.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                    <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >X
                      </Button>
                    {name}
                </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
      </ListGroup>
    )
    return (
      <Container>
        { isAuthenticated ? wineList : ''}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  wine: state.wine,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getWines, deleteWine })(WineList);
