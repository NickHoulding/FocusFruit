import React, { useState } from "react";
import SidePanel from "./SidePanel";
import SidePanelBadges from "./SidePanelBadges";
import "./Header.css";

const Header = () => {
   const [isPanelOpen, setIsPanelOpen] = useState(false);
   const [isBadgesPanelOpen, setIsBadgesPanelOpen] = useState(false);
   const toggleSettingsPanel = () => {
      setIsPanelOpen(!isPanelOpen);
   };
   const toggleBadgesPanel = () => {
      setIsBadgesPanelOpen(!isBadgesPanelOpen);
   };

   return (
      <>
         <header className="header">
            <button className="hamburger-button" onClick={toggleSettingsPanel}>
            ☰
         </button>
         {/* <div className="site-name">FocusFruit</div> */}
         <div className="presets-dropdown">
         <select>
            <option value="title">Select Preset</option>
            <option value="default">Default</option>
         </select>
         </div>
         {/* get rid of this?? */}
         <div className="badges">Achivements
            <button className="badge-button" onClick={toggleBadgesPanel}>
            </button>
         </div>
         </header>
         <SidePanel isOpen={isPanelOpen} onClose={toggleSettingsPanel} />
         <SidePanelBadges isOpen={isBadgesPanelOpen} onClose={toggleBadgesPanel} />
      </>
   );
};

export default Header;
