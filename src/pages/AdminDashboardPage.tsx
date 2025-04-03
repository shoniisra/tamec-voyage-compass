
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid gap-6">
          <div className="border rounded-md p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
            <p className="mb-4">Manage your blog posts from here.</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/admin/blog/posts')}
              >
                Manage Posts
              </Button>
              <Button 
                onClick={() => navigate('/admin/blog/create')}
              >
                Create New Post
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="mb-4">View and manage users from here.</p>
            <Button disabled>Manage Users (Coming Soon)</Button>
          </div>
          
          <div className="border rounded-md p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="mb-4">Configure website settings from here.</p>
            <Button disabled>Site Settings (Coming Soon)</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
