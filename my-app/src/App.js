import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Notes from "./Notes";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="todo-list">
        <TodoList/>
      </div>
      <div className="pomodoro-timer">
        <PomodoroTimer/>
      </div>
      <div className="notes-section">
        <Notes/>
      </div>
    </div>
  );
}

export default App;
