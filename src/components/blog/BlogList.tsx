
import React from 'react';
import BlogCard from './BlogCard';

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Tips for First-Time Travelers',
    excerpt: 'Planning your first international trip can be both exciting and overwhelming. Here are our top 10 tips to ensure your journey goes smoothly...',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    date: 'June 15, 2023',
    category: 'Travel Tips',
    slug: 'essential-tips-first-time-travelers',
  },
  {
    id: 2,
    title: 'The Hidden Beaches of Southeast Asia',
    excerpt: 'Discover secluded paradises away from the tourist crowds. These pristine beaches offer crystal-clear waters and peaceful surroundings...',
    coverImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80',
    date: 'May 28, 2023',
    category: 'Destinations',
    slug: 'hidden-beaches-southeast-asia',
  },
  {
    id: 3,
    title: 'Budget-Friendly European City Breaks',
    excerpt: 'Exploring Europe doesn\'t have to break the bank. Here\'s how to enjoy the culture, cuisine, and attractions of top European cities without spending a fortune...',
    coverImage: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80',
    date: 'April 10, 2023',
    category: 'Budget Travel',
    slug: 'budget-european-city-breaks',
  },
  {
    id: 4,
    title: 'Sustainable Tourism: How to Travel Responsibly',
    excerpt: 'Learn how to minimize your environmental impact while traveling and support local communities. These sustainable practices can make a big difference...',
    coverImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80',
    date: 'March 5, 2023',
    category: 'Sustainable Travel',
    slug: 'sustainable-tourism-guide',
  },
  {
    id: 5,
    title: 'The Ultimate Packing Checklist for Any Trip',
    excerpt: 'Never forget essential items again! Our comprehensive packing guide covers everything you need for different types of trips and destinations...',
    coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80',
    date: 'February 20, 2023',
    category: 'Travel Tips',
    slug: 'ultimate-packing-checklist',
  },
  {
    id: 6,
    title: 'Cultural Etiquette Around the World',
    excerpt: 'Avoid cultural faux pas with our guide to customs and traditions in different countries. Understanding local etiquette can enhance your travel experience...',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    date: 'January 15, 2023',
    category: 'Culture',
    slug: 'cultural-etiquette-guide',
  },
];

const BlogList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              date={post.date}
              category={post.category}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
