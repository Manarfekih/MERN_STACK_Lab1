import React, { useState, useEffect } from 'react';
const max=50;
const min=-50;

export default function Counter() {
  // 1. Initialize count from localStorage (or fallback to 0)
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_valeur');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('No clicks yet');
  const [totalClics, setTotalClics] = useState(0);

  // Restore historique from localStorage on page load (or fallback to [])
  const [historique, setHistorique] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_historique');
    return saved !== null ? JSON.parse(saved) : [];
  });

  // Increment handler
  const handleIncrement = () => {
    const nouveauCompte = count + step;

   if (nouveauCompte > max) {
    alert("Maximum threshold of 50 reached!");
    setMessage("Maximum threshold of 50 reached!");
    return;
  }
    setCount(nouveauCompte);
    setMessage('Added ' + step);
    setTotalClics(totalClics + 1);

    const action = '+' + step;
    setHistorique([...historique, action]);
  };

  // Decrement handler
  const handleDecrement = () => {
    const nouveauCompte = count - step;

    if (nouveauCompte < min) {
    alert("Minimum threshold of -50 reached!");
    setMessage("Minimum threshold of -50 reached!");
    return;
  }
    
    setCount(nouveauCompte);
    setMessage('Subtracted ' + step);
    setTotalClics(totalClics + 1);

    const action = '-' + step;
    setHistorique([...historique, action]);
  };

  // Reset handler
  const handleReset = () => {
    setCount(0);
    setMessage('Reset to zero');
    setTotalClics(totalClics + 1);
    setHistorique([]);
  };

  // Dynamic styling based on counter sign
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  // 2. EFFECT A: Synchronize browser tab title
  useEffect(() => {
    document.title = 'Counter : ' + count;
  }, [count]);

  // 3. EFFECT B: Automatically persist count to localStorage
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  // 4. EFFECT C: Automatically persist historique array as JSON
  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  //5.Effect :challenge keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        handleIncrement();  }
      if (event.key === 'ArrowDown') {
        handleDecrement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleIncrement, handleDecrement]);

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      <div className="btn-group">
        <button className="btn btn-dec" onClick={handleDecrement}>
          -{step}
        </button>

        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>

        <button className="btn btn-inc" onClick={handleIncrement}>
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label>Increment Step: </label>
        <select
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p>
          <strong>Last Action: </strong> {message}
        </p>

        <p>
          <strong>Total Clicks: </strong> {totalClics}
        </p>

        {historique.length > 0 && (
          <p>
            <strong>History: </strong> {historique.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}