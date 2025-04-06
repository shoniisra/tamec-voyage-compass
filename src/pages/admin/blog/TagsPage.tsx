
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TagsTable from '@/components/admin/blog/TagsTable';
import { useLanguage } from '@/contexts/LanguageContext';

const TagsPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <p>You don't have permission to access this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullWidth className="bg-gray-50 dark:bg-gray-900 min-h-screen p-0">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Tags Management</h1>
              <p className="text-muted-foreground">
                Create, edit, and manage blog tags and categories
              </p>
            </div>
            
            <TagsTable />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default TagsPage;
