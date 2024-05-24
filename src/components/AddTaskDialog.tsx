import "./AddTaskDialog.css";

const AddTaskDialog = (props: any) => {
  const { onClose, isNewTask, title, setTitle, status, setStatus, id } = props;

  const handleAddTask = async () => {
    await fetch("https://prm-api.onrender.com/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: title, status }),
    });
    onClose();
  };

  const handleEditTask = async () => {
    await fetch(`https://prm-api.onrender.com/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: title, status }),
    });
    onClose();
  };

  const handleTask = () => {
    if (isNewTask) {
      handleAddTask();
    } else {
      handleEditTask();
    }
  };

  return (
    <div className="dialog">
      <h2>{isNewTask?'Add Task':'Edit Task'}</h2>
      <input
        type="text"
        className="taskInput"
        placeholder="Task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        className="taskStatus">
        <option
          defaultValue={"Select"}
          hidden>
          Select
        </option>
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        className="addBtn"
        onClick={() => {
          handleTask();
        }}>
        {isNewTask ? "Add Task" : "Edit Task"}
      </button>
      <button
        className="closeBtn"
        onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <line
            x1="18"
            y1="6"
            x2="6"
            y2="18"></line>
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default AddTaskDialog;
