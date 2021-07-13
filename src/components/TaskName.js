import './Task.css';
function TaskName(props) {
  let task = props.task;

  return (
    <div className="task">
      <h3 className="row-title"> Task </h3>
      <p className="row-description"> {task.name} </p>

      <h3 className="row-title"> Status </h3>
      <button
        className="row-description"
        onClick={ () => console.log('toggle') }
      >
        {task.done ? "Done" : "On going"}
      </button>

      <h3 className="row-title"> Description </h3>
      <p className="row-description"> {task.description} </p>

      <h3 className="row-title"> Date due </h3>
      <p className="row-description"> {task.date_due} </p>

      <h3 className="row-title"> Time spent </h3>
      <p className="row-description"> {task.time_spent} </p>
    </div>
  );
}

export default TaskName;
