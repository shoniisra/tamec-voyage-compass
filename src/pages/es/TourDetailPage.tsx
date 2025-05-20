
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { TourDetailPage as TourDetail } from '@/modules/tours/pages';

const SpanishTourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <Layout>
      <TourDetail slug={slug || ''} />
    </Layout>
  );
};

export default SpanishTourDetailPage;
