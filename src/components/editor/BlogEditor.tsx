import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import { supabaseExtended } from "@/integrations/supabase/client-extended";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { toKebabCase } from "@/utils/stringUtils";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: any;
  initialCoverImage?: string;
  initialSlug?: string;
  blogId?: string;
  isEdit?: boolean;
}

const BlogEditor = ({ 
  initialTitle = "", 
  initialContent = {}, 
  initialCoverImage = "",
  initialSlug = "",
  blogId, 
  isEdit = false 
}: BlogEditorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const editorRef = useRef<EditorJS | null>(null);
  const editorInstanceRef = useRef<any>(null);
  const [title, setTitle] = useState(initialTitle);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [slug, setSlug] = useState(initialSlug);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if ((!slug || !isEdit) && title) {
      setSlug(toKebabCase(title));
    }
  }, [title, slug, isEdit]);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: {
            // @ts-ignore - EditorJS type definitions are not perfect
            class: List,
            inlineToolbar: true
          },
          image: {
            class: Image,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  try {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                    const filePath = `blog-images/${fileName}`;
                    
                    const { error: uploadError } = await supabaseExtended.storage
                      .from('blog-content')
                      .upload(filePath, file);
                      
                    if (uploadError) {
                      throw uploadError;
                    }
                    
                    const { data } = supabaseExtended.storage
                      .from('blog-content')
                      .getPublicUrl(filePath);
                      
                    return {
                      success: 1,
                      file: {
                        url: data.publicUrl
                      }
                    };
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    return {
                      success: 0,
                      file: {
                        url: null
                      }
                    };
                  }
                },
                async uploadByUrl(url: string) {
                  return {
                    success: 1,
                    file: {
                      url
                    }
                  };
                }
              }
            }
          }
        },
        data: initialContent
      });
      
      editorRef.current = editor;
      editorInstanceRef.current = editor;
    }

    // Cleanup
    return () => {
      if (editorInstanceRef.current) {
        try {
          editorInstanceRef.current.isReady.then(() => {
            editorInstanceRef.current.destroy();
            editorInstanceRef.current = null;
            editorRef.current = null;
          }).catch((e: any) => {
            console.error("Error destroying editor", e);
          });
        } catch (err) {
          console.error("Failed to cleanup editor instance", err);
        }
      }
    };
  }, [initialContent]);

  useEffect(() => {
    if (editorRef.current && initialContent && Object.keys(initialContent).length > 0) {
      editorRef.current.render(initialContent);
    }
  }, [initialContent]);

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `cover-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;
      
      const { error: uploadError } = await supabaseExtended.storage
        .from('blog-content')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabaseExtended.storage
        .from('blog-content')
        .getPublicUrl(filePath);
        
      setCoverImage(data.publicUrl);
      
      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading cover image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload cover image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your blog post",
        variant: "destructive"
      });
      return;
    }

    if (!slug.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL slug for your blog post",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      
      if (!editorRef.current) {
        throw new Error("Editor not initialized");
      }
      
      const outputData = await editorRef.current.save();
      
      if (isEdit && blogId) {
        // Update existing blog
        const { error } = await supabaseExtended
          .from('blogs')
          .update({ 
            title, 
            content: outputData as any,
            cover_image: coverImage,
            slug: slug,
            updated_at: new Date().toISOString()
          })
          .eq('id', blogId);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        // Create new blog
        const { error } = await supabaseExtended
          .from('blogs')
          .insert({ 
            title, 
            content: outputData as any,
            cover_image: coverImage,
            slug: slug,
            created_at: new Date().toISOString()
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Blog post saved successfully",
        });
      }
      
      navigate('/admin/blog/posts');
    } catch (error: any) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-tamec-600 hover:bg-tamec-700 text-white"
        >
          {isSaving ? "Saving..." : "Save Blog Post"}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="blog-title" className="block text-sm font-medium mb-1">
            Blog Title
          </label>
          <Input
            id="blog-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="blog-slug" className="block text-sm font-medium mb-1">
            URL Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">/blog/</span>
            <Input
              id="blog-slug"
              value={slug}
              onChange={(e) => setSlug(toKebabCase(e.target.value))}
              placeholder="url-friendly-slug"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This will be used in the URL. Use only lowercase letters, numbers, and hyphens.
          </p>
        </div>
        
        <div>
          <label htmlFor="cover-image" className="block text-sm font-medium mb-1">
            Cover Image
          </label>
          <div className="space-y-3">
            {coverImage && (
              <div className="relative rounded-md overflow-hidden border h-60 w-full bg-gray-100">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex gap-2">
              <label htmlFor="cover-image-upload" className="cursor-pointer">
                <div className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md inline-flex items-center transition-colors">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {coverImage ? "Change Cover Image" : "Upload Cover Image"}
                </div>
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              {coverImage && (
                <Button 
                  variant="outline" 
                  onClick={() => setCoverImage("")}
                  disabled={isUploading}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Blog Content
          </label>
          <div 
            id="editorjs" 
            className="border rounded-md min-h-[400px] p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
