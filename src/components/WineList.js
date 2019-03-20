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

  shouldComponentUpdate

  // handleRedirect = () => {
  //   this.setState({ redirect: true })
  //   console.log(this.state.redirect);
  // }

  onDeleteClick = id => {
    this.props.deleteWine(id)
  }

  // toggleModal = (id) => {
  //   console.log(id)
  //   this.setState({
  //     openModal: !this.state.openModal
  //   })
  // }

  render() {

    const { wines } = this.props.wine;

    const isAuthenticated = this.props.isAuthenticated
    // const isUpdated = this.state.isUpdated

    const wineList = (
      <ListGroup>
      <TransitionGroup className='wine-list'>
          {wines.map(({ _id, name, type, price }) => (
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
                    </div>
                  </div>
                </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
      </ListGroup>
    )
    console.log(wines)
    return (
      <Container>
        { isAuthenticated ? wineList : '' }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  wine: state.wine,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getWines, deleteWine })(WineList);
