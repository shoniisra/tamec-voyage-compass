
import React from 'react';
import ModernHeader from './ModernHeader';
import ModernSidebar from './ModernSidebar';
import { ThemeProvider } from '@/providers/ThemeProvider';

interface ModernLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  showSidebar = false 
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModernHeader />
      <div className="flex">
        {showSidebar && <ModernSidebar />}
        <main className={`flex-1 ${showSidebar ? 'lg:pl-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ModernLayout;
