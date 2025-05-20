
import React from 'react';
import { useTour } from '@/modules/tours/hooks/use-tour';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import TourDetailPage from '@/modules/tours/pages/TourDetailPage';

const SpanishTourDetailPage = () => {
  return <TourDetailPage />;
};

export default SpanishTourDetailPage;
