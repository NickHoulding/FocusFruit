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
        {isHidden ? '←' : '→'}
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