import { useState, useEffect } from 'react';

// This function helps get the stored value or use the initial value
function getStoredValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) {
    return savedValue;
  }
  // Support for functions as initial value (like useState)
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export function useLocalStorage(key, initialValue) {
  // 1. Use useState to hold the current value.
  // We use a function in useState to run getStoredValue only on the initial render.
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  // 2. Use useEffect to update local storage whenever the 'value' changes.
  // This is the "side effect".
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]); // Re-run effect if value or key changes

  // Return the value and the setter function, just like useState
  return [value, setValue];
}