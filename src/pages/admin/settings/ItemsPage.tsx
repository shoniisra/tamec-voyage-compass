import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ItemGenerico {
  id: number;
  nombre: string;
  descripcion: string | null;
}

const ItemsPage: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ItemGenerico[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ItemGenerico | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('itemsGenericos');
  
  useEffect(() => {
    fetchItems();
  }, [activeTab]);
  
  const fetchItems = async () => {
    setLoading(true);
    try {
      let data;
      
      if (activeTab === 'itemsGenericos') {
        const { data: itemsData, error } = await supabase
          .from('regalos_genericos')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) throw error;
        data = itemsData;
      } else {
        data = [];
      }
      
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error loading items" : "Error al cargar los items",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateItem = async () => {
    try {
      if (!newItemName.trim()) {
        toast({
          variant: "destructive",
          title: language === 'en' ? "Error" : "Error",
          description: language === 'en' ? "Name is required" : "El nombre es requerido",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('regalos_genericos')
        .insert([
          {
            nombre: newItemName.trim(),
            descripcion: newItemDescription.trim() || null,
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: language === 'en' ? "Item created" : "Item creado",
        description: language === 'en' ? "The item has been created successfully" : "El item ha sido creado exitosamente",
      });
      
      setNewItemName('');
      setNewItemDescription('');
      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      console.error('Error creating item:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error creating item" : "Error al crear el item",
        description: error.message,
      });
    }
  };
  
  const handleUpdateItem = async () => {
    try {
      if (!currentItem) return;
      
      if (!newItemName.trim()) {
        toast({
          variant: "destructive",
          title: language === 'en' ? "Error" : "Error",
          description: language === 'en' ? "Name is required" : "El nombre es requerido",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('regalos_genericos')
        .update({
          nombre: newItemName.trim(),
          descripcion: newItemDescription.trim() || null,
        })
        .eq('id', currentItem.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? "Item updated" : "Item actualizado",
        description: language === 'en' ? "The item has been updated successfully" : "El item ha sido actualizado exitosamente",
      });
      
      setCurrentItem(null);
      setNewItemName('');
      setNewItemDescription('');
      setIsDialogOpen(false);
      setIsEditing(false);
      fetchItems();
    } catch (error: any) {
      console.error('Error updating item:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error updating item" : "Error al actualizar el item",
        description: error.message,
      });
    }
  };
  
  const handleDeleteItem = async () => {
    try {
      if (!currentItem) return;
      
      const { error } = await supabase
        .from('regalos_genericos')
        .delete()
        .eq('id', currentItem.id);
      
      if (error) throw error;
      
      toast({
        title: language === 'en' ? "Item deleted" : "Item eliminado",
        description: language === 'en' ? "The item has been deleted successfully" : "El item ha sido eliminado exitosamente",
      });
      
      setCurrentItem(null);
      setIsDeleteDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error deleting item" : "Error al eliminar el item",
        description: error.message,
      });
    }
  };
  
  const handleAddClick = () => {
    setCurrentItem(null);
    setNewItemName('');
    setNewItemDescription('');
    setIsEditing(false);
    setIsDialogOpen(true);
  };
  
  const handleEditClick = (item: ItemGenerico) => {
    setCurrentItem(item);
    setNewItemName(item.nombre);
    setNewItemDescription(item.descripcion || '');
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (item: ItemGenerico) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Manage Generic Items' : 'Administrar Ítems Genéricos'}
          </h1>
          
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Add Item' : 'Agregar Ítem'}
          </Button>
        </div>
        
        <Tabs defaultValue="itemsGenericos" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full max-w-md grid-cols-1">
            <TabsTrigger value="itemsGenericos">
              {language === 'en' ? 'Generic Gifts' : 'Regalos Genéricos'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="itemsGenericos" className="space-y-4 mt-4">
            {loading ? (
              <div>
                {language === 'en' ? 'Loading...' : 'Cargando...'}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  {language === 'en' ? 'No items found' : 'No se encontraron ítems'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div>
                      <h3 className="font-medium">{item.nombre}</h3>
                      {item.descripcion && (
                        <p className="text-sm text-muted-foreground mt-1">{item.descripcion}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing 
                  ? (language === 'en' ? 'Edit Item' : 'Editar Ítem')
                  : (language === 'en' ? 'Add New Item' : 'Agregar Nuevo Ítem')
                }
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="item-name" className="text-sm font-medium">
                  {language === 'en' ? 'Name' : 'Nombre'}
                </label>
                <Input
                  id="item-name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={language === 'en' ? 'Enter item name' : 'Ingrese nombre del ítem'}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="item-description" className="text-sm font-medium">
                  {language === 'en' ? 'Description' : 'Descripción'}
                </label>
                <Textarea
                  id="item-description"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder={language === 'en' ? 'Enter item description (optional)' : 'Ingrese descripción del ítem (opcional)'}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {language === 'en' ? 'Cancel' : 'Cancelar'}
              </Button>
              <Button onClick={isEditing ? handleUpdateItem : handleCreateItem}>
                {isEditing 
                  ? (language === 'en' ? 'Update' : 'Actualizar')
                  : (language === 'en' ? 'Create' : 'Crear')
                }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'en' ? 'Confirm Deletion' : 'Confirmar Eliminación'}
              </DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Are you sure you want to delete this item? This action cannot be undone.'
                  : '¿Está seguro que desea eliminar este ítem? Esta acción no se puede deshacer.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                {language === 'en' ? 'Cancel' : 'Cancelar'}
              </Button>
              <Button variant="destructive" onClick={handleDeleteItem}>
                {language === 'en' ? 'Delete' : 'Eliminar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ItemsPage;
