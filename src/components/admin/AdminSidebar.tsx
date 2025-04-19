
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  FileText,
  Tag,
  Map,
  Settings,
  Plane,
  Globe,
  CheckSquare,
  Gift,
  BookText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [expanded, setExpanded] = useState<string[]>([]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Determine which accordions should be open based on current path
  React.useEffect(() => {
    const newExpanded = [];
    
    if (location.pathname.includes('/admin/blog')) {
      newExpanded.push('blog');
    }
    
    if (location.pathname.includes('/admin/tours')) {
      newExpanded.push('tours');
    }
    
    if (location.pathname.includes('/admin/settings')) {
      newExpanded.push('settings');
    }
    
    setExpanded(newExpanded);
  }, [location.pathname]);

  return (
    <div className="w-full h-full bg-card border rounded-lg p-4 flex flex-col lg:w-max-md">
      <h2 className="text-xl font-bold mb-4">
        {language === 'en' ? 'Admin Panel' : 'Panel de Administración'}
      </h2>
      
      <div className="space-y-2 flex-1">
        <Button 
          variant={isActive('/admin/dashboard') ? "default" : "ghost"} 
          className="w-full justify-start" 
          asChild
        >
          <Link to="/admin/dashboard">
            <Home className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Dashboard' : 'Tablero'}
          </Link>
        </Button>
        
        <Accordion 
          type="multiple" 
          value={expanded} 
          onValueChange={setExpanded} 
          className="w-full"
        >
          <AccordionItem value="blog" className="border-0">
            <AccordionTrigger className="py-2 px-3 hover:bg-muted hover:no-underline rounded-md">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Blog' : 'Blog'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-0 px-1">
              <div className="flex flex-col space-y-1 ml-6">
                <Button 
                  variant={isActive('/admin/blog/posts') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/blog/posts">
                    {language === 'en' ? 'All Posts' : 'Todos los Posts'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/blog/posts/create') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/blog/posts/create">
                    {language === 'en' ? 'Create Post' : 'Crear Post'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/blog/tags') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/blog/tags">
                    <Tag className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Tags' : 'Etiquetas'}
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="tours" className="border-0">
            <AccordionTrigger className="py-2 px-3 hover:bg-muted hover:no-underline rounded-md">
              <div className="flex items-center">
                <Map className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Tours' : 'Tours'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-0 px-1">
              <div className="flex flex-col space-y-1 ml-6">
                <Button 
                  variant={isActive('/admin/tours') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/tours">
                    {language === 'en' ? 'All Tours' : 'Todos los Tours'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/tours/create') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/tours/create">
                    {language === 'en' ? 'Create Tour' : 'Crear Tour'}
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="settings" className="border-0">
            <AccordionTrigger className="py-2 px-3 hover:bg-muted hover:no-underline rounded-md">
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-0 px-1">
              <div className="flex flex-col space-y-1 ml-6">
                <Button 
                  variant={isActive('/admin/settings/aerolineas') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/settings/aerolineas">
                    <Plane className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Airlines' : 'Aerolíneas'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/settings/destinos') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/settings/destinos">
                    <Globe className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Destinations' : 'Destinos'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/settings/items') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/settings/items">
                    <CheckSquare className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Included Items' : 'Items Incluidos'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/settings/regalos') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/settings/regalos">
                    <Gift className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Gifts' : 'Regalos'}
                  </Link>
                </Button>
                <Button 
                  variant={isActive('/admin/settings/terminos') ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start" 
                  asChild
                >
                  <Link to="/admin/settings/terminos">
                    <BookText className="h-3 w-3 mr-2" />
                    {language === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones'}
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminSidebar;
