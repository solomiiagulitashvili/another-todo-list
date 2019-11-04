import React from 'react';
import '../../main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import TaskList from './TaskList';
import getUserObj from '../utils/getUserObj';


const App = () => (
  <>
    <ReactNotification />
    <Router>
      <Header />
      <div>
        <Route exact path="/">
          {getUserObj() ? <Redirect to="/task-list" /> : <Redirect to="/login" />}
        </Route>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/task-list">
            <TaskList />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);


export default App;
