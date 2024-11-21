import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const PomodoroTimer = ({
   //selectedPreset,
   //setSelectedPreset,
   //isModalOpen,
   //modalPreset,
   //isEditing,
   closeModal,
   addOrUpdatePreset,
   //setModalPreset,
   //setIsEditing,
   //setIsModalOpen,

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
         setMessage(isWorkSession ? "Great Job! You've earned a break." : "");
         setIsWorkSession(!isWorkSession);
         setIsActive(false);
      }
      return () => clearInterval(interval);
   }, [time, isActive, isWorkSession]);

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
      <div>
         <h2>Pomodoro Timer</h2>
       
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


         <div>
         <h3>{isWorkSession ? "Work Session" : "Break Session"}</h3>
         <div>{`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}</div>
         </div>
         {message && <p className="message">{message}</p>}
         <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
         <button onClick={resetTimer}>Reset</button>
         <button onClick={() => openEditPresetModal(selectedPreset)}>Edit Preset</button>

   
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>{modalPreset?.name ? "Edit Preset" : "Add Preset"}</h2>
            <label>
               Preset Name:
               <br></br>
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
            <br></br>
            <label>
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
            <br></br>
            <label>
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
            <button onClick={savePreset}>Save</button>
         </Modal>
      </div>
   );
}; 


export default PomodoroTimer;
