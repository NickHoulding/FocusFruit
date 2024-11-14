import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([
      ...tasks,
      { text: newTask.trim(), id: Date.now(), completed: false }
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

  return (
    <div>
      <h2>To-Do List</h2>
      <div className="input-container">
        <input
          className="inputField"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a task..."
        />
        <button className="addButton" onClick={addTask}>Add</button>
      </div>
      <div>
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span
              className="completedTask"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.3 : 1
              }}
            >
              {task.text}
            </span>
            <button
              className="delTask"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        className="clearButton"
        onClick={handleClear}
        disabled={tasks.length === 0}
      >
        Clear
      </button>
    </div>
  );
};

export default TodoList;