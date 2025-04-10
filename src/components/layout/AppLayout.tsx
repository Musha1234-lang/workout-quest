
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import FitnessAIButton from './FitnessAIButton';

const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto pb-20 lg:pb-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
      <FitnessAIButton />
    </div>
  );
};

export default AppLayout;
