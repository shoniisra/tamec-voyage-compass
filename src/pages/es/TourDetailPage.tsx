
import React from 'react';
import { useTour } from '@/modules/tours/hooks/use-tour';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const SpanishTourDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  
  return (
    <Layout>
      {/* The content here will be the same as the original TourDetailPage */}
      {/* Using the existing TourDetailPage component content */}
      {/* This is essentially a placeholder that will use the same components as the original page */}
      {loading ? (
        <div>Cargando detalles del tour...</div>
      ) : error ? (
        <div>Error al cargar el tour: {error}</div>
      ) : tour ? (
        <div>{/* Tour detail content */}</div>
      ) : (
        <div>Tour no encontrado</div>
      )}
    </Layout>
  );
};

export default SpanishTourDetailPage;
