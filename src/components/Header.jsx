import React from 'react';

// Standard functional component receiving two props: title and subtitle
export default function Header({ title, subtitle }) {
  // 1. Pure JavaScript logic: format current local date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // 2. What the component returns to the React engine:
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <small style={{ color: '#94a3b8', display: 'block', marginTop: '6px' }}>
        Session Date: {currentDate}
      </small>
    </header>
  );
}