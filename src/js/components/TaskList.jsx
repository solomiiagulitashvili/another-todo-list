import React from 'react';
import {
  Card, Button, CardTitle, CardText,
} from 'reactstrap';
import addNotification from '../utils/addNotification';
import '../../main.css';
import getUserObj from '../utils/getUserObj';
import NewTask from './NewTask';
import fromStrToBool from '../utils/fromStrToBool';
import handleResponse from '../utils/handleResponse';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    const { token } = getUserObj();
    fetch('/api/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then(handleResponse)
      .then((tasks) => {
        this.setState({ tasks });
      });
  }

  deleteTask = ({ id: taskId }) => {
    const { token } = getUserObj();
    fetch('/api/tasks/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((res) => {
        if (res.ok) {
          this.getTodoList();
          addNotification('Task deleted.', 'success');
        } else {
          addNotification('Something went wrong! Task is not deleted, try later.', 'danger');
        }
      });
  }

  completeTask = ({ id, completed }) => {
    const { token } = getUserObj();
    fetch('/api/tasks/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        completed: !fromStrToBool(completed),
      }),
    })
      .then((res) => res.text())
      .then(handleResponse)
      .then(() => {
        this.getTodoList();
        addNotification('Task completed', 'success');
      })
      .catch(() => {
        addNotification('Something went wrong! Task is not completed!', 'danger');
      });
  };


    handleDelete = (taskId) => {
      this.deleteTask(taskId);
    };

    handleComplete = (task) => {
      this.completeTask(task);
    };

    renderTask = () => {
      let tasksTemplate = null;

      const { tasks } = this.state;
      if (tasks.length) {
        tasksTemplate = tasks.map((task) => (
          <li className="item" key={task.id}>
            <Card body>
              <CardTitle>
                Title:
                {' '}
                {task.heading}
              </CardTitle>
              <CardText>
                Description:
                {' '}
                {task.description}
              </CardText>
              <span className="priority">
                Priority:
                {' '}
                {task.priority}
              </span>
              <div className="buttons">
                <Button
                  className={fromStrToBool(task.completed) === true ? 'complete' : 'uncomplete'}
                  onClick={() => {
                    this.handleComplete(task);
                  }}
                >
                  {fromStrToBool(task.completed) ? 'Mark as uncomplete' : 'Mark as complete'}
                </Button>
                <Button
                  color="danger"
                  className="delete"
                  onClick={() => {
                    this.handleDelete(task);
                  }}
                >
                    Delete
                </Button>
              </div>
            </Card>
          </li>
        ));
      } else {
        tasksTemplate = <p>No tasks</p>;
      }
      return tasksTemplate;
    };

    render() {
      return (
        <div className="task-list">
          <NewTask getTodoList={this.getTodoList} />
          <h2 className="list-header">Existent tasks</h2>
          <ul className="list">{this.renderTask()}</ul>
        </div>
      );
    }
}

export default TaskList;
