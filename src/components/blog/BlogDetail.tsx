
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useComments } from '@/hooks/use-comments';
import { useBlogPost } from '@/hooks/use-blog-post';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EditorJsRenderer from '@/components/admin/blog/editor/BlogRenderer';
import BlogComments from './BlogComments';
import { Tags } from '@/types/blog';

interface BlogDetailProps {
  slug: string;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ slug }) => {
  const { language } = useLanguage();
  const { blog, loading, error } = useBlogPost(slug);
  const { comments, fetchComments, submitComment, submitting, commentError } = useComments(slug);
  
  useEffect(() => {
    if (blog) {
      fetchComments();
    }
  }, [blog, fetchComments]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded mb-4 w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-6 w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
          <h2 className="text-red-800 dark:text-red-400 text-lg font-semibold">Error</h2>
          <p className="text-red-600 dark:text-red-300">{error || 'Blog post not found'}</p>
        </div>
      </div>
    );
  }

  const content = language === 'en' && blog.data.content_en ? blog.data.content_en : blog.data.content;
  const title = language === 'en' && blog.data.title_en ? blog.data.title_en : blog.data.title;
  
  const formattedDate = blog.data.created_at 
    ? format(
        new Date(blog.data.created_at), 
        'MMMM d, yyyy', 
        { locale: language === 'es' ? es : undefined }
      )
    : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <time dateTime={blog.data.created_at || ''}>{formattedDate}</time>
            {blog.tags && blog.tags.length > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex gap-2">
                  {blog.tags.map((tag: Tags) => (
                    <span 
                      key={tag.id} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                      style={{ backgroundColor: `${tag.color}30`, color: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {blog.data.cover_image && (
          <div className="mb-8">
            <img 
              src={blog.data.cover_image} 
              alt={title} 
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <EditorJsRenderer data={content} />
        </div>

        <div className="mt-12">
          <BlogComments 
            blogId={blog.data.id} 
            comments={comments} 
            submitComment={submitComment}
            submitting={submitting}
            error={commentError}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
