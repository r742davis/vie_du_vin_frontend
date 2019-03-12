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
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getWines } from '../actions/WineActions';
import PropTypes from 'prop-types';

class WineList extends Component {

  componentDidMount() {
    this.props.getWines()
  }

  render() {
    const { wines } = this.props.wine;
    return (
      <Container>
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={() => {
              const name = prompt('Enter Wine')
              if (name) {
                this.setState(state => ({
                  wines: [...state.wines, { id: uuid(), name }]
                }));
              }
            }}
          >Add Wine</Button>

          <ListGroup>
              <TransitionGroup className='wine-list'>
                  {wines.map(({ id, name }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={() => {
                                this.setState(state => ({
                                  wines: state.wines.filter(wine => wine.id !== id)
                                }))
                              }}
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

export default connect(mapStateToProps, { getWines })(WineList);
