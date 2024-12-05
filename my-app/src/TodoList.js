import React, { useState } from 'react';
import './styles/TodoList.css';
import Modal from './Modal';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

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
              &#10006;
            </button>
          </div>
        ))}
      </div>
      <Modal 
        className="clearModal"
        isOpen={isClearModalOpen} 
        onClose={cancelClear}>
        <h2 className='no-spacing'>
          Clear To-Do List</h2>
        <p className='bottom-spacing'>Are you sure you want to clear the To-Do list?</p>
        <div className="modal-buttons">
          <button 
            className='noButton'
            onClick={cancelClear}>
              <h2 className='buttonText'>
              No
              </h2>
          </button>
          <button 
            className='yesButton'
            onClick={confirmClear}>
              <h2 className='buttonText'>
                Yes
              </h2>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;