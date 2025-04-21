import React, { useState } from 'react';
import { useTags, Tag, TagCategory } from '@/hooks/use-tags';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const TagsTable = () => {
  const { tags, categories, loading } = useTags();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Tag | TagCategory | null>(null);
  const [deleteType, setDeleteType] = useState<'tag' | 'category'>('tag');
  const [activeTab, setActiveTab] = useState('tags');
  
  // Form states
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#1ABC9C');
  const [tagCategory, setTagCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form states
  const resetTagForm = () => {
    setTagName('');
    setTagColor('#1ABC9C');
    setTagCategory('');
    setEditingItem(null);
  };

  const resetCategoryForm = () => {
    setCategoryName('');
    setCategoryDescription('');
    setSortOrder('0');
    setEditingItem(null);
  };

  // Open edit tag dialog
  const handleEditTag = (tag: Tag) => {
    setTagName(tag.name);
    setTagColor(tag.color);
    setTagCategory(tag.category_id || '');
    setEditingItem(tag);
    setIsTagDialogOpen(true);
  };

  // Open edit category dialog
  const handleEditCategory = (category: TagCategory) => {
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    setSortOrder(category.sort_order?.toString() || '0');
    setEditingItem(category);
    setIsCategoryDialogOpen(true);
  };

  // Prepare to delete an item
  const handleDeleteItem = (type: 'tag' | 'category', item: Tag | TagCategory) => {
    setDeleteType(type);
    setEditingItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Delete the selected item
  const confirmDelete = async () => {
    if (!editingItem) return;
    
    setIsSubmitting(true);
    
    try {
      if (deleteType === 'tag') {
        const { error } = await supabase
          .from('tags')
          .delete()
          .eq('id', editingItem.id);
          
        if (error) throw error;
        
        toast({
          title: "Tag deleted",
          description: "The tag has been successfully deleted.",
        });
      } else {
        const { error } = await supabase
          .from('tag_categories')
          .delete()
          .eq('id', editingItem.id);
          
        if (error) throw error;
        
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted.",
        });
      }
      
      // Close dialog and refresh data
      setIsDeleteDialogOpen(false);
      setEditingItem(null);
      // The useTags hook will reload data on the next render
      
    } catch (error: any) {
      console.error('Error deleting item:', error);
      toast({
        variant: "destructive",
        title: "Error deleting item",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle tag form submission
  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagName || !tagColor) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editingItem) {
        // Update existing tag
        const { error } = await supabase
          .from('tags')
          .update({
            name: tagName,
            color: tagColor,
            category_id: tagCategory || null
          })
          .eq('id', editingItem.id);
          
        if (error) throw error;
        
        toast({
          title: "Tag updated",
          description: "The tag has been successfully updated.",
        });
      } else {
        // Create new tag
        const { error } = await supabase
          .from('tags')
          .insert({
            name: tagName,
            color: tagColor,
            category_id: tagCategory || null
          });
          
        if (error) throw error;
        
        toast({
          title: "Tag created",
          description: "The new tag has been successfully created.",
        });
      }
      
      // Close dialog and reset form
      setIsTagDialogOpen(false);
      resetTagForm();
      // The useTags hook will reload data on the next render
      
    } catch (error: any) {
      console.error('Error saving tag:', error);
      toast({
        variant: "destructive",
        title: "Error saving tag",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle category form submission
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editingItem) {
        // Update existing category
        const { error } = await supabase
          .from('tag_categories')
          .update({
            name: categoryName,
            description: categoryDescription || null,
            sort_order: parseInt(sortOrder) || 0
          })
          .eq('id', editingItem.id);
          
        if (error) throw error;
        
        toast({
          title: "Category updated",
          description: "The category has been successfully updated.",
        });
      } else {
        // Create new category
        const { error } = await supabase
          .from('tag_categories')
          .insert({
            name: categoryName,
            description: categoryDescription || null,
            sort_order: parseInt(sortOrder) || 0
          });
          
        if (error) throw error;
        
        toast({
          title: "Category created",
          description: "The new category has been successfully created.",
        });
      }
      
      // Close dialog and reset form
      setIsCategoryDialogOpen(false);
      resetCategoryForm();
      // The useTags hook will reload data on the next render
      
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        variant: "destructive",
        title: "Error saving category",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tags data...</div>;
  }

  return (
    <div>
      <Tabs defaultValue="tags" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <div>
            {activeTab === 'tags' ? (
              <Button onClick={() => { resetTagForm(); setIsTagDialogOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Tag
              </Button>
            ) : (
              <Button onClick={() => { resetCategoryForm(); setIsCategoryDialogOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="tags" className="mt-0">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No tags found. Create your first tag!
                    </TableCell>
                  </TableRow>
                ) : (
                  tags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell>
                        <div 
                          className="h-6 w-6 rounded" 
                          style={{ backgroundColor: tag.color }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{tag.name}</TableCell>
                      <TableCell>{tag.category_name || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditTag(tag)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteItem('tag', tag)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No categories found. Create your first category!
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description || '-'}</TableCell>
                      <TableCell>{category.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteItem('category', category)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
            <DialogDescription>
              {editingItem 
                ? 'Make changes to the existing tag.' 
                : 'Create a new tag for categorizing blog posts.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleTagSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tagName">Tag Name</Label>
                <Input
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g., Travel Tips"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tagColor">Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="tagColor"
                    type="color"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    placeholder="#HEX"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tagCategory">Category</Label>
                <Select value={tagCategory} onValueChange={setTagCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsTagDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Tag'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>
              {editingItem 
                ? 'Make changes to the existing category.' 
                : 'Create a new category for organizing tags.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Travel Destinations"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="categoryDescription">Description (Optional)</Label>
                <Input
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Brief description of this category"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  min="0"
                />
                <p className="text-sm text-muted-foreground">
                  Lower numbers will appear first in lists
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCategoryDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteType === 'tag' 
                ? 'This will permanently delete this tag and remove it from all blog posts.' 
                : 'This will permanently delete this category. Any tags in this category will no longer be categorized.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TagsTable;
