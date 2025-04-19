
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import BlogEditor from '@/components/admin/blog/editor/BlogEditor';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/layout/AdminLayout';

const CreateBlogPostPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
      </div>
      <BlogEditor 
        initialContent=""
      />
    </AdminLayout>
  );
};

export default CreateBlogPostPage;
