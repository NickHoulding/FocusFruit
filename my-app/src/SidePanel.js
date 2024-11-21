import React, { useState } from "react";
import Modal from "./Modal";
import "./SidePanel.css";

const SidePanel = ({ isOpen, onClose, openEditPresetModal, openAboutModal }) => {
   const [volume, setVolume] = useState(50);

   return (
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
         <button className="close-button" onClick={onClose}>X</button>
         <h2>Settings</h2>    
         <button onClick={() => openEditPresetModal()}>Edit Preset</button>
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
      </div>
   );
};

export default SidePanel;
