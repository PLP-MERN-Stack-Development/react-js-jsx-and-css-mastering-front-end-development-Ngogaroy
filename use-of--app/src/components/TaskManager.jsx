import React, { useState } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import Card from './Card';

function TaskManager() {
  const { theme } = useTheme(); // Use the theme context
  const [tasks, setTasks] = useLocalStorage('tasks', []); // Use our local storage hook
  const [newTaskText, setNewTaskText] = useState(''); // State for the input field
  const [filter, setFilter] = useState('all'); // State for the filter

  // --- Handler Functions ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear input
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // --- Filtering Logic ---
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    // Card component now respects dark mode
    <Card className="max-w-2xl mx-auto dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
      
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" variant="primary">Add</Button>
      </form>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700"
          >
            <span
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default TaskManager;