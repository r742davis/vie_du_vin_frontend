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
import uuid from 'uuid';

class WineModal extends Component {
  state = {
    modalOpen: false,
    wineName: ''
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

  /*Form Submission - prevents default reloading. Creating a new wine*/
  onSubmit = (e) => {
    e.preventDefault()
    const newWine = {
      id: uuid(),
      name: this.state.wineName
    }

    //Add wine via addWine action
    this.props.addWine(newWine);

    //Close modal
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggleModal}
        >Add Wine</Button>

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
                    name="wineName"
                    id="wine"
                    placeholder="Add wine"
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
  wine: state.wine
})

export default connect(mapStateToProps, { addWine })(WineModal);
