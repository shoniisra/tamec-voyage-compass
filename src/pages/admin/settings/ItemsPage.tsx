
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AdminSidebar from '@/components/admin/AdminSidebar';
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
import { FileEdit, Trash2, Plus, Search, CheckSquare } from 'lucide-react';

const ItemsPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  // Dialog states
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('incluye_generico')
        .select('*')
        .order('nombre', { ascending: true });
      
      if (error) throw error;
      
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      setError(error.message || 'Error fetching items');
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error fetching included items',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedItem(null);
    setNombre('');
    setDescripcion('');
    setIsOpen(true);
  };
  
  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    setNombre(item.nombre);
    setDescripcion(item.descripcion || '');
    setIsOpen(true);
  };
  
  const confirmDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!nombre.trim()) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Missing information' : 'Información incompleta',
        description: language === 'en' ? 'Item name is required' : 'El nombre del item es obligatorio',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get the next available ID for a new item
      let nextId = 1;
      if (!selectedItem) {
        const { data: maxIdData } = await supabase
          .from('incluye_generico')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (maxIdData) {
          nextId = maxIdData.id + 1;
        }
      }
      
      if (selectedItem) {
        // Update existing item
        const { error } = await supabase
          .from('incluye_generico')
          .update({
            nombre,
            descripcion: descripcion || null,
          })
          .eq('id', selectedItem.id);
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Item updated' : 'Item actualizado',
          description: language === 'en' ? 'The item has been updated successfully' : 'El item ha sido actualizado exitosamente',
        });
      } else {
        // Create new item
        const { error } = await supabase
          .from('incluye_generico')
          .insert({
            id: nextId,
            nombre,
            descripcion: descripcion || null,
          });
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Item created' : 'Item creado',
          description: language === 'en' ? 'The item has been created successfully' : 'El item ha sido creado exitosamente',
        });
      }
      
      setIsOpen(false);
      fetchItems();
    } catch (error: any) {
      console.error('Error saving item:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error saving the item',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedItem) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if the item is being used in any tours
      const { data: toursData, error: toursError } = await supabase
        .from('tour_incluye')
        .select('id')
        .eq('incluye_id', selectedItem.id);
      
      if (toursError) throw toursError;
      
      if (toursData && toursData.length > 0) {
        throw new Error(
          language === 'en' 
            ? 'This item cannot be deleted because it is being used in tours' 
            : 'Este item no puede ser eliminado porque está siendo utilizado en tours'
        );
      }
      
      const { error } = await supabase
        .from('incluye_generico')
        .delete()
        .eq('id', selectedItem.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Item deleted' : 'Item eliminado',
        description: language === 'en' ? 'The item has been deleted successfully' : 'El item ha sido eliminado exitosamente',
      });
      
      setIsDeleteDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error deleting the item',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredItems = items.filter(item => 
    search === '' || 
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (item.descripcion && item.descripcion.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <AdminSidebar />
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Manage Included Items' : 'Administrar Items Incluidos'}
            </h1>
            
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Item' : 'Agregar Nuevo Item'}
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search items...' : 'Buscar items...'}
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
                {language === 'en' ? 'Loading items...' : 'Cargando items...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-destructive">
              <p>
                {language === 'en' ? 'Error loading items: ' : 'Error al cargar items: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${filteredItems.length} items` 
                  : `Total de ${filteredItems.length} items`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Name' : 'Nombre'}</TableHead>
                  <TableHead>{language === 'en' ? 'Description' : 'Descripción'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        {item.nombre}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.descripcion || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(item)}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => confirmDelete(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      {language === 'en' ? 'No items found' : 'No se encontraron items'}
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
              {selectedItem 
                ? (language === 'en' ? 'Edit Item' : 'Editar Item')
                : (language === 'en' ? 'Add New Item' : 'Agregar Nuevo Item')}
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Delete Item' : 'Eliminar Item'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this item? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar este item? Esta acción no se puede deshacer.'}
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

export default ItemsPage;
