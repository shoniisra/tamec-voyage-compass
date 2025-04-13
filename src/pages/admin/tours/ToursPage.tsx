
import React from 'react';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useTours } from '@/hooks/use-tours';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  FileEdit,
  Trash2,
  Plus,
  Globe,
  Calendar,
  ListFilter
} from 'lucide-react';

const ToursPage: React.FC = () => {
  const { language } = useLanguage();
  const { tours, loading, error } = useTours();
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <AdminSidebar />
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Manage Tours' : 'Administrar Tours'}
            </h1>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Tour' : 'Agregar Nuevo Tour'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ListFilter className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Filter' : 'Filtrar'}
              </Button>
              
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'All Destinations' : 'Todos los Destinos'}
              </Button>
              
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {language === 'en' ? 'All Dates' : 'Todas las Fechas'}
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tamec-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {language === 'en' ? 'Loading tours...' : 'Cargando tours...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              <p>
                {language === 'en' ? 'Error loading tours: ' : 'Error al cargar tours: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${tours.length} tours` 
                  : `Total de ${tours.length} tours`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Title' : 'Título'}</TableHead>
                  <TableHead>{language === 'en' ? 'Destinations' : 'Destinos'}</TableHead>
                  <TableHead>{language === 'en' ? 'Duration' : 'Duración'}</TableHead>
                  <TableHead>{language === 'en' ? 'Min. Price' : 'Precio Min.'}</TableHead>
                  <TableHead>{language === 'en' ? 'Published' : 'Publicado'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map(tour => {
                  const destinationText = tour.destinos
                    ?.filter(d => d.destino)
                    .map(d => d.destino?.ciudad || d.destino?.pais)
                    .join(', ');
                    
                  return (
                    <TableRow key={tour.id}>
                      <TableCell className="font-medium">{tour.titulo}</TableCell>
                      <TableCell>{destinationText || '-'}</TableCell>
                      <TableCell>{tour.dias_duracion || '-'} {language === 'en' ? 'days' : 'días'}</TableCell>
                      <TableCell>${tour.precio_desde || '-'}</TableCell>
                      <TableCell>{formatDate(tour.fecha_publicacion)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {tours.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {language === 'en' ? 'No tours found' : 'No se encontraron tours'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ToursPage;
