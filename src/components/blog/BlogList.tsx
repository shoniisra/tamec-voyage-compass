import React from 'react';
import BlogCard from './BlogCard';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const BlogList = () => {
  const { posts, loading } = useBlogPosts();
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Display loading skeletons when data is being fetched
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <Button 
              onClick={() => navigate('/admin/blog/create')}
              className="bg-tamec-600 hover:bg-tamec-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            return (
              <BlogCard
                key={post.id}
                id={post.id}
                title={language === 'en' ? post.title_en : post.title_es}
                excerpt={language === 'en' ? post.excerpt_en : post.excerpt_es}
                coverImage={post.cover_image}
                date={new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                category={language === 'en' ? post.category_en : post.category_es}
                slug={post.slug}
              />
            );
          })}
        </div>
        
        {/* Simple pagination for future expansion */}
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default BlogList;
