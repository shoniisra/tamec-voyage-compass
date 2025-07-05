
import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InlineHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

const InlineHeader: React.FC<InlineHeaderProps> = ({ 
  showBackButton = false, 
  onBack,
  title 
}) => {
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-background">
      {/* Left side - Navigation */}
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        {title && (
          <h1 className="text-lg md:text-xl font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      {/* Right side - User Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Usuario" />
              <AvatarFallback className="bg-tamec-100 dark:bg-tamec-900">
                <User className="h-4 w-4 text-tamec-600" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                usuario@ejemplo.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer">
            {language === 'en' ? 'View Profile' : 'Ver Perfil'}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            {language === 'en' ? 'My Bookings' : 'Mis Reservas'}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            {language === 'en' ? 'Support' : 'Soporte'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InlineHeader;
