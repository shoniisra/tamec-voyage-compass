
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPostManagement } from '@/hooks/use-blog-post-management';
import { useBlogPostById } from '@/hooks/use-blog-post-by-id';
import BlogPostForm from '@/components/admin/blog/BlogPostForm';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const EditBlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { post, loading: loadingPost } = useBlogPostById(id);
  const { isLoading: savingPost, updateBlogPost } = useBlogPostManagement();

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <p>You don't have permission to access this page.</p>
        </div>
      </Layout>
    );
  }

  const handleUpdatePost = async (data: any) => {
    if (id) {
      await updateBlogPost(id, data);
    }
  };

  return (
    <Layout fullWidth className="bg-gray-50 dark:bg-gray-900 min-h-screen p-0">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex-1 p-8">
            {loadingPost ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading post...</p>
              </div>
            ) : (
              <BlogPostForm 
                post={post} 
                isLoading={savingPost} 
                onSave={handleUpdatePost} 
              />
            )}
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default EditBlogPostPage;
