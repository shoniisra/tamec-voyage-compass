import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import BlogRenderer from '@/modules/blog/components/editor/BlogRenderer';
import RecentPosts from '@/modules/blog/components/RecentPosts';
import BlogComments from '@/modules/blog/components/BlogComments';
import { useBlogPost } from '@/hooks/use-blog-post';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tag } from '@/types/blog';
import ContactInfo from '@/components/contact/ContactInfo';
import { Badge } from '@/components/ui/badge';
import { useBlogTags } from '@/hooks/use-blog-tags';

interface BlogDetailProps {
  slug: string;
}

const BlogDetail = ({ slug }: BlogDetailProps) => {
  const { language } = useLanguage();
  const { post, loading } = useBlogPost(slug);
  const { getBlogTags } = useBlogTags();
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (post?.id) {
      const fetchTags = async () => {
        const postTags = await getBlogTags(post.id);
        setTags(postTags);
      };
      fetchTags();
    }
  }, [post?.id, getBlogTags]);

  const handleTagClick = (tagId: string) => {
    navigate(`/blog?tag=${tagId}`);
  };
  
  if (loading) {
    return (
      <div className="container md:px-32 mx-auto px-4 py-8">
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
  ? (language === 'en' ? post.content_en : post.content_es)
  : post.content || post.newContent;
  
  const formattedDate = post.date ? new Date(post.date).toLocaleDateString() : (
    post.created_at ? new Date(post.created_at).toLocaleDateString() : ''
  );

  return (
    <div className="container md:px-32 mx-auto px-4 py-8">
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
        <div className="space-y-8 ">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              {language === 'en' ? 'Written By' : 'Escrito por'}
            </h3>
            <p className="">Lcda. Michelle Herrera - Tamec Viajes</p>
          </Card>

          {/* Contact Information */}
          <ContactInfo />

          {/* Tags Section */}
          {tags.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {language === 'en' ? 'Tags' : 'Etiquetas'}
                </h3>
                <Separator className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      className="cursor-pointer"
                      style={{ 
                        backgroundColor: tag.color,
                        color: getContrastColor(tag.color)
                      }}
                      onClick={() => handleTagClick(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Posts Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">
                {language === 'en' ? 'Recent Posts' : 'Publicaciones Recientes'}
              </h3>
              <Separator className="mb-4" />
              <RecentPosts currentPostId={post.id} limit={4} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine contrasting text color (black or white)
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white depending on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default BlogDetail;
