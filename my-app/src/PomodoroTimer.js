import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./styles/PomodoroTimer.css";

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
   const [isResetModalOpen, setIsResetModalOpen] = useState(false);
   const [currentHint, setCurrentHint] = useState("");

   const hints = [
      "Remember to sit up straight and maintain good posture!",
      "Take a deep breath and relax your shoulders.",
      "Stay hydrated—grab a glass of water during your break!",
      "Organize your workspace to stay focused.",
      "Stretch your legs for a minute during your break.",
      "Keep distractions like your phone out of reach!",
      "Visualize your goals for the day before starting again.",
      "Write down stray thoughts to revisit later without losing focus.",
      "Break big tasks into smaller, manageable chunks.",
      "Imagine how satisfying it will feel to complete this task."
   ];

   const getRandomHint = () => {
      const randomIndex = Math.floor(Math.random() * hints.length);
      return hints[randomIndex];
   };

   const changeHint = () => {
      const newHint = getRandomHint();
      setCurrentHint(newHint);
   };

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
         const rootVolume = getComputedStyle(document.documentElement).getPropertyValue('--default-timer-volume');
         audio.volume = parseFloat(rootVolume);
         audio.play().catch(error => {
            console.error("Error playing audio:", error);
         });
         setMessage(isWorkSession ? "Great Job! You've earned a break." : "");
         setIsWorkSession(!isWorkSession);
         setIsActive(false);
         
         const changeHint = () => {
            const newHint = getRandomHint();
            setCurrentHint(newHint);
         };
         changeHint();
      }
      return () => clearInterval(interval);
   }, [time, isActive, isWorkSession, volume, audio, currentHint, changeHint]);

   useEffect(() => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const sessionType = isWorkSession ? "W:" : "B:";
      if (time < 60) {
         document.title = `${sessionType} Finishing up...`;
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

   const openResetModal = () => {
      setIsResetModalOpen(true);
   };

   const confirmReset = () => {
      setIsActive(false);
      setMessage("");
      setTime(isWorkSession ? workTime * 60 : breakTime * 60);
      setIsResetModalOpen(false);
   };

   const cancelReset = () => {
      setIsResetModalOpen(false);
   };

   return (
      <div className="pomodoro-timer-container">
         {/* <h1 className="timer-title" >FocusFruit</h1> */}
         <div className="presets">
            <label className="preset-label">
               Presets:
               <select
                  className="preset-select"
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
               <button 
                  className="add-preset-button"
                  onClick={openAddPresetModal}>{"Add Preset"}
            </button>
            </label>
         </div>
       
         {message && <p className="message">{message}</p>}

         <div className="pomodoro-timer-display">
            <h2 className="session-type">
               {isWorkSession ? "Work Session" : "Break Session"}
            </h2>
            <div className="timer">
               {time >= 3600
                  ? `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
                  : time >= 60
                  ? `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
                  : `${time}s`}
            </div>
         </div>

         <div className="control-buttons"  >
            <button className="pomodoro-timer-buttons" onClick={() => openEditPresetModal(selectedPreset)}> {"Edit"}</button>
            <button className="pomodoro-timer-buttons" onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
            <button className="pomodoro-timer-buttons" onClick={openResetModal}>Reset</button>
         </div>
   
         <div className="hints">
            <p>{currentHint || "Set a clear goal for this session - what do you want to achieve?"}</p>
         </div>

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
            <button className="save-button" onClick={savePreset}><h3>Save</h3></button>
         </Modal>

         <Modal 
            className="resetModal"
            isOpen={isResetModalOpen} 
            onClose={cancelReset}>
            <h2 className='no-spacing'>
               Reset Timer</h2>
            <p className='bottom-spacing'>Are you sure you want to reset the timer?</p>
            <div className="modal-buttons">
               <button 
                  className='noButton'
                  onClick={cancelReset}>
                  <h2 className='buttonText'>
                  No
                  </h2>
               </button>
               <button 
                  className='yesButton'
                  onClick={confirmReset}>
                  <h2 className='buttonText'>
                     Yes
                  </h2>
               </button>
            </div>
         </Modal>
      </div>
   );
}; 


export default PomodoroTimer;
