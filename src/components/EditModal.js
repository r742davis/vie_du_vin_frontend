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
    value: this.props.wineType,
    region: this.props.region,
    vintage: this.props.vintage,
    producer: this.props.producer,
    alcoholPercent: this.props.alcoholPercent,
    tastingNotes: this.props.tastingNotes,
    grape: this.props.grape
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
      price: this.state.price,
      region: this.state.region,
      vintage: this.state.vintage,
      producer: this.state.producer,
      alcoholPercent: this.state.alcoholPercent,
      tastingNotes: this.state.tastingNotes,
      grape: this.state.grape
    }

    //Update wine
    this.props.updateWine(this.props.wineId, updatedWine, this.props.wine);

    //Close modal
    this.toggleModal();
  }

  render() {
    return(
      <div>
          <Button
            color="dark"
            style={{width: "30px", height: "30px", marginRight: "1rem" }}
            size="sm"
            onClick={this.toggleModal}
          ><i className="fas fa-pencil-alt"></i>
          </Button>

        <Modal
          isOpen={this.state.modalOpen}
        >
          <ModalHeader className="modal-header shadow p-3 mb-2 bg-white">Edit Your Wine</ModalHeader>
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
                <FormGroup
                  style={{display: "flex", flexDirection: "column"}}
                >
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
                <FormGroup>
                  <Label for="producer">Producer</Label>
                  <Input
                    type="text"
                    name="producer"
                    id="producer"
                    value={this.state.producer}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="region">Region</Label>
                  <Input
                    type="text"
                    name="region"
                    id="region"
                    value={this.state.region}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="vintage">Vintage</Label>
                  <Input
                    type="number"
                    name="vintage"
                    id="vintage"
                    value={this.state.vintage}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="alcoholPercent">Alcohol Percentage</Label>
                  <Input
                    type="number"
                    name="alcoholPercent"
                    id="alcoholPercent"
                    value={this.state.alcoholPercent}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tastingNotes">Tasting Notes</Label>
                  <Input
                    type="text"
                    name="tastingNotes"
                    id="tastingNotes"
                    value={this.state.tastingNotes}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="grape">Grape</Label>
                  <Input
                    type="text"
                    name="grape"
                    id="grape"
                    value={this.state.grape}
                    placeholder="Type of grape?"
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
