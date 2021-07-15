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
    this.handleDelete = this.handleDelete.bind(this)
    this.getTasks()
      .then((tasks) => { this.setState({ tasks }) });
  }

  render() {
    return (<div id="task-container">
      <TaskHeader submitTaskHandler={this.submitTaskHandler}/>
      <TaskList 
        tasks={this.state.tasks}
        handleDelete={this.handleDelete}
      />
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
    const taskIsDone = Boolean(data.get('done'));
    let body;

    data.set('done', taskIsDone)
    body = JSON.stringify(Object.fromEntries(data))

    fetch(API_URL, {
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
      body,
    })
      .then(response => response.json())
      .then(this.getTasks)
      .then((tasks) => { this.setState({ tasks }) })
      .catch(console.log)
  }
  handleDelete(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(this.getTasks)
      .then((tasks) => { this.setState({ tasks }) })
      .catch(console.log)
  }
}

const TaskHeader = function(props) {
  function taskFormToggle() {
    document.getElementById('task-form').classList.toggle('hidden');
  }

  return (<div id="task-header">
    {/*
    <button
      className="action"
      onClick={taskFormToggle}
    >
      New task
    </button>
    */}
    <form
      id="task-form" className={""/*hidden*/}
      onSubmit={(e) => props.submitTaskHandler(e)}
    >
      <label htmlFor="name">Task name</label>
      <input type="text" name="name"/>

      <label htmlFor="description">Task description</label>
      <input type="text" name="description"/>

      <label htmlFor="date_due">Task Date due</label>
      <input type="date" name="date_due"/>

      <label htmlFor="time_spent">Task time (in hours)</label>
      <input type="number" name="time_spent"/>

      <label htmlFor="done">Task completed</label>
      <input type="checkbox" name="done"/>

      <input type="submit" value="Create"/>
    </form>
  </div>);
}

const TaskList = function(props) {
  const tasks = props.tasks;
  const desc = (a, b) => b.id - a.id;

  return (
    <div id="task-list">
      {tasks.sort(desc).map((task) => {
        return (<div key={task.id} className="task">
          <p className="task-title"> {task.name} </p>
          <button className={`task-status ${task.done?"done":""}`} >
            {task.done ? "Done" : "On going"}
          </button>
          <button
            className="task-delete"
            onClick={() => props.handleDelete(task.id)}
          >
            X
          </button>
          <p className="task-description"> {task.description} </p>
          <p className="task-description"> {task.date_due} </p>
          <p className="task-description"> {task.time_spent} </p>
        </div>);
      })}
    </div>
  );
}

export default TaskComponent;
