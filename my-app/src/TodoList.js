import React, { useState } from "react";
import "./styles/TodoList.css";
import Modal from "./Modal";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const addTask = () => {
    if (newTask.trim() === "") {
      setNewTask("");
      return;
    }
    setTasks([
      ...tasks,
      {
        text: newTask.trim(),
        id: Date.now(),
        completed: false,
        isEditing: false,
      },
    ]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleClear = () => {
    setIsClearModalOpen(true);
  };

  const confirmClear = () => {
    setTasks([]);
    setIsClearModalOpen(false);
  };

  const cancelClear = () => {
    setIsClearModalOpen(false);
  };

  const toggleEditMode = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleTaskUpdate = (id, newText) => {
    if (newText.trim() === "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isEditing: false } : task
        )
      );
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: newText.trim(), isEditing: false }
            : task
        )
      );
    }
  };

  const togglePanel = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`todoContainer ${isHidden ? "hidden" : ""}`}>
      <button className="todotoggleButton" onClick={togglePanel}>
        {isHidden ? (
          <svg className="todoListIcon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 208C21.49 208 0 229.5 0 256s21.49 48 48 48S96 282.5 96 256S74.51 208 48 208zM48 368C21.49 368 0 389.5 0 416s21.49 48 48 48S96 442.5 96 416S74.51 368 48 368zM48 48C21.49 48 0 69.49 0 96s21.49 48 48 48S96 122.5 96 96S74.51 48 48 48zM192 128h288c17.67 0 32-14.33 32-31.1S497.7 64 480 64H192C174.3 64 160 78.33 160 95.1S174.3 128 192 128zM480 224H192C174.3 224 160 238.3 160 256s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 224 480 224zM480 384H192c-17.67 0-32 14.33-32 32s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 384 480 384z" />
</svg>
        ) : (
          <span className="closeIcon">&#10006;</span>
        )}
      </button>
      <h2 className={`todoHeader ${isHidden ? "hidden" : ""}`}>To-Do List</h2>
      <div className={`input-container ${isHidden ? "hidden" : ""}`}>
        <button
          className="clearButton"
          onClick={handleClear}
          disabled={tasks.length === 0}
        >
          Clear
        </button>
        <button className="addButton" onClick={addTask}>
          Add
        </button>
      </div>
      <input
        className={`inputField ${isHidden ? "hidden" : ""}`}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter a task..."
      />
      <div className={`tasksContainer ${isHidden ? "hidden" : ""}`}>
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.isEditing ? (
              <input
                type="text"
                className="editInput"
                defaultValue={task.text}
                onBlur={(e) => handleTaskUpdate(task.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTaskUpdate(task.id, e.target.value);
                  }
                }}
              />
            ) : (
              <span
                className="completedTask"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.3 : 1,
                }}
                onClick={() => toggleEditMode(task.id)}
              >
                {task.text}
              </span>
            )}
            <button className="delTask" onClick={() => deleteTask(task.id)}>
              &#10006;
            </button>
          </div>
        ))}
      </div>
      <Modal
        className="clearModal"
        isOpen={isClearModalOpen}
        onClose={cancelClear}
      >
        <h2 className="no-spacing">Clear To-Do List</h2>
        <p className="bottom-spacing">
          Are you sure you want to clear the To-Do list?
        </p>
        <div className="modal-buttons">
          <button className="noButton" onClick={cancelClear}>
            <h2 className="buttonText">No</h2>
          </button>
          <button className="yesButton" onClick={confirmClear}>
            <h2 className="buttonText">Yes</h2>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
