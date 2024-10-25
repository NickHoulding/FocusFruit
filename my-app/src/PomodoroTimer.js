import React, { useState, useEffect } from "react";


//all this does is set a timer for 25 minutes. need to add the customizability and breaks
const PomodoroTimer = () => {
   const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      let interval;
      if (isActive && time > 0) {
         interval = setInterval(() => {
         setTime((time) => time - 1);
         }, 1000);
      } else if (!isActive && time !== 0) {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [isActive, time]);

   const toggleTimer = () => setIsActive(!isActive);

   return (
      <div>
         <h1>FocusFruit</h1>
         <div>{`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}</div>
         <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
      </div>
   );
};

export default PomodoroTimer;
