
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import BlogRenderer from '@/components/editor/BlogRenderer';
import RecentPosts from './RecentPosts';
import BlogComments from './BlogComments';
import { useBlogPost } from '@/hooks/use-blog-post';

interface BlogDetailProps {
  slug: string;
}

const BlogDetail = ({ slug }: BlogDetailProps) => {
  const { language } = useLanguage();
  const { post, loading } = useBlogPost(slug);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-96 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p>Blog post not found</p>
      </div>
    );
  }

  // Make sure we always have a string title
  const title = typeof post.title === 'string' ? post.title : 
                 (language === 'en' && post.title_en ? post.title_en : 
                 (typeof post.title === 'object' ? JSON.stringify(post.title) : 'Untitled Post'));
  
  const content = post.isLegacy 
    ? (language === 'en' ? post.content_en : post.content)
    : post.content || post.newContent;
    
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString() 
    : post.created_at 
      ? new Date(post.created_at).toLocaleDateString()
      : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500 mb-8">{formattedDate}</div>
      
      {post.cover_image && (
        <img 
          src={post.cover_image} 
          alt={title} 
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
        />
      )}

      {post.isLegacy ? (
        // Render legacy content as HTML
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: typeof content === 'string' ? content : JSON.stringify(content) }} />
      ) : (
        // Render new content with EditorJS renderer
        <BlogRenderer content={content} />
      )}

      {/* Comments Section */}
      <BlogComments postId={post.id} />

      {/* Recent Posts Section */}
      <div className="mt-12 border-t pt-8">
        <RecentPosts currentPostId={post.id} />
      </div>
    </div>
  );
};

export default BlogDetail;
