import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center p-4 mt-auto">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} MyReactApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;