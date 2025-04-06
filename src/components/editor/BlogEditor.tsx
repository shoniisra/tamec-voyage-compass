
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import { supabaseExtended } from "@/integrations/supabase/client-extended";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, Save } from "lucide-react";
import { toKebabCase } from "@/utils/stringUtils";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormValues {
  title: string;
  title_en: string;
  slug: string;
  coverImage: string;
}

interface BlogEditorProps {
  initialTitle?: string;
  initialTitle_en?: string;
  initialContent?: any;
  initialContent_en?: any;
  initialCoverImage?: string;
  initialSlug?: string;
  blogId?: string;
  isEdit?: boolean;
}

const BlogEditor = ({
  initialTitle = "",
  initialTitle_en = "",
  initialContent = {},
  initialContent_en = {},
  initialCoverImage = "",
  initialSlug = "",
  blogId,
  isEdit = false
}: BlogEditorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Create separate refs for Spanish and English editors
  const spanishEditorRef = useRef<EditorJS | null>(null);
  const englishEditorRef = useRef<EditorJS | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: initialTitle,
      title_en: initialTitle_en,
      slug: initialSlug,
      coverImage: initialCoverImage
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("spanish");

  const coverImage = watch('coverImage');
  // const title = watch('title');
  // const title_en = watch('title_en');

  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue('title', e.target.value);
  // };

  // const handleTitleEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue('title_en', e.target.value);
  // };

  // const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue('slug', e.target.value);
  // };

  // Initialize Spanish editor
  useEffect(() => {
    let editor: EditorJS | null = null;

    const initEditor = async () => {
      // Only attempt to destroy if the editor instance exists and is ready
      if (spanishEditorRef.current) {
        try {
          const isReady = await Promise.race([
            spanishEditorRef.current.isReady,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Editor not ready')), 1000))
          ]);

          if (isReady) {
            await spanishEditorRef.current.destroy();
          }
        } catch (e) {
          console.error("Editor cleanup skipped:", e);
        }
        spanishEditorRef.current = null;
      }

      // Create new editor instance with proper error handling
      try {
        editor = new EditorJS({
          holder: "spanish-editor",
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
              class: List as any,
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
          data: Object.keys(initialContent).length > 0 ? initialContent : {}
        });

        // Wait for editor to be ready before assigning to ref
        await editor.isReady;
        spanishEditorRef.current = editor;
      } catch (error) {
        console.error('Error initializing Spanish editor:', error);
        spanishEditorRef.current = null;
      }
    };

    // Initialize editor with error handling
    if (activeTab === "spanish") {
      initEditor().catch(error => {
        console.error('Spanish editor initialization failed:', error);
      });
    }

    return () => {
      if (editor) {
        editor.isReady.then(() => {
          editor?.destroy();
          if (activeTab === "spanish") {
            spanishEditorRef.current = null;
          }
        }).catch((e) => {
          console.error("Error destroying Spanish editor", e);
        });
      }
    };
  }, [initialContent, activeTab]);

  // Initialize English editor
  useEffect(() => {
    let editor: EditorJS | null = null;

    const initEditor = async () => {
      // Only attempt to destroy if the editor instance exists and is ready
      if (englishEditorRef.current) {
        try {
          const isReady = await Promise.race([
            englishEditorRef.current.isReady,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Editor not ready')), 1000))
          ]);

          if (isReady) {
            await englishEditorRef.current.destroy();
          }
        } catch (e) {
          console.error("Editor cleanup skipped:", e);
        }
        englishEditorRef.current = null;
      }

      // Create new editor instance with proper error handling
      try {
        editor = new EditorJS({
          holder: "english-editor",
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
              class: List as any,
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
          data: Object.keys(initialContent_en).length > 0 ? initialContent_en : {}
        });

        // Wait for editor to be ready before assigning to ref
        await editor.isReady;
        englishEditorRef.current = editor;
      } catch (error) {
        console.error('Error initializing English editor:', error);
        englishEditorRef.current = null;
      }
    };

    // Initialize editor with error handling
    if (activeTab === "english") {
      initEditor().catch(error => {
        console.error('English editor initialization failed:', error);
      });
    }

    return () => {
      if (editor) {
        editor.isReady.then(() => {
          editor?.destroy();
          if (activeTab === "english") {
            englishEditorRef.current = null;
          }
        }).catch((e) => {
          console.error("Error destroying English editor", e);
        });
      }
    };
  }, [initialContent_en, activeTab]);

  const handleGenerateSlug = () => {
    // Generate slug from Spanish title if available, otherwise from English title
    const sourceTitle = watch('title') || watch('title_en');
    setValue('slug', toKebabCase(sourceTitle));
    };

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

      setValue('coverImage', data.publicUrl);

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

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsSaving(true);

      if (!spanishEditorRef.current) {
        throw new Error("Spanish editor not initialized");
      }

      // Save Spanish content
      const spanishOutputData = await spanishEditorRef.current.save();
      const spanishContentData = spanishOutputData as any;

      // Save English content if available
      let englishContentData = {};
      if (englishEditorRef.current) {
        const englishOutputData = await englishEditorRef.current.save();
        englishContentData = englishOutputData as any;
      }

      if (isEdit && blogId) {
        const { error } = await supabaseExtended
          .from('blogs')
          .update({
            title: formData.title,
            title_en: formData.title_en,
            content: spanishContentData,
            content_en: englishContentData,
            cover_image: formData.coverImage,
            slug: formData.slug,
            updated_at: new Date().toISOString()
          })
          .eq('id', blogId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        const { error } = await supabaseExtended
          .from('blogs')
          .insert({
            title: formData.title,
            title_en: formData.title_en,
            content: spanishContentData,
            content_en: englishContentData,
            cover_image: formData.coverImage,
            slug: formData.slug,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-tamec-600 hover:bg-tamec-700 text-white flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Blog Post"}
          </Button>
        </div>

        <div className="space-y-4 mt-4">
          {/* URL Slug - Common for both languages */}
          <div>
            <label htmlFor="blog-slug" className="block text-sm font-medium mb-1">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">/blog/</span>
              <div className="flex-1 flex gap-2">
        
                <Input
                  id="blog-slug"
                  placeholder="url-friendly-slug"
                  className="flex-1"
                  {...register('slug', { required: 'URL slug is required' })}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateSlug}
                  className="whitespace-nowrap"
                >
                  Generate from Title
                </Button>
              </div>
            </div>
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This will be used in the URL. Use only lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Cover Image - Common for both languages */}
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
                    type="button"
                    variant="outline"
                    onClick={() => setValue('coverImage', '')}
                    disabled={isUploading}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Language Tabs */}
          <Tabs defaultValue="spanish" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="spanish">Español</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>

            {/* Spanish Content Tab */}
            <TabsContent value="spanish" className="space-y-4">
              <div>
                <label htmlFor="blog-title" className="block text-sm font-medium mb-1">
                  Título del Blog (Español)
                </label>
                <Input
                  id="blog-title"
                  placeholder="Ingresa el título del blog"
                  className="w-full"
                  {...register('title', { required: 'El título es requerido' })}
                />
                
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contenido del Blog (Español)
                </label>
                <div
                  id="spanish-editor"
                  className="border rounded-md min-h-[400px] p-4"
                />
              </div>
            </TabsContent>

            {/* English Content Tab */}
            <TabsContent value="english" className="space-y-4">
              <div>
                <label htmlFor="blog-title-en" className="block text-sm font-medium mb-1">
                  Blog Title (English)
                </label>
                <Input
                  id="blog-title-en"
                  placeholder="Enter blog title"
                  className="w-full"
                  {...register('title_en')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Blog Content (English)
                </label>
                <div
                  id="english-editor"
                  className="border rounded-md min-h-[400px] p-4"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
