
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
import { FileEdit, Trash2, Plus, Search } from 'lucide-react';

const AerolineasPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aerolineas, setAerolineas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  // Dialog states
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAerolinea, setSelectedAerolinea] = useState<any>(null);
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [paisOrigen, setPaisOrigen] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchAerolineas();
  }, []);
  
  const fetchAerolineas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('aerolineas')
        .select('*')
        .order('nombre', { ascending: true });
      
      if (error) throw error;
      
      setAerolineas(data || []);
    } catch (error: any) {
      console.error('Error fetching aerolineas:', error);
      setError(error.message || 'Error fetching aerolineas');
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error fetching aerolineas',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedAerolinea(null);
    setNombre('');
    setCodigo('');
    setPaisOrigen('');
    setIsOpen(true);
  };
  
  const openEditDialog = (aerolinea: any) => {
    setSelectedAerolinea(aerolinea);
    setNombre(aerolinea.nombre);
    setCodigo(aerolinea.codigo || '');
    setPaisOrigen(aerolinea.pais_origen || '');
    setIsOpen(true);
  };
  
  const confirmDelete = (aerolinea: any) => {
    setSelectedAerolinea(aerolinea);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!nombre.trim()) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Missing information' : 'Información incompleta',
        description: language === 'en' ? 'Airline name is required' : 'El nombre de la aerolínea es obligatorio',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get the next available ID for a new aerolinea
      let nextId = 1;
      if (!selectedAerolinea) {
        const { data: maxIdData } = await supabase
          .from('aerolineas')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (maxIdData) {
          nextId = maxIdData.id + 1;
        }
      }
      
      if (selectedAerolinea) {
        // Update existing aerolinea
        const { error } = await supabase
          .from('aerolineas')
          .update({
            nombre,
            codigo,
            pais_origen: paisOrigen,
          })
          .eq('id', selectedAerolinea.id);
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Airline updated' : 'Aerolínea actualizada',
          description: language === 'en' ? 'The airline has been updated successfully' : 'La aerolínea ha sido actualizada exitosamente',
        });
      } else {
        // Create new aerolinea
        const { error } = await supabase
          .from('aerolineas')
          .insert({
            id: nextId,
            nombre,
            codigo,
            pais_origen: paisOrigen,
          });
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Airline created' : 'Aerolínea creada',
          description: language === 'en' ? 'The airline has been created successfully' : 'La aerolínea ha sido creada exitosamente',
        });
      }
      
      setIsOpen(false);
      fetchAerolineas();
    } catch (error: any) {
      console.error('Error saving aerolinea:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error saving the airline',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedAerolinea) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if the aerolinea is being used in any tours
      const { data: toursData, error: toursError } = await supabase
        .from('tours')
        .select('id')
        .eq('aerolinea_id', selectedAerolinea.id);
      
      if (toursError) throw toursError;
      
      if (toursData && toursData.length > 0) {
        throw new Error(
          language === 'en' 
            ? 'This airline cannot be deleted because it is being used in tours' 
            : 'Esta aerolínea no puede ser eliminada porque está siendo utilizada en tours'
        );
      }
      
      const { error } = await supabase
        .from('aerolineas')
        .delete()
        .eq('id', selectedAerolinea.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Airline deleted' : 'Aerolínea eliminada',
        description: language === 'en' ? 'The airline has been deleted successfully' : 'La aerolínea ha sido eliminada exitosamente',
      });
      
      setIsDeleteDialogOpen(false);
      fetchAerolineas();
    } catch (error: any) {
      console.error('Error deleting aerolinea:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error deleting the airline',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredAerolineas = aerolineas.filter(aerolinea => 
    search === '' || 
    aerolinea.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (aerolinea.codigo && aerolinea.codigo.toLowerCase().includes(search.toLowerCase())) ||
    (aerolinea.pais_origen && aerolinea.pais_origen.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <AdminSidebar />
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Manage Airlines' : 'Administrar Aerolíneas'}
            </h1>
            
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Airline' : 'Agregar Nueva Aerolínea'}
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search airlines...' : 'Buscar aerolíneas...'}
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
                {language === 'en' ? 'Loading airlines...' : 'Cargando aerolíneas...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-destructive">
              <p>
                {language === 'en' ? 'Error loading airlines: ' : 'Error al cargar aerolíneas: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${filteredAerolineas.length} airlines` 
                  : `Total de ${filteredAerolineas.length} aerolíneas`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Name' : 'Nombre'}</TableHead>
                  <TableHead>{language === 'en' ? 'Code' : 'Código'}</TableHead>
                  <TableHead>{language === 'en' ? 'Country of Origin' : 'País de Origen'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAerolineas.map(aerolinea => (
                  <TableRow key={aerolinea.id}>
                    <TableCell className="font-medium">
                      {aerolinea.nombre}
                    </TableCell>
                    <TableCell>
                      {aerolinea.codigo || '-'}
                    </TableCell>
                    <TableCell>
                      {aerolinea.pais_origen || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(aerolinea)}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => confirmDelete(aerolinea)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredAerolineas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {language === 'en' ? 'No airlines found' : 'No se encontraron aerolíneas'}
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
              {selectedAerolinea 
                ? (language === 'en' ? 'Edit Airline' : 'Editar Aerolínea')
                : (language === 'en' ? 'Add New Airline' : 'Agregar Nueva Aerolínea')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nombre" className="text-right">
                {language === 'en' ? 'Name' : 'Nombre'}*
              </label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="codigo" className="text-right">
                {language === 'en' ? 'Code' : 'Código'}
              </label>
              <Input
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paisOrigen" className="text-right">
                {language === 'en' ? 'Country of Origin' : 'País de Origen'}
              </label>
              <Input
                id="paisOrigen"
                value={paisOrigen}
                onChange={(e) => setPaisOrigen(e.target.value)}
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
              {language === 'en' ? 'Delete Airline' : 'Eliminar Aerolínea'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this airline? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar esta aerolínea? Esta acción no se puede deshacer.'}
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

export default AerolineasPage;
