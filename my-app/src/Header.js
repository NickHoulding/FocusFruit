import React, { useState } from "react";
import SidePanel from "./SidePanel";
import "./Header.css";

const Header = () => {
   const [isPanelOpen, setIsPanelOpen] = useState(false);
   const togglePanel = () => {
      setIsPanelOpen(!isPanelOpen);
   };

   return (
      <>
         <header className="header">
            <button className="hamburger-button" onClick={togglePanel}>
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
         <div className="streaks">Streaks</div>
         </header>
         <SidePanel isOpen={isPanelOpen} onClose={togglePanel} />
      </>
   );
};

export default Header;
