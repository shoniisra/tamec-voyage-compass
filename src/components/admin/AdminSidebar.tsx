
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  Map, 
  CreditCard, 
  Tag, 
  Users, 
  LogOut,
  MoonStar,
  Sun
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const AdminSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      title: 'Dashboard de Métricas', 
      path: '/admin' 
    },
    { 
      icon: Users, 
      title: 'Clientes', 
      path: '/admin/customers' 
    },
    { 
      icon: FileText, 
      title: 'Blogs', 
      path: '/admin/blog/posts' 
    },
    { 
      icon: Map, 
      title: 'Tours',
      path: '/admin/tours' 
    },
    { 
      icon: CreditCard, 
      title: 'Precios de Visa', 
      path: '/admin/visas' 
    },
    { 
      icon: Tag, 
      title: 'Etiquetas', 
      path: '/admin/tags' 
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="py-6 px-2">
        <div className="flex items-center gap-2 px-2">
          <div className="size-8 rounded-full bg-tamec-600 flex items-center justify-center text-white font-semibold">
            T
          </div>
          <span className="text-xl font-bold text-foreground">TAMEC Admin</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <div className="p-4">
          <Button 
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="mb-4 w-full flex justify-center"
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </Button>
          <Button 
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            {t('nav.logout')}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
