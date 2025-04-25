
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
import { FileEdit, Trash2, Plus, Search, FileText, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/layout/AdminLayout';

const TerminosPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [terminos, setTerminos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [viewContent, setViewContent] = useState<{ id: number; titulo: string; contenido: string } | null>(null);
  
  // Dialog states
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTermino, setSelectedTermino] = useState<any>(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchTerminos();
  }, []);
  
  const fetchTerminos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('terminos_condiciones')
        .select('*')
        .order('titulo', { ascending: true });
      
      if (error) throw error;
      
      setTerminos(data || []);
    } catch (error: any) {
      console.error('Error fetching terms:', error);
      setError(error.message || 'Error fetching terms');
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error fetching terms and conditions',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedTermino(null);
    setTitulo('');
    setContenido('');
    setIsOpen(true);
  };
  
  const openEditDialog = (termino: any) => {
    setSelectedTermino(termino);
    setTitulo(termino.titulo || '');
    setContenido(termino.contenido);
    setIsOpen(true);
  };
  
  const viewTerminoContent = (termino: any) => {
    setViewContent({
      id: termino.id,
      titulo: termino.titulo || 'Terms and Conditions',
      contenido: termino.contenido
    });
  };
  
  const confirmDelete = (termino: any) => {
    setSelectedTermino(termino);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!contenido.trim()) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Missing information' : 'Información incompleta',
        description: language === 'en' ? 'Content is required' : 'El contenido es obligatorio',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get the next available ID for a new termino
      let nextId = 1;
      if (!selectedTermino) {
        const { data: maxIdData } = await supabase
          .from('terminos_condiciones')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (maxIdData) {
          nextId = maxIdData.id + 1;
        }
      }
      
      if (selectedTermino) {
        // Update existing termino
        const { error } = await supabase
          .from('terminos_condiciones')
          .update({
            titulo: titulo || null,
            contenido,
          })
          .eq('id', selectedTermino.id);
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Terms updated' : 'Términos actualizados',
          description: language === 'en' ? 'The terms have been updated successfully' : 'Los términos han sido actualizados exitosamente',
        });
      } else {
        // Create new termino
        const { error } = await supabase
          .from('terminos_condiciones')
          .insert({
            id: nextId,
            titulo: titulo || null,
            contenido,
          });
        
        if (error) throw error;
        
        toast({
          title: language === 'en' ? 'Terms created' : 'Términos creados',
          description: language === 'en' ? 'The terms have been created successfully' : 'Los términos han sido creados exitosamente',
        });
      }
      
      setIsOpen(false);
      fetchTerminos();
    } catch (error: any) {
      console.error('Error saving terms:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error saving the terms',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedTermino) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if the termino is being used in any tours
      const { data: toursData, error: toursError } = await supabase
        .from('tours')
        .select('id')
        .eq('terminos_condiciones_id', selectedTermino.id);
      
      if (toursError) throw toursError;
      
      if (toursData && toursData.length > 0) {
        throw new Error(
          language === 'en' 
            ? 'These terms cannot be deleted because they are being used in tours' 
            : 'Estos términos no pueden ser eliminados porque están siendo utilizados en tours'
        );
      }
      
      const { error } = await supabase
        .from('terminos_condiciones')
        .delete()
        .eq('id', selectedTermino.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? 'Terms deleted' : 'Términos eliminados',
        description: language === 'en' ? 'The terms have been deleted successfully' : 'Los términos han sido eliminados exitosamente',
      });
      
      setIsDeleteDialogOpen(false);
      fetchTerminos();
    } catch (error: any) {
      console.error('Error deleting terms:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Error',
        description: error.message || 'There was an error deleting the terms',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredTerminos = terminos.filter(termino => 
    search === '' || 
    (termino.titulo && termino.titulo.toLowerCase().includes(search.toLowerCase())) ||
    termino.contenido.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <AdminLayout>   
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Manage Terms and Conditions' : 'Administrar Términos y Condiciones'}
            </h1>
            
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add New Terms' : 'Agregar Nuevos Términos'}
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'en' ? 'Search terms...' : 'Buscar términos...'}
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
                {language === 'en' ? 'Loading terms...' : 'Cargando términos...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-destructive">
              <p>
                {language === 'en' ? 'Error loading terms: ' : 'Error al cargar términos: '}
                {error}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                {language === 'en' 
                  ? `Total of ${filteredTerminos.length} terms and conditions` 
                  : `Total de ${filteredTerminos.length} términos y condiciones`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Title' : 'Título'}</TableHead>
                  <TableHead>{language === 'en' ? 'Preview' : 'Vista Previa'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Acciones'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTerminos.map(termino => (
                  <TableRow key={termino.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {termino.titulo || (language === 'en' ? 'Terms and Conditions' : 'Términos y Condiciones')}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {termino.contenido.substring(0, 100)}...
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewTerminoContent(termino)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(termino)}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => confirmDelete(termino)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredTerminos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      {language === 'en' ? 'No terms found' : 'No se encontraron términos'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      
      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTermino 
                ? (language === 'en' ? 'Edit Terms' : 'Editar Términos')
                : (language === 'en' ? 'Add New Terms' : 'Agregar Nuevos Términos')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <label htmlFor="titulo" className="text-right">
                {language === 'en' ? 'Title' : 'Título'}
              </label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="col-span-4"
                placeholder={language === 'en' ? 'Terms and Conditions' : 'Términos y Condiciones'}
              />
            </div>
            
            <div className="grid grid-cols-5 items-start gap-4">
              <label htmlFor="contenido" className="text-right pt-2">
                {language === 'en' ? 'Content' : 'Contenido'}*
              </label>
              <Textarea
                id="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="col-span-4 min-h-[300px]"
                placeholder={language === 'en' ? 'Enter the terms and conditions here...' : 'Ingrese los términos y condiciones aquí...'}
                required
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
      
      {/* View Content Dialog */}
      <Dialog open={viewContent !== null} onOpenChange={(open) => !open && setViewContent(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewContent?.titulo || (language === 'en' ? 'Terms and Conditions' : 'Términos y Condiciones')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 whitespace-pre-wrap">
            {viewContent?.contenido}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setViewContent(null)}>
              {language === 'en' ? 'Close' : 'Cerrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Delete Terms' : 'Eliminar Términos'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete these terms? This action cannot be undone.' 
                : '¿Estás seguro de que quieres eliminar estos términos? Esta acción no se puede deshacer.'}
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

export default TerminosPage;
