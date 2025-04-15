
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { useBlogPostManagement } from '@/hooks/use-blog-post-management';
import BlogPostsTable from '@/components/admin/blog/BlogPostsTable';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const BlogPostsPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { posts, loading, fetchPosts } = useBlogPosts();
  const { deleteBlogPost } = useBlogPostManagement();

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id, () => {
      fetchPosts(); // Refresh the posts list after successful deletion
    });
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Blog Posts Management</h1>
              <p className="text-muted-foreground">
                Create, edit, and manage your blog posts
              </p>
            </div>
            
            <BlogPostsTable 
              posts={posts} 
              isLoading={loading} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default BlogPostsPage;
