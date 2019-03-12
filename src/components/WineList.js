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

class WineList extends Component {
  state = {
    wines: [
      { id: uuid(), name: 'Chateau Morosé' },
      { id: uuid(), name: 'Black Cat Red' },
      { id: uuid(), name: 'Napa\'s Delight' },
      { id: uuid(), name: 'Winter\'s Fell' }
    ]
  }

  render() {
    const { wines } = this.state;
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

export default WineList;
