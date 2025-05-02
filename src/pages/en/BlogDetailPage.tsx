
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogDetail from '@/modules/blog/components/BlogDetail';
import { useParams } from 'react-router-dom';

const EnglishBlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <Layout>
      <BlogDetail slug={slug || ''} />
    </Layout>
  );
};

export default EnglishBlogDetailPage;
