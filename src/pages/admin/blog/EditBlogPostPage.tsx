
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BlogEditor from '@/components/editor/BlogEditor';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { Skeleton } from '@/components/ui/skeleton';
import { toKebabCase } from '@/utils/stringUtils';

const EditBlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        // If slug is not present, generate one from the title
        if (!data.slug && data.title) {
          data.slug = `${data.id}-${toKebabCase(data.title)}`;
        }
        
        setBlog(data);
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-80 w-full" />
              </div>
            ) : error ? (
              <div className="text-red-500">
                Error: {error}
              </div>
            ) : blog ? (
              <BlogEditor 
                initialTitle={blog.title} 
                initialContent={blog.content} 
                initialCoverImage={blog.cover_image}
                initialSlug={blog.slug || ''}
                blogId={blog.id} 
                isEdit={true} 
              />
            ) : (
              <div>Blog post not found</div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default EditBlogPostPage;
