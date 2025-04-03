
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: any;
  blogId?: string;
  isEdit?: boolean;
}

const BlogEditor = ({ initialTitle = "", initialContent = {}, blogId, isEdit = false }: BlogEditorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);

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
                    
                    const { error: uploadError } = await supabase.storage
                      .from('blog-content')
                      .upload(filePath, file);
                      
                    if (uploadError) {
                      throw uploadError;
                    }
                    
                    const { data } = supabase.storage
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
    }

    // Cleanup
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialContent]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your blog post",
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
        const { error } = await supabase
          .from('blogs')
          .update({ 
            title, 
            content: outputData,
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
        const { error } = await supabase
          .from('blogs')
          .insert([{ 
            title, 
            content: outputData,
            created_at: new Date().toISOString()
          }]);
          
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
