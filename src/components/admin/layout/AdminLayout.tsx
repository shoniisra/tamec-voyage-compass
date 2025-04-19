
import React from 'react';
import Layout from '@/components/layout/Layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Layout fullWidth className="bg-gray-50 dark:bg-gray-900 min-h-screen p-0">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="w-64 max-w-xs flex-shrink-0">
            <AdminSidebar />
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default AdminLayout;
