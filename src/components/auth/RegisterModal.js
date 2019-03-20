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
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class RegisterModal extends Component {
  state = {
    modalOpen: false,
    name: '',
    email: '',
    password: '',
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      //Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({ message: error.message.message })
      } else {
        this.setState({ message: null })
      }
    }

    //If authenticated, close modal
    if(this.state.modalOpen) {
      if (isAuthenticated) {
        this.toggleModal();
      }
    }
  }

  toggleModal = () => {
    //Clear errors
    this.props.clearErrors();
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

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    }

    //Attempt to register
    this.props.register(newUser)

    //Close modal
    // this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} href="#" className="btn btn-dark"> Register </Button>

        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal} className="modal-header shadow p-3 mb-2 bg-white">Register</ModalHeader>
            <ModalBody>
            { this.state.message
              ? <Alert color="danger">{this.state.message}</Alert>
              : null }
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="wine">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="mb-4"
                    onChange={this.onChange}
                  />
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="mb-4"
                    onChange={this.onChange}
                  />
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="mb-4"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <ModalFooter>
                  <Input
                    color="primary"
                    type="submit"
                    value="Register"
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { register, clearErrors })(RegisterModal);
