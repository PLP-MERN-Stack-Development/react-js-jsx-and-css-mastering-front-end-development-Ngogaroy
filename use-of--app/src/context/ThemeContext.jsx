import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage'; // Import our new hook!

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export function ThemeProvider({ children }) {
  // Use our custom hook to save the theme preference!
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // The value to be passed to consuming components
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create a custom hook to easily use the context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}