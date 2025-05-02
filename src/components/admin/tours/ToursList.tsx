
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tour } from '@/modules/tours/types/tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink, CircleAlert, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useMobile } from '@/shared/hooks/use-mobile';
import { useTourManagement } from '@/modules/tours';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ToursListProps {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

const ToursList: React.FC<ToursListProps> = ({ tours, loading, error }) => {
  const { language } = useLanguage();
  const isMobile = useMobile();
  const [tourIdToDelete, setTourIdToDelete] = useState<number | null>(null);
  const { deleteTour, isLoading } = useTourManagement();

  const handleDelete = async () => {
    if (tourIdToDelete) {
      await deleteTour(tourIdToDelete);
      setTourIdToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex flex-col gap-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
          <CircleAlert className="h-10 w-10 text-destructive" />
          <div>
            <h3 className="text-lg font-medium text-destructive mb-2">
              {language === 'en' ? 'Error Loading Tours' : 'Error al cargar los tours'}
            </h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (tours.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {language === 'en' ? 'No Tours Found' : 'No se encontraron tours'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Try adjusting your filters or create a new tour.' 
                : 'Intenta ajustar tus filtros o crear un nuevo tour.'}
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/tours/create">
              {language === 'en' ? 'Create Tour' : 'Crear Tour'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{tour.titulo}</h3>
                  <p className="text-muted-foreground text-sm">
                    {tour.destino_principal || (language === 'en' ? 'No destination' : 'Sin destino')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/destinations/${tour.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {isMobile ? '' : language === 'en' ? 'View' : 'Ver'}
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link to={`/admin/tours/edit/${tour.id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      {isMobile ? '' : language === 'en' ? 'Edit' : 'Editar'}
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setTourIdToDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {isMobile ? '' : language === 'en' ? 'Delete' : 'Eliminar'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={tourIdToDelete !== null} onOpenChange={(open) => !open && setTourIdToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Delete Tour' : 'Eliminar Tour'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this tour? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar este tour? Esta acción no se puede deshacer.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setTourIdToDelete(null)}
              disabled={isLoading}
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                  {language === 'en' ? 'Deleting...' : 'Eliminando...'}
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Delete' : 'Eliminar'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToursList;
