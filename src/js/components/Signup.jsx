import React from 'react';
import '../../main.css';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import addNotification from '../utils/addNotification';
import handleResponse from '../utils/handleResponse';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    };
  }

  handleSignup = (e) => {
    e.preventDefault();
    const {
      password, confirmPassword, email, username,
    } = this.state;
    if (password !== confirmPassword) {
      addNotification('Error! Passwords do not match, try again.', 'danger');
      return;
    }

    fetch('/api/register/', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then(handleResponse)
      .then(() => {
        addNotification('User created. Please log in and add some new tasks.', 'success');
        const { history } = this.props;
        history.push('/login');
      })
      .catch(() => {
        addNotification('Error! Something went wrong, try again later.', 'danger');
        this.setState({
          username: '', email: '', password: '', confirmPassword: '',
        });
      });
  }

  handleChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      email, password, username, confirmPassword,
    } = this.state;
    return (
      <Row>
        <Col xs="12" sm={{ size: 4, offset: 4 }}>
          <div className="log-in">
            <h2>Sign up</h2>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label for="name">Username</Label>
                <Input
                  type="name"
                  name="username"
                  id="name"
                  value={username}
                  onChange={this.handleChangeInput}
                  placeholder="Enter username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.handleChangeInput}
                  placeholder="Enter your e-mail"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChangeInput}
                  placeholder="Enter your password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirm-password">Confirm password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={this.handleChangeInput}
                  placeholder="Confirm your password"
                />
              </FormGroup>
              <Button type="submit" block>Sign up</Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default withRouter(Signup);
