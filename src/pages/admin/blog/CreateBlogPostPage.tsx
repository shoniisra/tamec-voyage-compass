
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BlogEditor from '@/components/admin/blog/editor/BlogEditor';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateBlogPostPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Create Blog Post</h1>
            </div>
            <BlogEditor 
              onChange={handleContentChange} 
              data=""
            />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default CreateBlogPostPage;
