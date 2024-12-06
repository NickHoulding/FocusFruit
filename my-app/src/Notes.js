import React, { useState } from "react";
import './styles/Notes.css';

const NotesSection = () => {
  const [notes, setNotes] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const toggleNotes = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`notesContainer ${isHidden ? 'hidden' : ''}`}>
      <button className="toggleButton" onClick={toggleNotes}>
        {isHidden ? (
          <svg 
            className="notesIcon"
            version="1.1" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            >
            <g id="info"></g>
            <g id="icons">
              <g id="edit">
                <path d="M2,20c0,1.1,0.9,2,2,2h2.6L2,17.4V20z" />
                <path d="M21.6,5.6l-3.2-3.2c-0.8-0.8-2-0.8-2.8,0l-0.2,0.2C15,3,15,3.6,15.4,4L20,8.6c0.4,0.4,1,0.4,1.4,0l0.2-0.2 C22.4,7.6,22.4,6.4,21.6,5.6z" />
                <path d="M14,5.4c-0.4-0.4-1-0.4-1.4,0l-9.1,9.1C3,15,3,15.6,3.4,16L8,20.6c0.4,0.4,1,0.4,1.4,0l9.1-9.1c0.4-0.4,0.4-1,0-1.4 L14,5.4z" />
              </g>
            </g>
        </svg>
        ) : (
          <span className="closeIcon">&#10006;</span>
        )}
      </button>
      <h2 className={`notesHeader ${isHidden ? 'hidden' : ''}`}>Notes</h2>
      <textarea
        className={`noteBox ${isHidden ? 'hidden' : ''}`}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />
    </div>
  );
};

export default NotesSection;