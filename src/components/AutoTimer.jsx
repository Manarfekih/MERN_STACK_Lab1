import React, { useState, useEffect } from 'react';

export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      // 1. Start timer
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    // 2. MANDATORY CLEANUP FUNCTION : called when isRunning changes or on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]); // Only re-runs when isRunning toggles

  return (
    <div className="timer-box">
      <span>
        Auto Stopwatch: <strong>{seconds}s</strong>
      </span>
      <button
        className="btn"
        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}