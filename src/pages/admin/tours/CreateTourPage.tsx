
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TourForm from '@/components/admin/tours/TourForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CreateTourPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
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
                {language === 'en' ? 'Create New Tour' : 'Crear Nuevo Tour'}
              </h1>
            </div>
          </div>
          
          <TourForm />
        </div>
      </div>
    </Layout>
  );
};

export default CreateTourPage;
