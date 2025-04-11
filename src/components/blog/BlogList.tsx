
import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/buttons/button';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import TagsFilter from './TagsFilter';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const BlogList = () => {
  const { posts, loading } = useBlogPosts();
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter posts based on search query and tags
  const filteredPosts = posts.filter(post => {
    // First, check if there are any selected tags
    if (selectedTags.length > 0) {
      // Check if this post has any of the selected tags
      // We'll need to fetch tags for each post - in a real app,
      // you might want to optimize this by fetching tags with posts
      const postHasSelectedTag = post.tags?.some(tag => 
        selectedTags.includes(tag.id)
      );
      
      if (!postHasSelectedTag) return false;
    }
    
    // Then check search query
    const title = typeof post.title === 'string' ? post.title.toLowerCase() : 
      (language === 'en' && post.title_en ? post.title_en.toLowerCase() : 'untitled').toLowerCase();
      
    const excerpt = language === 'en' 
      ? (post.excerpt_en || '').toLowerCase()
      : (post.excerpt_es || '').toLowerCase();
      
    const category = language === 'en' 
      ? (post.category_en || '').toLowerCase() 
      : (post.category_es || '').toLowerCase();
      
    const query = searchQuery.toLowerCase();
    
    return title.includes(query) || excerpt.includes(query) || category.includes(query);
  });
  
  // Display loading skeletons when data is being fetched
  if (loading) {
    return (
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <Skeleton className="h-12 w-60 mb-4" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
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
      </section>
    );
  }
  
  return (
    <section className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Latest Travel Stories' : 'Últimas Historias de Viaje'}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{language === 'en' ? 'Discover travel tips, destination guides, and personal stories from our global adventures' : 'Descubre consejos de viaje, guías de destinos e historias personales de nuestras aventuras globales'}</p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={language === 'en' ? 'Search articles...' : 'Buscar artículos...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {language === 'en' ? 'Filter' : 'Filtrar'}
                  {selectedTags.length > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      {selectedTags.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{language === 'en' ? 'Filter Blog Posts' : 'Filtrar Artículos'}</SheetTitle>
                  <SheetDescription>
                    {language === 'en' 
                      ? 'Select tags to filter the blog posts'
                      : 'Selecciona etiquetas para filtrar los artículos'}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <TagsFilter 
                    selectedTags={selectedTags} 
                    onTagsChange={setSelectedTags} 
                  />
                </div>
                {selectedTags.length > 0 && (
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTags([])}
                      className="w-full"
                    >
                      {language === 'en' ? 'Clear Filters' : 'Borrar Filtros'}
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            
            {isAdmin && (
              <Button 
                onClick={() => navigate('/admin/blog/posts/create')}
                className="bg-tamec-600 hover:bg-tamec-700 whitespace-nowrap"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {language === 'en' ? 'New Article' : 'Nuevo Artículo'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            // Ensure title is a string, not an object
            const title = typeof post.title === 'string' ? post.title :
                        language === 'en' && post.title_en ? post.title_en : 
                        'Untitled Post';
            
            const excerpt = language === 'en' 
              ? post.excerpt_en || '' 
              : post.excerpt_es || '';
              
            const category = language === 'en' 
              ? post.category_en || '' 
              : post.category_es || '';
            
            // Use slug if available, otherwise fall back to ID
            const postSlug = post.slug || post.id;
              
            return (
              <BlogCard
                key={post.id}
                id={post.id}
                title={title}
                excerpt={excerpt}
                coverImage={post.cover_image}
                date={new Date(post.date || post.created_at || '').toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                category={category}
                slug={postSlug}
                tags={post.tags}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {language === 'en' ? 'No articles found matching your search.' : 'No se encontraron artículos que coincidan con tu búsqueda.'}
          </p>
          {selectedTags.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setSelectedTags([])}
              className="mt-4"
            >
              {language === 'en' ? 'Clear Tag Filters' : 'Borrar Filtros de Etiquetas'}
            </Button>
          )}
        </div>
      )}
      
      {/* Simple pagination for future expansion */}
      {filteredPosts.length > 0 && (
        <Pagination className="mt-16">
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
      )}
    </section>
  );
};

export default BlogList;
