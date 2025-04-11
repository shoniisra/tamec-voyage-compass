
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BlogEditor from '@/components/admin/blog/editor/BlogEditor';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { Skeleton } from '@/components/ui/skeleton';
import { toKebabCase } from '@/utils/stringUtils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/common/buttons/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

const EditBlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteBlog = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabaseExtended
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      navigate('/admin/blog/posts');
    } catch (err: any) {
      console.error('Error deleting blog post:', err);
      toast({
        variant: "destructive",
        title: "Error deleting blog post",
        description: err.message || "An unexpected error occurred",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
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
              <h1 className="text-3xl font-bold">Edit Blog Post</h1>
              
              <Button 
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Post
              </Button>
            </div>

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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              and remove all of its data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBlog}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default EditBlogPostPage;
