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

  componentDidMount() {
    this.props.getWines()
  }

  onDeleteClick = (id) => {
    this.props.deleteWine(id)
  }

  render() {
    const { wines } = this.props.wine;
    return (
      <Container>
          <ListGroup>
              <TransitionGroup className='wine-list'>
                  {wines.map(({ id, name }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, id)}
                            >X
                            </Button>
                            {name}
                        </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
          </ListGroup>
      </Container>
    )
  }
}

WineList.propTypes = {
  getWines: PropTypes.func.isRequired,
  wine: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  wine: state.wine
})

export default connect(mapStateToProps, { getWines, deleteWine })(WineList);
