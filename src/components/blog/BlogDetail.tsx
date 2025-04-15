
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import BlogRenderer from '@/components/admin/blog/editor/BlogRenderer';
import RecentPosts from './RecentPosts';
import BlogComments from './BlogComments';
import { useBlogPost } from '@/hooks/use-blog-post';
import TagsFilter from './TagsFilter';
import ContactInfo from '@/components/contact/ContactInfo';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tag } from '@/types/blog';

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
  
  const formattedDate =  new Date(post.date).toLocaleDateString() || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area - takes up 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
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
          <div className="mt-12">
            <BlogComments postId={post.id} />
          </div>
        </div>
        
        {/* Sidebar - takes up 1/3 of the space on large screens */}
        <div className="space-y-8">
          {/* Recent Posts Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Recent Posts' : 'Publicaciones Recientes'}
              </h3>
              <Separator className="mb-4" />
              <RecentPosts currentPostId={post.id} limit={4} />
            </CardContent>
          </Card>
          
          {/* Tags Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Tags' : 'Etiquetas'}
              </h3>
              <Separator className="mb-4" />
              <TagsFilter 
                selectedTags={[]} 
                onTagsChange={() => {}} 
              />
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Contact Us' : 'Contáctanos'}
              </h3>
              <Separator className="mb-4" />
              <div className="scale-90 origin-top-left">
                <ContactInfo />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
