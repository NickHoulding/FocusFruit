import React from "react";
import "./SidePanel.css";

const SidePanel = ({ isOpen, onClose, openEditPresetModal }) => {
   return (
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
         <button className="close-button" onClick={onClose}>X</button>
         <h2>Settings</h2>    
         <button onClick={() => openEditPresetModal()}>Edit Preset</button>
      </div>
   );
};

export default SidePanel;
