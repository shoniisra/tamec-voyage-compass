
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronRight, PieChart, FileText, Users, MessageSquare, Settings, Tags } from 'lucide-react';

const AdminSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const isLinkActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navLinkClasses = (path: string) => {
    const baseClasses = "flex items-center gap-3 py-3 px-4 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-tamec-100 text-tamec-900 dark:bg-tamec-900/20 dark:text-tamec-200";
    const inactiveClasses = "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800";
    
    return `${baseClasses} ${isLinkActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Admin</h2>
        <SidebarTrigger className="ml-auto h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="flex flex-col gap-1">
          <NavLink to="/admin/dashboard" className={navLinkClasses('/admin/dashboard')}>
            <PieChart className="h-5 w-5" />
            Dashboard
          </NavLink>
          <div className="mt-3 mb-1 px-4">
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
              Blog
            </h3>
          </div>
          <NavLink to="/admin/blog/posts" className={navLinkClasses('/admin/blog/posts')}>
            <FileText className="h-5 w-5" />
            Posts
          </NavLink>
          <NavLink to="/admin/blog/tags" className={navLinkClasses('/admin/blog/tags')}>
            <Tags className="h-5 w-5" />
            Tags
          </NavLink>
          <div className="mt-3 mb-1 px-4">
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
              Users
            </h3>
          </div>
          <NavLink to="/admin/users" className={navLinkClasses('/admin/users')}>
            <Users className="h-5 w-5" />
            User Management
          </NavLink>
          <div className="mt-3 mb-1 px-4">
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
              Communications
            </h3>
          </div>
          <NavLink to="/admin/communications/messages" className={navLinkClasses('/admin/communications/messages')}>
            <MessageSquare className="h-5 w-5" />
            Messages
          </NavLink>
          <div className="mt-3 mb-1 px-4">
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
              Configuration
            </h3>
          </div>
          <NavLink to="/admin/settings" className={navLinkClasses('/admin/settings')}>
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
