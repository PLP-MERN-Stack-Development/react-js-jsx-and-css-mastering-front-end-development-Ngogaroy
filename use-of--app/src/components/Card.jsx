import React from 'react';

function Card({ children, className = '' }) {
  return (
    <div className={`
      bg-white shadow-md rounded-lg p-6 ${className} 
      dark:bg-gray-800 dark:text-white
      transition-transform duration-200 ease-in-out
      hover:scale-[1.02]
    `}>
      {children}
    </div>
  );
}

export default Card;