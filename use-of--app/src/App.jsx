// src/App.jsx
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import TaskManagerPage from './pages/TaskManagerPage';
import ApiDataPage from './pages/ApiDataPage';

// 1. Import the provider and hook
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useEffect } from 'react';

// 2. Create a new component to manage the dark class
function AppContent() {
  const { theme } = useTheme();

  // 3. Use useEffect to add/remove the 'dark' class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]); // Re-run when theme changes

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tasks" element={<TaskManagerPage />} />
        <Route path="/data" element={<ApiDataPage />} />
      </Routes>
    </Layout>
  );
}

// 4. Wrap your app in the ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;