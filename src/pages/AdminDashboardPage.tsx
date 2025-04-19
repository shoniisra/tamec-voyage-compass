
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
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
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
