import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import getUserObj from '../utils/getUserObj';

class Header extends React.Component {
    handleLogoutClick = () => {
      localStorage.removeItem('userInfo');
      const { history } = this.props;
      history.push('/login');
    }

    render() {
      const userInfo = getUserObj();
      return (
        <div className="header">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><h1>To-do List</h1></NavbarBrand>
            <Nav className="ml-auto" navbar>
              {
                userInfo
                  ? (
                    <>
                      <span className="username">{userInfo.user.username}</span>
                      <NavItem onClick={this.handleLogoutClick}>Log out</NavItem>
                    </>
                  )
                  : (
                    <>
                      <NavItem>
                        <Link to="/login">Log In</Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/signup">Sign Up</Link>
                      </NavItem>
                    </>
                  )
                }
            </Nav>
          </Navbar>
        </div>
      );
    }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Header);
