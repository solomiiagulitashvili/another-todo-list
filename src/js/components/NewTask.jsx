import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import getUserObj from '../utils/getUserObj';
import addNotification from '../utils/addNotification';
import handleResponse from '../utils/handleResponse';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      heading: '',
      description: '',
      isPersonal: false,
      completed: false,
      assignee: null,
      priority: 'low',
    };
  }


  handleAddTask = () => {
    const { token } = getUserObj();
    const {
      heading, priority, description, isPersonal, completed, assignee,
    } = this.state;
    fetch('/api/tasks/', {
      method: 'POST',
      body: JSON.stringify({
        heading, priority, description, isPersonal, completed, assignee,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then(handleResponse)
      .then(this.setState({ modal: false }))
      .then(() => {
        const { getTodoList } = this.props;
        getTodoList();
        addNotification('Task successfully added.', 'success');
      })
      .catch(() => addNotification('Something went wrong! Task is not added.', 'danger'));
  };


  setModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    const {
      modal, priority, heading, description,
    } = this.state;

    return (
      <div className="new-task">
        <Button color="danger" onClick={this.setModal}>Create new task</Button>
        <Modal isOpen={modal} toggle={this.setModal}>
          <ModalHeader toggle={this.setModal}>Create new task</ModalHeader>
          <ModalBody>
            <FormGroup className="title">
              <Label for="title">Task title</Label>
              <Input type="text" name="heading" id="title" placeholder="Enter task title" value={heading} onChange={this.handleInput} />
            </FormGroup>
            <FormGroup>
              <Label for="taskText">Task text</Label>
              <Input type="textarea" name="description" id="taskText" placeholder="Enter task text" value={description} onChange={this.handleInput} />
            </FormGroup>
            <FormGroup>
              <Label for="select">Choose priority</Label>
              <Input type="select" name="priority" id="select" value={priority} onChange={this.handleInput}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAddTask}>Create new task</Button>
            {' '}
            <Button color="secondary" onClick={this.setModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

NewTask.propTypes = {
  getTodoList: PropTypes.func.isRequired,
};

export default NewTask;
