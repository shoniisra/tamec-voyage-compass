
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
          <div className="lg:w-max-md">
            <AdminSidebar />
          </div>
          <div className="flex-1 w-full p-6">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default AdminLayout;
