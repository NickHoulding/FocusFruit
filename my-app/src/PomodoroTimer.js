import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
   const [workTime, setWorkTime] = useState(25); // Default work time in minutes
   const [breakTime, setBreakTime] = useState(5); // Default break time in minutes
   const [time, setTime] = useState(workTime * 60); // Timer in seconds
   const [isWorkSession, setIsWorkSession] = useState(true); // Track if it's a work session
   const [isActive, setIsActive] = useState(false);
   const [message, setMessage] = useState("");

   useEffect(() => {
      if (isWorkSession) {
         setTime(workTime * 60);
      } else {
         setTime(breakTime * 60);
      }
   }, [workTime, breakTime, isWorkSession]);

   // countdown logic
   useEffect(() => {
      let interval;
      if (isActive && time > 0) {
         interval = setInterval(() => {
         setTime((prevTime) => prevTime - 1);
         }, 1000);
      } else if (time === 0 && isActive) {
         if (isWorkSession){
            setMessage("Great job! You've earned a break.");
            setIsWorkSession(false);
         } else {
            setMessage("Break is done. Resume work when ready.");
            setIsWorkSession(true);
         }

         setIsActive(false); //pause timer
      }
      return () => clearInterval(interval);
   }, [time, isActive, isWorkSession]);

   const toggleTimer = () => {
      setMessage("");
      setIsActive(!isActive);
   }

   const resetTimer = () => {
      setIsActive(false);
      setMessage("");
      setTime(isWorkSession ? workTime * 60 : breakTime * 60);
   };

   return (
      <div>
         <h2>Focus Fruit</h2>
         {message && <p className="message">{message}</p>}
         <div>
            <h3>{isWorkSession ? "Work" : "Break"}</h3>
            <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
            <button onClick={resetTimer}>Reset</button>
            <div>{`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}</div>
         </div>
         <br></br>
         <div>
            <label>
               Work Time (minutes):
               <input
                  type="number"
                  value={workTime}
                  onChange={(e) => setWorkTime(Number(e.target.value))}
                  min="1"
               />
            </label>
            <br></br>
            <label>
               Break Time (minutes):
               <input
                  type="number"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  min="1"
               />
            </label>
         </div>
      </div>
   );
};

export default PomodoroTimer;