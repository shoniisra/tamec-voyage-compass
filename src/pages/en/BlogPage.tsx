
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/modules/blog/components/BlogList';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EnglishBlogPage = () => {
  const { t, language } = useLanguage();
  
  // Function to scroll down to blog list
  const scrollToBlogs = () => {
    document.getElementById('blog-list')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <Layout fullWidth={true}>
      <Helmet>
        <title>Travel Blog | TAMEC Travel Agency</title>
        <meta name="description" content="Discover travel tips, destination guides, and stories from our expert travelers. Explore the world with TAMEC Travel Agency." />
        <link rel="canonical" href="https://tamecviajes.com/en/blog" />
        <meta property="og:title" content="Travel Blog | TAMEC Travel Agency" />
        <meta property="og:description" content="Discover travel tips, destination guides, and stories from our expert travelers. Explore the world with TAMEC Travel Agency." />
        <meta property="og:url" content="https://tamecviajes.com/en/blog" />
      </Helmet>
      
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
                Travel Blog
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Explore the World Through Our Stories
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
                Discover amazing destinations, travel tips, and unforgettable experiences shared by our passionate travelers.
              </p>
              
              <Button 
                onClick={scrollToBlogs}
                className="bg-tamec-600 hover:bg-tamec-700 text-white px-8 py-6 rounded-lg font-medium text-lg transition-all"
              >
                See the Stories
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

export default EnglishBlogPage;
