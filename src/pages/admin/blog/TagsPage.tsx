
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TagsTable from '@/components/admin/blog/TagsTable';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/layout/AdminLayout';

const TagsPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tags Management</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage blog tags and categories
        </p>
      </div>
      
      <TagsTable />
    </AdminLayout>
  );
};

export default TagsPage;
