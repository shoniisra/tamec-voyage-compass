
import React from 'react';
import ModernSidebar from './ModernSidebar';
import MobileBottomNav from './MobileBottomNav';
import { ThemeProvider } from '@/providers/ThemeProvider';

interface ModernLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full">
        {showSidebar && <ModernSidebar />}
        <main className={`flex-1 min-w-0 ${showSidebar ? 'md:pl-64' : ''} pb-16 md:pb-0 overflow-x-hidden`}>
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default ModernLayout;
