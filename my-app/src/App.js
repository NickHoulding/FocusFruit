import React, { useState } from "react";
import Header from "./Header";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Notes from "./Notes";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPreset, setModalPreset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openEditPresetModal = (preset) => {
    setModalPreset(preset);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Header openEditPresetModal={openEditPresetModal} />
      <div className="main-content">
        <div className="pomodoro-timer">
          <PomodoroTimer
            isModalOpen={isModalOpen}
            modalPreset={modalPreset}
            isEditing={isEditing}
            closeModal={closeModal}
          />
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