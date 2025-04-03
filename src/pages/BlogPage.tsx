
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="bg-tamec-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('blog.title')}</h1>
          <p className="text-tamec-100 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>
      <BlogList />
    </Layout>
  );
};

export default BlogPage;
