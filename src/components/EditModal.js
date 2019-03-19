mport React, { Component } from 'react';
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
import { updateWine } from '../actions/WineActions';
import PropTypes from 'prop-types';

class EditModal extends Component {
  state = {
    
  }

  static propTypes = {
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
    const updatedWine = {
      name: this.state.name,
      type: this.state.value,
      price: this.state.price
    }

    //Add wine via addWine action
    this.props.updateWine(updatedWine);

    //Close modal
    this.toggleModal();
  }

  render() {
    return(
      <div>

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
