
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPostManagement } from '@/hooks/use-blog-post-management';
import BlogPostForm from '@/components/admin/blog/BlogPostForm';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const CreateBlogPostPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { isLoading, createBlogPost } = useBlogPostManagement();

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
            <BlogPostForm 
              isLoading={isLoading} 
              onSave={createBlogPost} 
            />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default CreateBlogPostPage;
