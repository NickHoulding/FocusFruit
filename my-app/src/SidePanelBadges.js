import React from "react";
import "./SidePanelBadges.css";

const SidePanelBadges = ({ isOpen, onClose }) => {
   return (
      <div className={`side-panel-badges ${isOpen ? "open" : ""}`}>
         <button className="close-button" onClick={onClose}>&#10006;</button>
         <h2>Achievements</h2>    
      </div>
   );
};

export default SidePanelBadges;