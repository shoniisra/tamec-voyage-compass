
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';

// Note: In a real implementation, you would integrate a rich text editor like TipTap, Quill, etc.
// For this example, we'll use a textarea as a placeholder

const blogFormSchema = z.object({
  title_en: z.string().min(1, "English title is required"),
  title_es: z.string().min(1, "Spanish title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt_en: z.string().min(1, "English excerpt is required"),
  excerpt_es: z.string().min(1, "Spanish excerpt is required"),
  content_en: z.string().min(1, "English content is required"),
  content_es: z.string().min(1, "Spanish content is required"),
  category_en: z.string().min(1, "English category is required"),
  category_es: z.string().min(1, "Spanish category is required"),
  cover_image: z.string().min(1, "Cover image URL is required"),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogPostFormProps {
  post?: BlogPost;
  isLoading: boolean;
  onSave: (data: BlogFormValues) => Promise<void>;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, isLoading, onSave }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("english");
  const isEditing = !!post;

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title_en: post?.title_en || '',
      title_es: post?.title_es || '',
      slug: post?.slug || '',
      excerpt_en: post?.excerpt_en || '',
      excerpt_es: post?.excerpt_es || '',
      content_en: post?.content_en || '',
      content_es: post?.content_es || '',
      category_en: post?.category_en || '',
      category_es: post?.category_es || '',
      cover_image: post?.cover_image || '',
    },
  });



  // Handle form submission
  const onSubmit = async (data: BlogFormValues) => {
    try {
      await onSave(data);
      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "The blog post has been successfully updated." 
          : "The blog post has been successfully created.",
      });
      navigate('/admin/blog/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save blog post. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/blog/posts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="post-url-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                        {field.value && (
                          <div className="mt-2 aspect-video rounded-md overflow-hidden bg-muted">
                            <img 
                              src={field.value} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="spanish">Spanish</TabsTrigger>
                </TabsList>

                <TabsContent value="english" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="title_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (English)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter post title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category (English)</FormLabel>
                            <FormControl>
                              <Input placeholder="Category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt (English)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief summary of the post"
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content_en"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content (English)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your post content here"
                                className="min-h-[300px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="spanish" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="title_es"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (Spanish)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter post title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category_es"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category (Spanish)</FormLabel>
                            <FormControl>
                              <Input placeholder="Category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt_es"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt (Spanish)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief summary of the post"
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content_es"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content (Spanish)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your post content here"
                                className="min-h-[300px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/blog/posts')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogPostForm;
