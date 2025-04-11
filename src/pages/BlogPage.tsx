
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const BlogPage = () => {
  const { t, language } = useLanguage();
  
  // Function to scroll down to blog list
  const scrollToBlogs = () => {
    document.getElementById('blog-list')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <Layout fullWidth={true}>
      {/* Hero Section - Full-width image with content overlay */}
      <section className="relative w-full">
        {/* Full-width hero image */}
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Travel blog hero"
          className="w-full h-[90vh] object-cover"
          loading="lazy"
        />
        
        {/* Content overlay - centered on the image */}
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto h-full flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-3xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="inline-block bg-tamec-600/90 text-white px-4 py-1 rounded-full text-sm font-medium mb-5">
                {language === 'en' ? 'Travel Blog' : 'Blog de Viajes'}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {language === 'en' ? 'Explore the World Through Our Stories' : 'Explora el Mundo a Través de Nuestras Historias'}
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Discover amazing destinations, travel tips, and unforgettable experiences shared by our passionate travelers.'
                  : 'Descubre destinos increíbles, consejos de viaje y experiencias inolvidables compartidas por nuestros apasionados viajeros.'}
              </p>
              
              <Button 
                onClick={scrollToBlogs}
                className="bg-tamec-600 hover:bg-tamec-700 text-white px-8 py-6 rounded-lg font-medium text-lg transition-all"
              >
                {language === 'en' ? 'See the Stories' : 'Ver las Historias'}
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog List Section */}
      <div id="blog-list" className="py-16">
        <BlogList />
      </div>
    </Layout>
  );
};

export default BlogPage;
