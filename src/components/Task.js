import React from 'react';
import './Task.css';
const API_URL = 'http://localhost:1337/tasks'

class TaskComponent extends React.Component {
  constructor() {
    super()

    this.state = {
      tasks: [],
    };
    this.submitTaskHandler = this.submitTaskHandler.bind(this)
    this.getTasks()
      .then((tasks) => { this.setState({ tasks }) });
  }

  render() {
    return (<div id="task-container">
      <TaskHeader submitTaskHandler={this.submitTaskHandler}/>
      <TaskList tasks={this.state.tasks}/>
    </div>)
  }

  getTasks() {
    return new Promise((fulfill, reject) => {
      fetch(API_URL)
        .then((res) => res.json())
        .then(fulfill)
        .catch(reject);
    });
  }

  submitTaskHandler(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    fetch(API_URL, {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data))
    })
      .then(response => response.json())
      .then(() => {
        this.getTasks()
          .then((tasks) => { this.setState({ tasks }) });
      })
      .catch(console.log)
  }
}

const TaskHeader = function(props) {
  function taskFormToggle() {
    document.getElementById('task-form').classList.toggle('hidden');
  }

  return (<div id="task-header">
    <button
      className="action"
      onClick={taskFormToggle}
    >
      New task
    </button>
    <form
      id="task-form" className="hidden"
      onSubmit={(e) => {
        props.submitTaskHandler(e)
      }}
    >
      <label htmlFor="name">Task name</label>
      <input type="text" name="name"/>
      <input type="submit" value="Create"/>
    </form>
  </div>);
}

const TaskList = function(props) {
  const tasks = props.tasks;
  const desc = (a, b) => b.id - a.id;

  return (
    <div id="task-list">
      {tasks.sort(desc).map((task, id) => {
        return (<div key={task.id} className="task">
          <p className="row-description"> {task.name} </p>
          <button className="row-description" >
            {task.done ? "Done" : "On going"}
          </button>
          <p className="row-description"> {task.description} </p>
          <p className="row-description"> {task.date_due} </p>
          <p className="row-description"> {task.time_spent} </p>
        </div>);
      })}
    </div>
  );
}

export default TaskComponent;
