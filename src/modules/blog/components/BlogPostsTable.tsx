import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Post {
  id: string;
  title?: string;
  title_en?: string;
  title_es?: string;
  date?: string;
  created_at?: string;
  slug?: string;
  content?: any;
  isLegacy?: boolean;
}

interface BlogPostsTableProps {
  posts: Post[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

const BlogPostsTable: React.FC<BlogPostsTableProps> = ({ posts, isLoading, onDelete }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await onDelete(deleteId);
      setDeleteId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper to get the title based on post type
  const getPostTitle = (post: Post) => {
    // Legacy post from blog_posts table
    if (post.title_en || post.title_es) {
      return language === 'en' ? post.title_en : post.title_es;
    }
    // New post from blogs table
    return post.title;
  };

  // Helper to get the date based on post type
  const getPostDate = (post: Post) => {
    const dateStr = post.date || post.created_at;
    if (!dateStr) return 'Unknown date';
    return new Date(dateStr).toLocaleDateString();
  };

  // Helper to determine post type
  const isLegacyPost = (post: Post) => {
    return Boolean(post.title_en || post.title_es);
  };

  const getEditUrl = (post: Post) => {
    return isLegacyPost(post) 
      ? `/admin/blog/edit/${post.id}` 
      : `/admin/blog/edit/${post.id}`;
  };

  const getViewUrl = (post: Post) => {
    return `/blog/${post.slug || post.id}`;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading blog posts...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => navigate('/admin/blog/create')}>
          <Plus className="mr-2 h-4 w-4" />  Nuevo Artículo
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No blog posts found. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{getPostTitle(post)}</TableCell>
                  <TableCell>{getPostDate(post)}</TableCell>
                  <TableCell>
                    {isLegacyPost(post) ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                        Legacy
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        EditorJS
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.open(getViewUrl(post), '_blank')}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(getEditUrl(post))}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => setDeleteId(post.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              and remove all of its data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPostsTable;
