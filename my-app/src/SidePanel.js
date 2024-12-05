import React, { useState } from "react";
import Modal from "./Modal";
import "./styles/SidePanel.css";

const SidePanel = ({ isOpen, onClose, openEditPresetModal }) => {
   const [volume, setVolume] = useState(50);
   const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

   const testVolume = () => {
      const audio = new Audio('/sounds/new-notification-7-210334.mp3');
      audio.volume = volume / 100;
      audio.play().catch(error => {
         console.error("Error playing audio:", error);
      });
   };

   const openAboutModal = () => {
      setIsAboutModalOpen(true);
   };

   const closeAboutModal = () => {
      setIsAboutModalOpen(false);
   };

   return (
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
         <button className="close-button" onClick={onClose}>&#10006;</button>
         <h2>Settings</h2>    
         <h3>Volume</h3>
         <div className="volume-container">
            <input 
               type="range" 
               id="volume-slider" 
               name="volume" 
               min="0" 
               max="100" 
               value={volume} 
               onChange={(e) => setVolume(e.target.value)} 
               className="volume-slider" 
            />
            <span className="volume-percentage">{volume}%</span>
         </div>
         <button className="test-volume-button" onClick={testVolume}>Test Volume</button>
         <h3>Display</h3>
         <input type="color" className="color-picker" />
         <h3>Mode</h3>
         <select className="mode-dropdown" defaultValue="light">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
         </select>
         <button className="about-button" onClick={openAboutModal}>
            <h3 className="no-spacing">About</h3>
         </button>
         <Modal isOpen={isAboutModalOpen} onClose={closeAboutModal}>
            <h2>About FocusFruit</h2>
            <p>This is a Pomodoro Timer application to help you manage your time effectively.</p>
         </Modal>
      </div>
   );
};

export default SidePanel;
