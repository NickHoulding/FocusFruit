import React, { useState } from "react";
import SidePanel from "./SidePanel";
import SidePanelBadges from "./SidePanelBadges";
import "./Header.css";

const Header = ({ 
   openEditPresetModal,
   presets,
   selectedPreset,
   setSelectedPreset
}) => {
   const [isPanelOpen, setIsPanelOpen] = useState(false);
   const [isBadgesPanelOpen, setIsBadgesPanelOpen] = useState(false);
   const toggleSettingsPanel = () => {
      setIsPanelOpen(!isPanelOpen);
   };
   const toggleBadgesPanel = () => {
      setIsBadgesPanelOpen(!isBadgesPanelOpen);
   };

   const handlePresetChange = (e) => {
      const value = e.target.value;
      if (value === "add-new") {
         openEditPresetModal({ name: "", workTime: 25, breakTime: 5 });
      } else {
         const preset = presets.find((p) => p.name === value);
         if (preset) setSelectedPreset(preset);
      }
   };

   return (
      <div className="headerContainer">
         <header className="header">
            <button className="settings-button" onClick={toggleSettingsPanel}>
               <img src="/icons/settings-gear.svg" alt="Settings" className="settings-icon" />
            </button>
         {/* <div className="site-name">FocusFruit</div> */}
         <div className="presets-dropdown">
            <select value={selectedPreset.name} onChange={handlePresetChange}>
               <option value="title">Select Preset</option>
               {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                     {preset.name}
                  </option>
               ))}
               <option value="add-new">Add New Preset</option>
            </select>
         </div>
         <div className="badges">
            <button className="badge-button" onClick={toggleBadgesPanel}>
               Achievements
            </button>
         </div>
         </header>
         <SidePanel isOpen={isPanelOpen} onClose={toggleSettingsPanel} openEditPresetModal={openEditPresetModal} />
         <SidePanelBadges isOpen={isBadgesPanelOpen} onClose={toggleBadgesPanel} />
      </div>
   );
};

export default Header;
