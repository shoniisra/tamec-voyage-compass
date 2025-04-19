
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileEdit, Trash2, Plus, Search, Globe, MapPin } from 'lucide-react';

const DestinosPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [destinos, setDestinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  // Dialog states
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState<any>(null);
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchDestinos();
  }, []);
  
  const fetchDestinos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('destinos')
        .select('*')
        .order('pais', { ascending: true })
        .order('ciudad', { ascending: true });
      
      if (error) throw error;
      
      setDestinos(data || []);
    } catch (error: any) {
      console.error('Error fetching destinos:', error);
      setError(error.message || 'Error fetching destinos');
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error fetching destinations',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedDestino(null);
    setPais('');
    setCiudad('');
    setIsOpen(true);
  };
  
  const openEditDialog = (destino: any) => {
    setSelectedDestino(destino);
    setPais(destino.pais);
    setCiudad(destino.ciudad || '');
    setIsOpen(true);
  };
  
  const confirmDelete = (destino: any) => {
    setSelectedDestino(destino);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!pais.trim()) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Missing information' : 'Información incompleta',
        description: language === 'en' ? 'Country is required' : 'El país es obligatorio',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (selectedDestino) {
        // Update existing destino
        const { error } = await supabase
          .from('destinos')
          .update({
            pais,
            ciudad: ciudad || null,
          })
          .eq('id', selectedDestino.id);
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Destination updated' : 'Destino actualizado',
          description: language === 'en' ? 'The destination has been updated successfully' : 'El destino ha sido actualizado exitosamente',
        });
      } else {
        // Create new destino
        const { error } = await supabase
          .from('destinos')
          .insert({
            pais,
            ciudad: ciudad || null,
          });
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Destination created' : 'Destino creado',
          description: language === 'en' ? 'The destination has been created successfully' : 'El destino ha sido creado exitosamente',
        });
      }
      
      setIsOpen(false);
      fetchDestinos();
    } catch (error: any) {
      console.error('Error saving destino:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error saving the destination',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedDestino) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if the destino is being used in any tours
      const { data: toursData, error: toursError } = await supabase
        .from('tour_destinos')
        .select('id')
        .eq('destino_id', selectedDestino.id);
      
      if (toursError) throw toursError;
      
      if (toursData && toursData.length > 0) {
        throw new Error(
          language === 'en' 
            ? 'This destination cannot be deleted because it is being used in tours' 
            : 'Este destino no puede ser eliminado porque está siendo utilizado en tours'
        );
      }
      
      const { error } = await supabase
        .from('destinos')
        .delete()
        .eq('id', selectedDestino.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Destination deleted' : 'Destino eliminado',
        description: language === 'en' ? 'The destination has been deleted successfully' : 'El destino ha sido eliminado exitosamente',
      });
      
      setIsDeleteDialogOpen(false);
      fetchDestinos();
    } catch (error: any) {
      console.error('Error deleting destino:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error deleting the destination',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredDestinos = destinos.filter(destino => 
    search === '' || 
    destino.pais.toLowerCase().includes(search.toLowerCase()) ||
    (destino.ciudad && destino.ciudad.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <AdminSidebar />
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Manage Destinations' : 'Administrar Destinos'}
            </h1>
            
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Destination' : 'Agregar Nuevo Destino'}
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search destinations...' : 'Buscar destinos...'}
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                {language === 'en' ? 'Loading destinations...' : 'Cargando destinos...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-destructive">
              <p>
                {language === 'en' ? 'Error loading destinations: ' : 'Error al cargar destinos: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${filteredDestinos.length} destinations` 
                  : `Total de ${filteredDestinos.length} destinos`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Country' : 'País'}</TableHead>
                  <TableHead>{language === 'en' ? 'City' : 'Ciudad'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinos.map(destino => (
                  <TableRow key={destino.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        {destino.pais}
                      </div>
                    </TableCell>
                    <TableCell>
                      {destino.ciudad ? (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {destino.ciudad}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(destino)}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => confirmDelete(destino)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredDestinos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      {language === 'en' ? 'No destinations found' : 'No se encontraron destinos'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      
      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDestino 
                ? (language === 'en' ? 'Edit Destination' : 'Editar Destino')
                : (language === 'en' ? 'Add New Destination' : 'Agregar Nuevo Destino')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="pais" className="text-right">
                {language === 'en' ? 'Country' : 'País'}*
              </label>
              <Input
                id="pais"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="ciudad" className="text-right">
                {language === 'en' ? 'City' : 'Ciudad'}
              </label>
              <Input
                id="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                  {language === 'en' ? 'Saving...' : 'Guardando...'}
                </span>
              ) : (
                language === 'en' ? 'Save' : 'Guardar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Delete Destination' : 'Eliminar Destino'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this destination? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar este destino? Esta acción no se puede deshacer.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                  {language === 'en' ? 'Deleting...' : 'Eliminando...'}
                </span>
              ) : (
                language === 'en' ? 'Delete' : 'Eliminar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DestinosPage;
