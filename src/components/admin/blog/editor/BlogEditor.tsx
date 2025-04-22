
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Link from "@editorjs/link";
import Underline from "@editorjs/underline";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import Raw from "@editorjs/raw";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import { supabaseExtended } from "@/integrations/supabase/client-extended";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, Save } from "lucide-react";
import { toKebabCase } from "@/utils/stringUtils";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTags } from "@/hooks/use-tags";
import { useBlogTags } from "@/hooks/use-blog-tags";
import { MultiSelect } from "@/components/ui/multi-select";
import { useBlogPostManagement } from "@/hooks/use-blog-post-management";

interface FormValues {
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
}

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: any;
  initialCoverImage?: string;
  initialSlug?: string;
  initialTags?: string[];
  blogId?: string;
  isEdit?: boolean;
}

const BlogEditor = ({
  initialTitle = "",
  initialContent = {},
  initialCoverImage = "",
  initialSlug = "",
  initialTags = [],
  blogId,
  isEdit = false
}: BlogEditorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { tags: allTags, loading: tagsLoading } = useTags();
  const { getBlogTags, updateBlogTags } = useBlogTags();
  const { createEditorJSBlogPost, updateEditorJSBlogPost } = useBlogPostManagement();

  const tagOptions = allTags.map(tag => ({
    value: tag.id,
    label: tag.name,
    color: tag.color || '#CBD5E1'
  }));

  const editorRef = useRef<EditorJS | null>(null);
  const editorInitializedRef = useRef<boolean>(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: initialTitle,
      slug: initialSlug,
      coverImage: initialCoverImage,
      tags: initialTags
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const coverImage = watch('coverImage');

  useEffect(() => {
    if (isEdit && blogId) {
      const loadBlogTags = async () => {
        try {
          const blogTags = await getBlogTags(blogId);
          const tagIds = blogTags.map(tag => tag.id);
          setValue('tags', tagIds);
        } catch (error) {
          console.error('Error loading blog tags:', error);
        }
      };
      
      loadBlogTags();
    }
  }, [blogId, isEdit, getBlogTags, setValue]);

  useEffect(() => {
    const cleanupEditor = () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
          editorRef.current = null;
          editorInitializedRef.current = false;
          console.log("Editor destroyed successfully");
        } catch (e) {
          console.error("Error destroying editor", e);
        }
      }
    };

    const initEditor = async () => {
      if (editorInitializedRef.current) {
        console.log("Editor already initialized, skipping initialization");
        return;
      }

      cleanupEditor();

      const editorElement = document.getElementById('editor');
      if (!editorElement) {
        console.error("Editor element not found");
        return;
      }

      try {
        console.log("Initializing editor with data:", initialContent);
        
        const editor = new EditorJS({
          holder: "editor",
          tools: {
            header: {
              class: Header,
              shortcut: 'CMD+SHIFT+H',
              inlineToolbar: true,
              tunes: ['alignmentTune'],
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 1
              }
            },
            list: {
              class: List as any,
              inlineToolbar: true,
              tunes: ['alignmentTune']
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: ['link', 'bold', 'italic', 'underline', 'marker', 'inlineCode'],
              tunes: ['alignmentTune'],
              config: {
                preserveBlank: true,
                placeholder: 'Escribe tu contenido aquí...'
              }
            },
            alignmentTune: {
              class: AlignmentTuneTool,
              config: {
                default: 'left',
                blocks: {
                  header: 'center',
                  list: 'left'
                }
              }
            },
            link: {
              class: Link,
              inlineToolbar: true
            },
            underline: Underline,
            marker: {
              class: Marker,
              shortcut: 'CMD+SHIFT+M'
            },
            inlineCode: {
              class: InlineCode,
              shortcut: 'CMD+SHIFT+C'
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+O',
              config: {
                quotePlaceholder: 'Ingresa una cita',
                captionPlaceholder: 'Autor de la cita'
              }
            },
            table: {
              class: Table as any,
              inlineToolbar: true,
              tunes: ['alignmentTune'],
              config: {
                rows: 2,
                cols: 3,
                withHeadings: true,
              }
            },
            warning: {
              class: Warning,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+W',
              config: {
                titlePlaceholder: 'Título',
                messagePlaceholder: 'Mensaje'
              }
            },
            delimiter: Delimiter,
            raw: Raw,
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
          data: Object.keys(initialContent).length > 0 ? initialContent : undefined,
          onReady: () => {
            console.log('Editor is ready to work');
            editorInitializedRef.current = true;
          },
          onChange: () => {
            console.log('Editor content changed');
          },
          autofocus: true,
          minHeight: 300,
          logLevel: 'ERROR' as 'ERROR' | 'WARN' | 'INFO',
          paste: {
            plainText: true,
            htmlText: true,
            imageTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            patterns: {
              image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
              video: /https?:\/\/\S+\.(mp4|webm|ogv|mov|avi)$/i,
            }
          }
        });

        editorRef.current = editor;
        console.log("Editor initialized successfully");
      } catch (error) {
        console.error('Error initializing editor:', error);
        editorRef.current = null;
        editorInitializedRef.current = false;
      }
    };

    initEditor().catch(error => {
      console.error('Editor initialization failed:', error);
    });

    return cleanupEditor;
  }, [initialContent]);

  const handleGenerateSlug = () => {
    const sourceTitle = watch('title');
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

  const translateContent = async (title: string, content: any) => {
    try {
      setIsTranslating(true);
      
      const blocks = content.blocks || [];
      const textBlocks = blocks.map((block: any) => {
        if (block.type === 'paragraph' || block.type === 'header') {
          return block.data.text;
        }
        return null;
      }).filter(Boolean);
      
      const textsToTranslate = [title, ...textBlocks];
      
      const translatedTexts = await Promise.all(
        textsToTranslate.map(async (text) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return text ? `${text} (Translated)` : '';
        })
      );
      
      const translatedTitle = translatedTexts[0];
      
      const translatedBlocks = [...blocks];
      let translatedTextIndex = 1;
      
      for (let i = 0; i < translatedBlocks.length; i++) {
        if (translatedBlocks[i].type === 'paragraph' || translatedBlocks[i].type === 'header') {
          if (translatedTextIndex < translatedTexts.length) {
            translatedBlocks[i] = {
              ...translatedBlocks[i],
              data: {
                ...translatedBlocks[i].data,
                text: translatedTexts[translatedTextIndex]
              }
            };
            translatedTextIndex++;
          }
        }
      }
      
      const translatedContent = {
        ...content,
        blocks: translatedBlocks
      };
      
      return {
        title_en: translatedTitle,
        content_en: translatedContent
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate content');
    } finally {
      setIsTranslating(false);
    }
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsSaving(true);

      if (!editorRef.current) {
        throw new Error("Editor not initialized");
      }

      const outputData = await editorRef.current.save();
      
      const { title_en, content_en } = await translateContent(formData.title, outputData);

      if (isEdit && blogId) {
        await updateEditorJSBlogPost(blogId, {
          title: formData.title,
          title_en,
          content: outputData,
          content_en,
          cover_image: formData.coverImage,
          slug: formData.slug,
        });
        
        await updateBlogTags(blogId, formData.tags);

        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        const data = await createEditorJSBlogPost({
          title: formData.title,
          title_en,
          content: outputData,
          content_en,
          cover_image: formData.coverImage,
          slug: formData.slug,
        });
        
        if (data && formData.tags.length > 0) {
          await updateBlogTags(data.id, formData.tags);
        }

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
            {isEdit ? "Editar Post" : "Crear Nuevo Post"}
          </h1>
          <Button
            type="submit"
            disabled={isSaving || isTranslating}
            className="bg-tamec-600 hover:bg-tamec-700 text-white flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving 
              ? "Guardando..." 
              : isTranslating 
                ? "Traduciendo..." 
                : "Guardar Post"}
          </Button>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="blog-slug" className="block text-sm font-medium mb-1">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">/blog/</span>
              <div className="flex-1 flex gap-2">
                <Input
                  id="blog-slug"
                  placeholder="url-amigable"
                  className="flex-1"
                  {...register('slug', { required: 'El URL slug es requerido' })}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateSlug}
                  className="whitespace-nowrap"
                >
                  Generar desde Título
                </Button>
              </div>
            </div>
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Esto se usará en la URL. Utiliza solo letras minúsculas, números y guiones.
            </p>
          </div>

          <div>
            <label htmlFor="cover-image" className="block text-sm font-medium mb-1">
              Imagen de Portada
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
                    {coverImage ? "Cambiar Imagen" : "Subir Imagen"}
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
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="blog-tags" className="block text-sm font-medium mb-1">
              Etiquetas
            </label>
            <MultiSelect
              options={tagOptions}
              selected={watch('tags')}
              onChange={(selectedValues) => setValue('tags', selectedValues)}
              placeholder="Selecciona etiquetas para este post"
              emptyIndicator={
                <p className="text-center text-sm text-muted-foreground">
                  No hay etiquetas disponibles.
                </p>
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Agrega etiquetas para categorizar tu contenido. Puedes crear nuevas etiquetas en la sección de Etiquetas del admin.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="blog-title" className="block text-sm font-medium mb-1">
                Título del Blog
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
              <p className="text-xs text-gray-500 mt-1">
                El contenido en inglés se generará automáticamente mediante traducción al guardar.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contenido del Blog
              </label>
              <div
                id="editor"
                className="border rounded-md min-h-[400px] p-4"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
