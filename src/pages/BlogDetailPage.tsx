
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogDetail from '@/components/blog/BlogDetail';
import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <Layout>
      <BlogDetail slug={slug || ''} />
    </Layout>
  );
};

export default BlogDetailPage;
