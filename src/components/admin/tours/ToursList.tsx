
import React, { useState } from 'react';
import { Tour } from '@/modules/tours/types/tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink, CircleAlert, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ToursListProps {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

const ITEMS_PER_PAGE = 5;

const ToursList: React.FC<ToursListProps> = ({ tours, loading, error }) => {
  const { language } = useLanguage();
  const isMobile = useMobile();
  const [tourIdToDelete, setTourIdToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { deleteTour, isLoading } = useTourManagement();

  const handleDelete = async () => {
    if (tourIdToDelete) {
      await deleteTour(tourIdToDelete);
      setTourIdToDelete(null);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTours = tours.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? 'Title' : 'Título'}</TableHead>
              <TableHead>{language === 'en' ? 'Destination' : 'Destino'}</TableHead>
              <TableHead>{language === 'en' ? 'Days' : 'Días'}</TableHead>
              <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-10" />
                    <Skeleton className="h-9 w-10" />
                    <Skeleton className="h-9 w-10" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive rounded-md p-6 flex flex-col items-center gap-4 text-center">
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
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="border rounded-md p-6 flex flex-col items-center gap-4 text-center">
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{language === 'en' ? 'Title' : 'Título'}</TableHead>
            <TableHead>{language === 'en' ? 'Destination' : 'Destino'}</TableHead>
            <TableHead>{language === 'en' ? 'Days' : 'Días'}</TableHead>
            <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell className="font-medium">{tour.titulo}</TableCell>
              <TableCell>{tour.destino_principal || (language === 'en' ? '—' : '—')}</TableCell>
              <TableCell>{tour.dias_duracion || (language === 'en' ? '—' : '—')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild title={language === 'en' ? 'View' : 'Ver'}>
                    <Link to={`/destinations/${tour.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild title={language === 'en' ? 'Edit' : 'Editar'}>
                    <Link to={`/admin/tours/edit/${tour.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setTourIdToDelete(tour.id)}
                    title={language === 'en' ? 'Delete' : 'Eliminar'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => goToPage(currentPage - 1)} 
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              
              // Show first page, last page, and pages around current page
              if (
                pageNumber === 1 || 
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      isActive={currentPage === pageNumber}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              // Show ellipsis for gaps
              if (
                (pageNumber === 2 && currentPage > 3) || 
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => goToPage(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-disabled={currentPage >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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
