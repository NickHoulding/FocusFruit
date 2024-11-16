import React from "react";
import Header from "./Header";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Notes from "./Notes";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="pomodoro-timer">
          <PomodoroTimer/>
        </div>
        <div className="todo-list">
          <TodoList/>
        </div>
        <div className="notes-section">
          <Notes/>
        </div>
      </div>
    </div>
  );
}

export default App;