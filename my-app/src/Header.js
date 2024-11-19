import React, { useState } from "react";
import SidePanel from "./SidePanel";
import SidePanelBadges from "./SidePanelBadges";
import "./Header.css";

const Header = ({ openEditPresetModal }) => {
   const [isPanelOpen, setIsPanelOpen] = useState(false);
   const [isBadgesPanelOpen, setIsBadgesPanelOpen] = useState(false);
   const toggleSettingsPanel = () => {
      setIsPanelOpen(!isPanelOpen);
   };
   const toggleBadgesPanel = () => {
      setIsBadgesPanelOpen(!isBadgesPanelOpen);
   };

   return (
      <div className="headerContainer">
         <header className="header">
            <button className="hamburger-button" onClick={toggleSettingsPanel}>
               <div className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </button>
         {/* <div className="site-name">FocusFruit</div> */}
         <div className="presets-dropdown">
         <select>
            <option value="title">Select Preset</option>
            <option value="default">Default</option>
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
