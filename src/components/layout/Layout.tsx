
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Layout = ({ children, fullWidth = false, className = "" }: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${className}`}>
      <Header />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4'}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
