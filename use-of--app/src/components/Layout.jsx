import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    // min-h-screen ensures the layout takes at least the full viewport height
    // flex-col directs children to stack vertically
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* 'flex-grow' makes the main content area expand to fill remaining space */}
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;