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
      {/* Hero Section */}
      <div className="relative h-[75vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background/90 dark:from-black/70 dark:via-black/60 dark:to-background/95" />
        </div>
        
        {/* Hero Content */}
        <div className="relative container mx-auto h-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="inline-block bg-tamec-600/90 text-white px-4 py-1 rounded-full text-sm font-medium mb-5">
              {language === 'en' ? 'Travel Blog' : 'Blog de Viajes'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {language === 'en' ? 'Explore the World Through Our Stories' : 'Explora el Mundo a Través de Nuestras Historias'}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              {language === 'en' 
                ? 'Discover amazing destinations, travel tips, and unforgettable experiences shared by our passionate travelers.'
                : 'Descubre destinos increíbles, consejos de viaje y experiencias inolvidables compartidas por nuestros apasionados viajeros.'}
            </p>
            <Button 
              onClick={scrollToBlogs}
              className="bg-tamec-600 hover:bg-tamec-700 text-white px-8 py-6 rounded-lg font-medium text-lg transition-all"
            >
              {language === 'en' ? 'Discover More' : 'Descubrir Más'}
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Decorative curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-background fill-current dark:text-background">
            <path fillOpacity="1" d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,117.3C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Blog List Section */}
      <div id="blog-list" className="py-16">
        <BlogList />
      </div>
    </Layout>
  );
};

export default BlogPage;
