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
import EditModal from './EditModal';


class WineList extends Component {
  state = {
    isUpdated: true
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
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

    const isAuthenticated = this.props.isAuthenticated
    const authOwnerId = this.props.auth.user._id

    const { wines } = this.props.wine
    const sortedWines = wines.sort((a,b) => a.name.localeCompare(b.name))

    const filter = sortedWines.filter(wine => wine.ownerId === authOwnerId )

    const wineList = (
      <ListGroup>
      <TransitionGroup className='wine-list'>
          {sortedWines.map(({ _id, name, type, price, ownerId }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem key={_id}>
                  <div className="details-container">
                    <div className="delete-button">
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      ><i className="fas fa-times"></i>
                      </Button>

                      <EditModal
                        wineId = {_id}
                        wineName = {name}
                        wineType = {type}
                        winePrice = {price}
                      />


                    </div>
                    <div className="wine-list-details">
                      <h3>{name}</h3>
                      <h6>{type}</h6>
                      <h6>Price: ${price}</h6>
                      <h6>{ownerId}</h6>
                    </div>
                  </div>
                </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
      </ListGroup>
    )
    console.log(filter);
    setTimeout(() => {
      console.log(sortedWines);
    }, 3000)
    return (
      <Container>
        { isAuthenticated ? wineList : '' }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  wine: state.wine,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getWines, deleteWine })(WineList);
