import React, { useState } from "react";
import Header from "./Header";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Notes from "./Notes";
import "./App.css";

function App() {
  const defaultPreset = { name: "Default", workTime: 25, breakTime: 5 };
  const [presets, setPresets] = useState([defaultPreset]);
  const [selectedPreset, setSelectedPreset] = useState(defaultPreset);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPreset, setModalPreset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openEditPresetModal = (preset = null) => {
    setModalPreset(preset);
    setIsEditing(!!preset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addPreset = (preset) => {
    if (isEditing) {
      setPresets((prev) =>
        prev.map((p) => (p.name === preset.name ? preset : p))
      );
    } else {
      setPresets((prev) => [...prev, preset]);
    }
    setSelectedPreset(preset);
  };

  return (
    <div className="app-container">
      <Header 
        presets={presets}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
        openEditPresetModal={openEditPresetModal}
      />
      <div className="main-content">
        <div className="pomodoro-timer">
          <PomodoroTimer
            selectedPreset={selectedPreset}
            isModalOpen={isModalOpen}
            modalPreset={modalPreset}
            isEditing={isEditing}
            closeModal={closeModal}
            addPreset={addPreset}
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