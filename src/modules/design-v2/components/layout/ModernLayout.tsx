
import React from 'react';
import ModernHeader from './ModernHeader';
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
    <div className="min-h-screen bg-background text-foreground">
      <ModernHeader />
      <div className="flex">
        {showSidebar && <ModernSidebar />}
        <main className={`flex-1 ${showSidebar ? 'md:pl-64' : ''} pb-16 md:pb-0`}>
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default ModernLayout;
