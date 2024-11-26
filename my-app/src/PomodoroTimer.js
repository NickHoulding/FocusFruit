import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./PomodoroTimer.css";
import pen from "./pen.png";

const PomodoroTimer = ({
   volume
}) => {
   const defaultPreset = { name: "Default", workTime: 25, breakTime: 5 };
   const [presets, setPresets] = useState([defaultPreset]); 
   const [selectedPreset, setSelectedPreset] = useState(defaultPreset); 
   const [workTime, setWorkTime] = useState(defaultPreset.workTime); 
   const [breakTime, setBreakTime] = useState(defaultPreset.breakTime); 
   const [time, setTime] = useState(workTime * 60); 
   const [isWorkSession, setIsWorkSession] = useState(true);
   const [isActive, setIsActive] = useState(false);
   const [message, setMessage] = useState(""); 
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalPreset, setModalPreset] = useState(null); 
   const [isEditing, setIsEditing] = useState(false);
   const [audio] = useState(new Audio('/sounds/new-notification-7-210334.mp3'));

   useEffect(() => {
      if (isWorkSession) {
         setTime(workTime * 60);
      } else {
         setTime(breakTime * 60);
      }
   }, [workTime, breakTime, isWorkSession]);

   useEffect(() => {
      let interval;
      if (isActive && time > 0) {
         interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
         }, 1000);
      } else if (time === 0 && isActive) {
         if (!isNaN(volume) && volume >= 0 && volume <= 100) {
            audio.volume = volume / 100;
         }
         audio.play().catch(error => {
            console.error("Error playing audio:", error);
         });
         setMessage(isWorkSession ? "Great Job! You've earned a break." : "");
         setIsWorkSession(!isWorkSession);
         setIsActive(false);
      }
      return () => clearInterval(interval);
   }, [time, isActive, isWorkSession, volume]);

   useEffect(() => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const sessionType = isWorkSession ? "W:" : "B:";
      if (time < 60) {
         document.title = `${sessionType} Ending...`;
      } else {
         document.title = `${sessionType} ${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? ` ${minutes}m` : ""}`;
      }
   }, [time, isWorkSession]);

   const applyPreset = (preset) => {
      setSelectedPreset(preset);
      setWorkTime(preset.workTime);
      setBreakTime(preset.breakTime);
    
      if (isWorkSession) {
         setTime(preset.workTime * 60);
      } else {
         setTime(preset.breakTime * 60);
      }
    
      setIsActive(false); 
    };

   const openAddPresetModal = () => {
      setModalPreset({ name: "", workTime: 25, breakTime: 5 });
      setIsEditing(false);
      setIsModalOpen(true);
   };

   const openEditPresetModal = (preset) => {
      setModalPreset({ ...preset }); 
      setIsEditing(true);
      setIsModalOpen(true);
   };

   const savePreset = () => {
      if (modalPreset.name.trim() === "") return;
    
      if (isEditing) {

         setPresets((prevPresets) =>
            prevPresets.map((preset) =>
               preset.name === selectedPreset.name ? modalPreset : preset
            )
         );
      
         if (selectedPreset.name === modalPreset.name) {
               setSelectedPreset(modalPreset);
               setWorkTime(modalPreset.workTime);
               setBreakTime(modalPreset.breakTime);
         
               if (isWorkSession) {
                  setTime(modalPreset.workTime * 60);
               } else {
                  setTime(modalPreset.breakTime * 60);
               }
         }
         applyPreset(modalPreset); 
      } else {
         setPresets((prevPresets) => [...prevPresets, modalPreset]);
         applyPreset(modalPreset);
      }
    
      setIsModalOpen(false);
   };

   const toggleTimer = () => {
      setMessage("");
      setIsActive(!isActive);
   }

   const resetTimer = () => {
      setIsActive(false);
      setMessage("");
      setTime(isWorkSession ? workTime * 60 : breakTime * 60);
   };

   return (
      <div className="pomodoro-timer-container">
         <h1>FocusFruit</h1>
       
         <div>
         <label>
            Presets:
            <select
               value={selectedPreset.name}
               onChange={(e) =>
               applyPreset(presets.find((preset) => preset.name === e.target.value))
               }
            >
               {presets.map((preset) => (
               <option key={preset.name} value={preset.name}>
                  {preset.name}
               </option>
               ))}
            </select>
         </label>
         <button onClick={openAddPresetModal}>Add Preset</button>
         </div>
         <br></br><br></br>

         {message && <p className="message">{message}</p>}
         <div className="pomodoro-timer-buttons"  >
            <button onClick={() => openEditPresetModal(selectedPreset)}><img src={pen} alt="Pen"></img></button>
            <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
            <button onClick={resetTimer}>Reset</button>
         </div>

         <div className="pomodoro-timer-display">
         <div>{`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}</div>
         </div>

         <h2>{isWorkSession ? "Work Session" : "Break Session"}</h2>
   
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>{modalPreset?.name ? "Edit Preset" : "Add Preset"}</h2>
            <label className="modal-line">
               Preset Name:
               <input
                  class="inputField"
                  type="text"
                  value={modalPreset?.name || ""}
                  onChange={(e) =>
                     setModalPreset((prev) => ({ ...prev, name: e.target.value }))
                  }
               />
            </label>
            <br></br>
            <label className="modal-line">
               Work Time (minutes):
               <input
                  class="inputField"
                  type="number"
                  value={modalPreset?.workTime || !0}
                  onChange={(e) =>
                     setModalPreset((prev) => ({ ...prev, workTime: Number(e.target.value) }))
                  }
                  min="1"
               />
            </label>
            <br></br>
            <label className="modal-line">
               Break Time (minutes):
               <input
                  class="inputField"
                  type="number"
                  value={modalPreset?.breakTime || !0}
                  onChange={(e) =>
                     setModalPreset((prev) => ({ ...prev, breakTime: Number(e.target.value) }))
                  }
                  min="1"
               />
            </label>
            <br></br>
            <button onClick={savePreset}>Save</button>
         </Modal>
      </div>
   );
}; 


export default PomodoroTimer;
