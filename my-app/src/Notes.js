import React, { useState } from "react";

const NotesSection = () => {
  const [notes, setNotes] = useState("");
  
  return (
    <div>
      <h2>Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        rows={10}
        cols={30}
      />
    </div>
  );
};

export default NotesSection;
