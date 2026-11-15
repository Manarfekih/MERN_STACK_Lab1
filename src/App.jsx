import React, { useState } from 'react';
import Header from './components/Header';
import Counter from './components/Counter';
import AutoTimer from './components/AutoTimer';
import './index.css';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <Header
        title="My React Counter App"
        subtitle="Mastering Fundamental Hooks: useState & useEffect"
      />

      <Counter />

      <button
        className="btn btn-reset"
        onClick={() => setShowTimer(!showTimer)}
      >
        {showTimer ? 'Hide Stopwatch' : 'Show Stopwatch'}
      </button>

      {showTimer && <AutoTimer />}
    </div>
  );
}