import React from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import addNotification from '../utils/addNotification';
import handleResponse from '../utils/handleResponse';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then(handleResponse)
      .then((user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        const { history } = this.props;
        history.push('/task-list');
      })
      .catch(() => addNotification('Error! Something went wrong, try again later.', 'danger'));
  }

  handleChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { login, password } = this.state;
    return (
      <Row>
        <Col xs="12" sm={{ size: 4, offset: 4 }}>
          <div className="log-in">
            <h2>Log in</h2>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="email">Login</Label>
                <Input type="email" name="login" id="email" value={login} onChange={this.handleChangeInput} placeholder="Enter your username or e-mail" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" value={password} onChange={this.handleChangeInput} placeholder="Enter your password" />
              </FormGroup>
              <Button type="submit">Log in</Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginWithRouter = withRouter(Login);
export default LoginWithRouter;
