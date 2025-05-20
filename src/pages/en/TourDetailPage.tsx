
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import TourDetailPage from '@/modules/tours/pages/TourDetailPage';

const EnglishTourDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  return <TourDetailPage />;
};

export default EnglishTourDetailPage;
