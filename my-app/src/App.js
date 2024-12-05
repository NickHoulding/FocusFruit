import React, { useState } from "react";
import Header from "./Header";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import Notes from "./Notes";
import Modal from "./Modal";
import "./styles/App.css";

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
      {isModalOpen && (
        <Modal onClose={closeModal} isOpen={isModalOpen}>
          <h2>{isEditing ? "Edit Preset" : "Add Preset"}</h2>
          <label>
            Preset Name:
            <br></br>
            <input
              className="inputField"
              type="text"
              value={modalPreset?.name || ""}
              onChange={(e) =>
                setModalPreset((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Work Time (minutes):
            <input
              className="inputField"
              type="number"
              value={modalPreset?.workTime || 0}
              onChange={(e) =>
                setModalPreset((prev) => ({ ...prev, workTime: Number(e.target.value) }))
              }
              min="1"
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Break Time (minutes):
            <input
              className="inputField"
              type="number"
              value={modalPreset?.breakTime || 0}
              onChange={(e) =>
                setModalPreset((prev) => ({ ...prev, breakTime: Number(e.target.value) }))
              }
              min="1"
            />
          </label>
          <button onClick={() => addPreset(modalPreset)}>Save</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
