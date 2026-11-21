import React, { createContext, useState, useContext, useEffect } from 'react';

// Étape 1 : créer le contexte, une seule fois, en dehors de tout composant
export const ThemeContext = createContext(null);

// Étape 2 : le fournisseur garde l'état et le partage avec tous ses enfants
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // 2. Shared updater function
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personnalisé (doit être déclaré à l'extérieur de ThemeProvider)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }
  return context; // Directly returns { theme, toggleTheme }
}