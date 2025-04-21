import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useTours, useTour, useTourManagement, useDestinos } from '@/modules/tours';
import { Tour, TourFilterParams } from '@/modules/tours';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { TourFilterParams } from '@/types/tour';
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
  Calendar as CalendarIcon2,
  ListFilter,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';

const ToursPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { destinos } = useDestinos();
  const [tourIdToDelete, setTourIdToDelete] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<TourFilterParams>({});
  
  const { tours, loading, error } = useTours(filters);
  const { deleteTour, isLoading } = useTourManagement();
  
  const filteredTours = tours.filter(tour => 
    search === '' || 
    tour.titulo.toLowerCase().includes(search.toLowerCase()) ||
    tour.destinos?.some(d => 
      d.destino?.pais.toLowerCase().includes(search.toLowerCase()) ||
      (d.destino?.ciudad && d.destino.ciudad.toLowerCase().includes(search.toLowerCase()))
    )
  );
  
  const resetFilters = () => {
    setFilters({});
    setShowFilters(false);
  };
  
  const handleFilterChange = (key: keyof TourFilterParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES');
  };
  
  const confirmDelete = (id: number) => {
    setTourIdToDelete(id);
  };
  
  const handleDelete = async () => {
    if (tourIdToDelete) {
      await deleteTour(tourIdToDelete);
      setTourIdToDelete(null);
    }
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
            
            <Button onClick={() => navigate('/admin/tours/create')}>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Tour' : 'Agregar Nuevo Tour'}
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search tours...' : 'Buscar tours...'}
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <Button 
                variant={showFilters ? "default" : "outline"} 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <ListFilter className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Filters' : 'Filtros'}
                {Object.keys(filters).length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {Object.keys(filters).length}
                  </Badge>
                )}
              </Button>
              
              {Object.keys(filters).length > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <X className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Clear Filters' : 'Limpiar Filtros'}
                </Button>
              )}
            </div>
            
            {showFilters && (
              <div className="bg-muted/40 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === 'en' ? 'Destination' : 'Destino'}
                    </label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('destino', value ? [parseInt(value)] : [])}
                      value={filters.destino?.[0]?.toString() || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'All destinations' : 'Todos los destinos'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          {language === 'en' ? 'All destinations' : 'Todos los destinos'}
                        </SelectItem>
                        {destinos.map((destino) => (
                          <SelectItem key={destino.id} value={destino.id.toString()}>
                            {destino.pais} {destino.ciudad ? `- ${destino.ciudad}` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === 'en' ? 'Duration (days)' : 'Duración (días)'}
                    </label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('duracion', value ? [parseInt(value)] : [])}
                      value={filters.duracion?.[0]?.toString() || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Any duration' : 'Cualquier duración'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          {language === 'en' ? 'Any duration' : 'Cualquier duración'}
                        </SelectItem>
                        {[3, 4, 5, 6, 7, 8, 9, 10, 14, 15].map((days) => (
                          <SelectItem key={days} value={days.toString()}>
                            {days} {language === 'en' ? 'days' : 'días'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === 'en' ? 'Date Range' : 'Rango de Fechas'}
                    </label>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filters.fecha_inicio ? (
                              format(filters.fecha_inicio, "PP", { locale: language === 'es' ? es : undefined })
                            ) : (
                              <span>{language === 'en' ? 'Start date' : 'Fecha inicio'}</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={filters.fecha_inicio || undefined}
                            onSelect={(date) => handleFilterChange('fecha_inicio', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filters.fecha_fin ? (
                              format(filters.fecha_fin, "PP", { locale: language === 'es' ? es : undefined })
                            ) : (
                              <span>{language === 'en' ? 'End date' : 'Fecha fin'}</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={filters.fecha_fin || undefined}
                            onSelect={(date) => handleFilterChange('fecha_fin', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {language === 'en' ? 'Flight Included' : 'Incluye Vuelo'}
                    </label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('incluye_vuelo', value === 'true' ? true : value === 'false' ? false : undefined)}
                      value={filters.incluye_vuelo === undefined ? '' : filters.incluye_vuelo.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Any' : 'Cualquiera'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          {language === 'en' ? 'Any' : 'Cualquiera'}
                        </SelectItem>
                        <SelectItem value="true">
                          {language === 'en' ? 'Yes' : 'Sí'}
                        </SelectItem>
                        <SelectItem value="false">
                          {language === 'en' ? 'No' : 'No'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                {language === 'en' ? 'Loading tours...' : 'Cargando tours...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-destructive">
              <p>
                {language === 'en' ? 'Error loading tours: ' : 'Error al cargar tours: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${filteredTours.length} tours` 
                  : `Total de ${filteredTours.length} tours`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Title' : 'Título'}</TableHead>
                  <TableHead>{language === 'en' ? 'Destinations' : 'Destinos'}</TableHead>
                  <TableHead>{language === 'en' ? 'Duration' : 'Duración'}</TableHead>
                  <TableHead>{language === 'en' ? 'Min. Price' : 'Precio Min.'}</TableHead>
                  <TableHead>{language === 'en' ? 'Published' : 'Publicado'}</TableHead>
                  <TableHead>{language === 'en' ? 'Status' : 'Estado'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTours.map(tour => {
                  const destinationText = tour.destinos
                    ?.filter(d => d.destino)
                    .map(d => d.destino?.ciudad || d.destino?.pais)
                    .join(', ');
                  
                  const now = new Date();
                  let status = 'active';
                  
                  if (tour.fecha_publicacion && new Date(tour.fecha_publicacion) > now) {
                    status = 'scheduled';
                  }
                  
                  if (tour.fecha_caducidad && new Date(tour.fecha_caducidad) < now) {
                    status = 'expired';
                  }
                  
                  return (
                    <TableRow key={tour.id}>
                      <TableCell className="font-medium max-w-[200px] truncate" title={tour.titulo}>
                        {tour.titulo}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={destinationText || '-'}>
                        {destinationText || '-'}
                      </TableCell>
                      <TableCell>{tour.dias_duracion || '-'} {language === 'en' ? 'days' : 'días'}</TableCell>
                      <TableCell>${tour.precio_desde?.toFixed(2) || '-'}</TableCell>
                      <TableCell>{formatDate(tour.fecha_publicacion)}</TableCell>
                      <TableCell>
                        {status === 'active' && (
                          <Badge variant="secondary" className="flex items-center gap-1 w-fit bg-green-100 text-green-800 hover:bg-green-200">
                            <CheckCircle className="h-3 w-3" />
                            {language === 'en' ? 'Active' : 'Activo'}
                          </Badge>
                        )}
                        {status === 'scheduled' && (
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <CalendarIcon2 className="h-3 w-3" />
                            {language === 'en' ? 'Scheduled' : 'Programado'}
                          </Badge>
                        )}
                        {status === 'expired' && (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <AlertCircle className="h-3 w-3" />
                            {language === 'en' ? 'Expired' : 'Expirado'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/destinations/${tour.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/tours/edit/${tour.id}`)}
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => confirmDelete(tour.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {filteredTours.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {language === 'en' ? 'No tours found' : 'No se encontraron tours'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      
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
    </Layout>
  );
};

export default ToursPage;
