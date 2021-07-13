import React from 'react';
import './Task.css';

const TaskComponent = function() {
  return (<div id="task-container">
    <TaskHeader />
    <TaskList />
  </div>)
}

const TaskHeader = function() {
  return (<div id="task-header">
  </div>)
}

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      status: true
    };

    this.getTasks()
      .then((tasks) => {
        this.setState({ tasks })
      });
  }

  render() {
    return (<div id="task-list">
        {
          this.state.tasks.map((task, id) => {
            return <Box key={task.name} task={task} />
          })
        }
      </div>);
  }

  getTasks() {
    return new Promise((fulfill, reject) => {
      fetch('http://localhost:1337/tasks')
        .then((res) => res.json())
        .then(fulfill)
        .catch(reject);
    });
  }
}

const Box = function (props) {
  let task = props.task;

  return (<div className="task">
    <p className="row-description"> {task.name} </p>
    <button className="row-description" >
      {task.done ? "Done" : "On going"}
    </button>
    <p className="row-description"> {task.description} </p>
    <p className="row-description"> {task.date_due} </p>
    <p className="row-description"> {task.time_spent} </p>
  </div>);
}

export default TaskComponent;
