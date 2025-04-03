
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';

const BlogPage = () => {
  return (
    <Layout>
      <div className="bg-tamec-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Travel Blog</h1>
          <p className="text-tamec-100 max-w-2xl mx-auto">
            Discover travel tips, destination guides, and stories from around the world.
          </p>
        </div>
      </div>
      <BlogList />
    </Layout>
  );
};

export default BlogPage;
