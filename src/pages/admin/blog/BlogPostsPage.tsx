
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { useBlogPostManagement } from '@/hooks/use-blog-post-management';
import BlogPostsTable from '@/components/admin/blog/BlogPostsTable';
import AdminLayout from '@/components/admin/layout/AdminLayout';

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
      <div className="container mx-auto py-10">
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default BlogPostsPage;
