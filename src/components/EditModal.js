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
import { updateWine } from '../actions/WineActions';

class EditModal extends Component {
  state = {
    modalOpen: false,
    name: this.props.wineName,
    price: this.props.winePrice,
    value: this.props.wineType
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
    console.log(this.props.wineId)
    const updatedWine = {
      name: this.state.name,
      type: this.state.value,
      price: this.state.price
    }

    //Update wine
    this.props.updateWine(this.props.wineId, updatedWine);

    //Close modal
    this.toggleModal();
  }

  render() {
    return(
      <div>
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            size="sm"
            onClick={this.toggleModal}
          ><i className="fas fa-pencil-alt"></i>
          </Button>

        <Modal
          isOpen={this.state.modalOpen}
        >
          <ModalHeader>Edit Your Wine</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="wine">Wine</Label>
                  <Input
                    type="text"
                    name="name"
                    id="wine"
                    value={this.state.name}
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
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Form>

                <ModalFooter>
                  <Input
                    color="primary"
                    type="submit"
                    value="Update Wine"
                    onClick={this.onSubmit}
                  />
                  <Button
                    color="secondary"
                    onClick={this.toggleModal}
                  >Cancel</Button>
                </ModalFooter>

            </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  wine: state.wine
})

export default connect(mapStateToProps, { updateWine })(EditModal);
