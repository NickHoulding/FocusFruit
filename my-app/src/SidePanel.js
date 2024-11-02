import React from "react";
import "./SidePanel.css";

const SidePanel = ({ isOpen, onClose }) => {
   return (
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
         <button className="close-button" onClick={onClose}>X</button>
         <h2>Settings</h2>    
      </div>
   );
};

export default SidePanel;
