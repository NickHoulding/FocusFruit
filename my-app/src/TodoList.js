import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, 
      { text: newTask, id: Date.now(), completed: false }]
    );
    setNewTask("");
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
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        className="inputField"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter a task..."
      />
      <button onClick={addTask}>Add</button>
      <div>
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className="completedTask"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.30 : 1
              }}
            >
              {task.text} 
              <button className="delTask" onClick={() => deleteTask(task.id)}>X</button>
            </span>
          </div>
        ))}
      </div>
      <button className="clearButton" onClick={() => setTasks([])}>Clear</button>
    </div>
  );
};

export default TodoList;