import React from 'react';
import Navbar from '../components/Navbar';

export const Layout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex h-screen border-collapse overflow-hidden">
        {/* <Sidebar /> */}
        <main className="">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

// main : flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1 chess-board