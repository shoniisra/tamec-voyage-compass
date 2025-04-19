
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // This should never happen due to our ProtectedRoute, but just in case
  if (!user || !isAdmin) {
    return <div className="container mx-auto py-10">
      <p>You don't have permission to access this page.</p>
      <Button onClick={() => navigate('/')}>Go back to home</Button>
    </div>;
  }

  return (
    <Layout fullWidth  className="bg-gray-50 dark:bg-gray-900 min-h-screen p-0">
      <SidebarProvider>
        <div className="flex min-h-screen w-full ">
          <div className="lg:w-max-md">
          <AdminSidebar/>

          </div>
          <div className="flex-1 w-full">
            <AdminDashboardContent />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default AdminDashboardPage;
