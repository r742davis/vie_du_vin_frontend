import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledCollapse,
  Card,
  CardBody
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getWines, deleteWine } from '../actions/WineActions';
import PropTypes from 'prop-types';
import EditModal from './EditModal';


class WineList extends Component {
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
          {filter.map((
            {_id,
            name,
            type,
            price,
            producer,
            region,
            vintage,
            alcoholPercent,
            tastingNotes,
            grape,
            ownerId }
          ) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem key={_id}>
                  <div className="details-container">
                    <div className="edit-delete-container">
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        style={{width: "30px", height: "30px"}}
                        onClick={this.onDeleteClick.bind(this, _id)}
                      ><i className="fas fa-times"></i>
                      </Button>

                      <EditModal
                        wineId = {_id}
                        wineName = {name}
                        wineType = {type}
                        winePrice = {price}
                        producer = {producer}
                        region = {region}
                        vintage ={vintage}
                        alcoholPercent = {alcoholPercent}
                        tastingNotes = {tastingNotes}
                        grape = {grape}
                      />
                    </div>

                    <div className="wine-list-details">
                      <h3 id="toggler" style={{cursor: "pointer"}}>{name}</h3>
                      <UncontrolledCollapse toggler="#toggler">
                        <Card>
                          <CardBody>
                          <div className="table-responsive">
                            <table>
                              <tbody>
                              <tr>
                                <th>TYPE</th>
                                <th>PRICE</th>
                                <th>PRODUCER</th>
                                <th>REGION</th>
                                <th>VINTAGE</th>
                                <th>ALC %</th>
                                <th>TASTE NOTES</th>
                                <th>GRAPE</th>
                              </tr>
                              <tr>
                                <td>{type}</td>
                                <td>${price}</td>
                                <td>{producer}</td>
                                <td>{region}</td>
                                <td>{vintage}</td>
                                <td>{alcoholPercent} %</td>
                                <td>{tastingNotes}</td>
                                <td>{grape}</td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </div>
                  </div>
                </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
      </ListGroup>
    )

    return (
      <Container className="shadow-lg" style={{borderRadius: "1rem"}}>
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
