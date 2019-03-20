import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addWine } from '../actions/WineActions';
import PropTypes from 'prop-types';

class WineModal extends Component {
  state = {
    modalOpen: false,
    name: '',
    price: '',
    value: 'Red'
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  /* Sets e.target.name so that you can create multiple input values and not have to hard code onChange multiple times*/
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onValueChange = (e) => {
    this.setState({ value: e.target.value })
  }

  /*Form Submission - prevents default reloading. Creating a new wine*/
  onSubmit = (e) => {
    e.preventDefault()
    const newWine = {
      name: this.state.name,
      type: this.state.value,
      price: this.state.price,
      ownerId: this.props.auth.user._id
    }

    console.log(newWine)
    //Add wine via addWine action
    this.props.addWine(newWine);

    //Close modal
    this.toggleModal();
  }

  render() {
    return (
      <div>

        { this.props.isAuthenticated
          ? <Button
              color="dark"
              style={{marginBottom: '2rem'}}
              onClick={this.toggleModal}
            >Add Wine</Button>
          : <h4 className="mb-3 ml-4">Please log in to see your wine list</h4> }


        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>Add to Your Wine List</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="wine">Wine</Label>
                  <Input
                    type="text"
                    name="name"
                    id="wine"
                    placeholder="Wine Name"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <select
                    name="type"
                    placeholder="Pick Wine Type"
                    value={this.state.value}
                    onChange={this.onValueChange}
                  >
                    <option value="Red">Red</option>
                    <option value="White">White</option>
                    <option value="Red Blend">Red Blend</option>
                    <option value="White Blend">White Blend</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <ModalFooter>
                  <Input
                    color="primary"
                    type="submit"
                    value="Add Wine"
                  />
                  <Button
                    color="secondary"
                    onClick={this.toggleModal}
                  >Cancel</Button>
                </ModalFooter>
              </Form>
            </ModalBody>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  wine: state.wine,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addWine })(WineModal);
