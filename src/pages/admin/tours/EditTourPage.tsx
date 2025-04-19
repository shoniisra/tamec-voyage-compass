
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TourForm from '@/components/admin/tours/TourForm';
import { useTour } from '@/hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const EditTourPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tour, loading, error } = useTour(id || '');
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <AdminSidebar />
          <div>
            <Skeleton className="h-10 w-64 mb-6" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !tour) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <AdminSidebar />
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin/tours')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Back to Tours' : 'Volver a Tours'}
              </Button>
            </div>
            <div className="bg-destructive/10 p-6 rounded-lg border border-destructive">
              <h2 className="text-xl font-medium text-destructive">
                {language === 'en' ? 'Error loading tour' : 'Error al cargar el tour'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {error || (language === 'en' ? 'Tour not found' : 'Tour no encontrado')}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <AdminSidebar />
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin/tours')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Back to Tours' : 'Volver a Tours'}
              </Button>
              <h1 className="text-2xl font-bold">
                {language === 'en' ? `Edit Tour: ${tour.titulo}` : `Editar Tour: ${tour.titulo}`}
              </h1>
            </div>
          </div>
          
          <TourForm tour={tour} />
        </div>
      </div>
    </Layout>
  );
};

export default EditTourPage;
