
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout = ({ 
  children, 
  fullWidth = false, 
  className = "",
  hideHeader = false,
  hideFooter = false
}: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${className}`}>
      {!hideHeader && <Header />}
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4'}`}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
