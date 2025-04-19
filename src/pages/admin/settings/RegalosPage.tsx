import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { FileEdit, Trash2, Plus, Search, Gift } from 'lucide-react';

const RegalosPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [regalos, setRegalos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  // Dialog states
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRegalo, setSelectedRegalo] = useState<any>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchRegalos();
  }, []);
  
  const fetchRegalos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('regalos_genericos')
        .select('*')
        .order('nombre', { ascending: true });
      
      if (error) throw error;
      
      setRegalos(data || []);
    } catch (error: any) {
      console.error('Error fetching gifts:', error);
      setError(error.message || 'Error fetching gifts');
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error fetching gifts',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedRegalo(null);
    setNombre('');
    setDescripcion('');
    setIsOpen(true);
  };
  
  const openEditDialog = (regalo: any) => {
    setSelectedRegalo(regalo);
    setNombre(regalo.nombre);
    setDescripcion(regalo.descripcion || '');
    setIsOpen(true);
  };
  
  const confirmDelete = (regalo: any) => {
    setSelectedRegalo(regalo);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!nombre.trim()) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Missing information' : 'Información incompleta',
        description: language === 'en' ? 'Gift name is required' : 'El nombre del regalo es obligatorio',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let nextId = 1;
      if (!selectedRegalo) {
        const { data: maxIdData } = await supabase
          .from('regalos_genericos')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (maxIdData) {
          nextId = maxIdData.id + 1;
        }
      }
      
      if (selectedRegalo) {
        const { error } = await supabase
          .from('regalos_genericos')
          .update({
            nombre,
            descripcion: descripcion || null,
          })
          .eq('id', selectedRegalo.id);
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Gift updated' : 'Regalo actualizado',
          description: language === 'en' ? 'The gift has been updated successfully' : 'El regalo ha sido actualizado exitosamente',
        });
      } else {
        const { error } = await supabase
          .from('regalos_genericos')
          .insert({
            id: nextId,
            nombre,
            descripcion: descripcion || null,
          });
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Gift created' : 'Regalo creado',
          description: language === 'en' ? 'The gift has been created successfully' : 'El regalo ha sido creado exitosamente',
        });
      }
      
      setIsOpen(false);
      fetchRegalos();
    } catch (error: any) {
      console.error('Error saving gift:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error saving the gift',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedRegalo) return;
    
    setIsSubmitting(true);
    
    try {
      const { data: toursData, error: toursError } = await supabase
        .from('tour_regalos')
        .select('id')
        .eq('regalo_id', selectedRegalo.id);
      
      if (toursError) throw toursError;
      
      if (toursData && toursData.length > 0) {
        throw new Error(
          language === 'en' 
            ? 'This gift cannot be deleted because it is being used in tours' 
            : 'Este regalo no puede ser eliminado porque está siendo utilizado en tours'
        );
      }
      
      const { error } = await supabase
        .from('regalos_genericos')
        .delete()
        .eq('id', selectedRegalo.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Gift deleted' : 'Regalo eliminado',
        description: language === 'en' ? 'The gift has been deleted successfully' : 'El regalo ha sido eliminado exitosamente',
      });
      
      setIsDeleteDialogOpen(false);
      fetchRegalos();
    } catch (error: any) {
      console.error('Error deleting gift:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error deleting the gift',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredRegalos = regalos.filter(regalo => 
    search === '' || 
    regalo.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (regalo.descripcion && regalo.descripcion.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Manage Gifts' : 'Administrar Regalos'}
          </h1>
          
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Add New Gift' : 'Agregar Nuevo Regalo'}
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search gifts...' : 'Buscar regalos...'}
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
              {language === 'en' ? 'Loading gifts...' : 'Cargando regalos...'}
            </p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">
            <p>
              {language === 'en' ? 'Error loading gifts: ' : 'Error al cargar regalos: '}
              {error}
            </p>
          </div>
        ) : (
          <Table>
            <TableCaption>
              {language === 'en' 
                ? `Total of ${filteredRegalos.length} gifts` 
                : `Total de ${filteredRegalos.length} regalos`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? 'Name' : 'Nombre'}</TableHead>
                <TableHead>{language === 'en' ? 'Description' : 'Descripción'}</TableHead>
                <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegalos.map(regalo => (
                <TableRow key={regalo.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
                      {regalo.nombre}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {regalo.descripcion || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(regalo)}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => confirmDelete(regalo)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRegalos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {language === 'en' ? 'No gifts found' : 'No se encontraron regalos'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRegalo 
                ? (language === 'en' ? 'Edit Gift' : 'Editar Regalo')
                : (language === 'en' ? 'Add New Gift' : 'Agregar Nuevo Regalo')}
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
              <label htmlFor="descripcion" className="text-right">
                {language === 'en' ? 'Description' : 'Descripción'}
              </label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="col-span-3 min-h-[100px]"
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
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Delete Gift' : 'Eliminar Regalo'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this gift? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar este regalo? Esta acción no se puede deshacer.'}
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
    </AdminLayout>
  );
};

export default RegalosPage;
