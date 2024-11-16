import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const addTask = () => {
    if (newTask.trim() === '') {
      setNewTask('');
      return;
    }
    setTasks([
      ...tasks,
      { text: newTask.trim(), id: Date.now(), completed: false, isEditing: false }
    ]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleClear = () => {
    if (tasks.length > 0) {
      const confirmed = window.confirm('Are you sure you want to clear the task list?');
      if (confirmed) {
        setTasks([]);
      }
    }
  };

  const toggleEditMode = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    ));
  };

  const handleTaskUpdate = (id, newText) => {
    if (newText.trim() === '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, isEditing: false } : task
      ));
    } else {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText.trim(), isEditing: false } : task
      ));
    }
  };

  const togglePanel = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`todoContainer ${isHidden ? 'hidden' : ''}`}>
      <button className="todotoggleButton" onClick={togglePanel}>
        {isHidden ? '→' : '←'}
      </button>
      <h2 className={`todoHeader ${isHidden ? 'hidden' : ''}`}>To-Do List</h2>
      <div className={`input-container ${isHidden ? 'hidden' : ''}`}>
        <input
          className="inputField"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a task..."
        />
        <button className="addButton" onClick={addTask}>Add</button>
        <button
          className="clearButton"
          onClick={handleClear}
          disabled={tasks.length === 0}
        >
          Clear
        </button>
      </div>
      <div className={`tasksContainer ${isHidden ? 'hidden' : ''}`}>
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
                  if (e.key === 'Enter') {
                    handleTaskUpdate(task.id, e.target.value);
                  }
                }}
              />
            ) : (
              <span
                className="completedTask"
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.3 : 1
                }}
                onClick={() => toggleEditMode(task.id)}
              >
                {task.text}
              </span>
            )}
            <button
              className="delTask"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;