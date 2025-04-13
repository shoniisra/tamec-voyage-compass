
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { useTags } from '@/hooks/use-tags';
import BlogCard from './BlogCard';
import TagsFilter from './TagsFilter';
import { useLanguage } from '@/contexts/LanguageContext';
import { BiSearch } from 'react-icons/bi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';

const PAGE_SIZE = 6;

const BlogList: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading, error } = useBlogPosts();
  const { tags, loading: tagsLoading } = useTags();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (!loading && posts.length > 0) {
      let filtered = [...posts];
      
      // Filter by search term
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(post => {
          const title = language === 'en' && post.data.title_en 
            ? post.data.title_en 
            : post.data.title;
          
          return title.toLowerCase().includes(lowerSearchTerm);
        });
      }
      
      // Filter by selected tags
      if (selectedTags.length > 0) {
        filtered = filtered.filter(post => {
          if (!post.tags || post.tags.length === 0) return false;
          return post.tags.some(tag => selectedTags.includes(tag.id));
        });
      }
      
      // Sort by date (most recent first)
      filtered = filtered.sort((a, b) => {
        const dateA = a.data.created_at ? new Date(a.data.created_at).getTime() : 0;
        const dateB = b.data.created_at ? new Date(b.data.created_at).getTime() : 0;
        return dateB - dateA;
      });
      
      // Calculate total pages
      const total = Math.ceil(filtered.length / PAGE_SIZE);
      setTotalPages(total || 1);
      
      // Reset to first page when filters change
      if (currentPage > total) {
        setCurrentPage(1);
      }
      
      // Apply pagination
      const start = (currentPage - 1) * PAGE_SIZE;
      const paginatedPosts = filtered.slice(start, start + PAGE_SIZE);
      
      setFilteredPosts(paginatedPosts);
    } else {
      setFilteredPosts([]);
    }
  }, [posts, searchTerm, selectedTags, currentPage, language, loading]);
  
  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
    
    // Reset to first page when changing filters
    setCurrentPage(1);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    // Reset to first page when changing filters
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Formatted dates for displaying in a readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    return format(
      new Date(dateString), 
      language === 'en' ? 'MMM d, yyyy' : 'd MMM yyyy', 
      { locale: language === 'es' ? es : undefined }
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          {/* Search */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder={language === 'en' ? "Search blog posts..." : "Buscar publicaciones..."}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          {/* Posts */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-72 animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
              <p className="text-red-700 dark:text-red-400">
                {language === 'en' 
                  ? 'Error loading blog posts. Please try again later.' 
                  : 'Error al cargar las publicaciones. Por favor, inténtalo nuevamente más tarde.'}
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                {language === 'en' 
                  ? 'No blog posts found' 
                  : 'No se encontraron publicaciones'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Intenta ajustar tus criterios de búsqueda o filtros.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => {
                  const postTitle = language === 'en' && post.data.title_en 
                    ? post.data.title_en 
                    : post.data.title;
                    
                  const formattedDate = post.data.created_at ? formatDate(post.data.created_at) : '';
                  
                  return (
                    <Link key={post.data.id} to={`/blog/${post.data.slug}`}>
                      <BlogCard
                        title={postTitle}
                        image={post.data.cover_image || ''}
                        date={formattedDate}
                        tags={post.tags || []}
                      />
                    </Link>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded-md dark:border-gray-700 disabled:opacity-50"
                    >
                      {language === 'en' ? 'Previous' : 'Anterior'}
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                      let pageNum;
                      
                      // Logic to show relevant page numbers around current page
                      if (totalPages <= 5) {
                        pageNum = idx + 1;
                      } else if (currentPage <= 3) {
                        pageNum = idx + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + idx;
                      } else {
                        pageNum = currentPage - 2 + idx;
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md ${
                            currentPage === pageNum
                              ? 'bg-tamec-600 text-white'
                              : 'border dark:border-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded-md dark:border-gray-700 disabled:opacity-50"
                    >
                      {language === 'en' ? 'Next' : 'Siguiente'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-24 space-y-6">
            <TagsFilter 
              tags={tags} 
              selectedTags={selectedTags} 
              onTagSelect={handleTagSelect}
              loading={tagsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
