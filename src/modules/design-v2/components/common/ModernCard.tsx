
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  className, 
  hover = true,
  gradient = false 
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200',
        hover && 'hover:shadow-md hover:scale-[1.02]',
        gradient && 'bg-gradient-to-br from-card to-muted/20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ModernCard;
