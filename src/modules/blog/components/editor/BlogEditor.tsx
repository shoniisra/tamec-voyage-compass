import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Transforms, Editor, Element, Descendant } from 'slate';
import isUrl from 'is-url';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
  ImageIcon as ImageIconComponent,
  Pilcrow,
  TextCursorInput,
  Code2,
  ImagePlus,
  Type,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Define custom types for elements
export type BlockQuoteElement = {
  type: 'block-quote'
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  children: Descendant[]
}

export type EditableVoidElement = {
  type: 'editable-void'
  children: Descendant[]
}

export type HeadingElement = {
  type: 'heading-one' | 'heading-two'
  children: Descendant[]
}

export type ImageElement = {
  type: 'image'
  url: string
  alt: string | null
  children: Descendant[]
}

export type LinkElement = {
  type: 'link'
  url: string
  children: Descendant[]
}

export type ListItemElement = {
  type: 'list-item'
  children: Descendant[]
}

export type NumberedListElement = {
  type: 'numbered-list'
  children: Descendant[]
}

export type ParagraphElement = {
  type: 'paragraph'
  children: Descendant[]
}

export type CodeElement = {
  type: 'code'
  children: Descendant[]
}

// Union type for all custom elements
export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | ImageElement
  | LinkElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement
  | CodeElement

// Define custom types for text nodes
export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const BlogEditor = ({ initialValue, onChange }: { initialValue: Descendant[], onChange: (value: Descendant[]) => void }) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const router = useRouter();
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const debouncedValue = useDebounce(value, 500);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);
  
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'block-quote':
        return <BlockQuoteElementComponent {...props} />
      case 'bulleted-list':
        return <BulletedListElementComponent {...props} />
      case 'check-list-item':
        return <CheckListItemElementComponent {...props} />
      case 'code':
        return <CodeElementComponent {...props} />
      case 'heading-one':
        return <HeadingElementComponent {...props} />;
      case 'heading-two':
        return <HeadingTwoElementComponent {...props} />;
      case 'image':
        return <ImageElementComponent {...props} />
      case 'link':
        return <LinkElementComponent {...props} />
      case 'list-item':
        return <ListItemElementComponent {...props} />
      case 'numbered-list':
        return <NumberedListElementComponent {...props} />
      default:
        return <ParagraphElementComponent {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, []);

  const insertImage = (editor: Editor, url: string, alt: string | null = null) => {
    const text = { text: '' }
    const image: ImageElement = { type: 'image', url, alt, children: [text] }
    Editor.insertNode(editor, image)
  }

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.log('ERROR', error);
        toast({
          variant: "destructive",
          title: "Ups! There was an error.",
          description: "Failed to upload image. Please try again.",
        });
        return null;
      } else {
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${filePath}`;
        return imageUrl;
      }
    } catch (error) {
      console.log('error', error);
      toast({
        variant: "destructive",
        title: "Ups! There was an error.",
        description: "Failed to upload image. Please try again.",
      });
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setImageUrl(imageUrl);
        setIsDialogOpen(true);
      }
    }
  };

  const confirmImage = () => {
    insertImage(editor, imageUrl, imageAlt);
    setIsDialogOpen(false);
    setImageUrl('');
    setImageAlt('');
  };

  const imageFormSchema = z.object({
    alt: z.string().optional(),
  })

  type ImageFormValues = z.infer<typeof imageFormSchema>

  const imageForm = useForm<ImageFormValues>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      alt: "",
    },
  })

  function onSubmit(data: ImageFormValues) {
    setImageAlt(data.alt);
    confirmImage();
    imageForm.reset();
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-start gap-2 py-2 border-b">
          <MarkButton
            format="bold"
            icon={<Bold className="h-4 w-4" />}
            title={language === 'en' ? 'Bold' : 'Negrita'}
          />
          <MarkButton
            format="italic"
            icon={<Italic className="h-4 w-4" />}
            title={language === 'en' ? 'Italic' : 'Itálica'}
          />
          <MarkButton
            format="underline"
            icon={<Underline className="h-4 w-4" />}
            title={language === 'en' ? 'Underline' : 'Subrayado'}
          />
          <MarkButton
            format="code"
            icon={<Code className="h-4 w-4" />}
            title={language === 'en' ? 'Code' : 'Código'}
          />
          <BlockButton
            format="heading-one"
            icon={<Heading1 className="h-4 w-4" />}
            title={language === 'en' ? 'Heading 1' : 'Título 1'}
          />
          <BlockButton
            format="heading-two"
            icon={<Heading2 className="h-4 w-4" />}
            title={language === 'en' ? 'Heading 2' : 'Título 2'}
          />
          <BlockButton
            format="block-quote"
            icon={<Quote className="h-4 w-4" />}
            title={language === 'en' ? 'Quote' : 'Cita'}
          />
          <BlockButton
            format="bulleted-list"
            icon={<List className="h-4 w-4" />}
            title={language === 'en' ? 'Bulleted List' : 'Lista'}
          />
          <BlockButton
            format="numbered-list"
            icon={<ListOrdered className="h-4 w-4" />}
            title={language === 'en' ? 'Numbered List' : 'Lista Numerada'}
          />
          <Dialog>
            <DialogTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === 'en' ? 'Image' : 'Imagen'}
                  </TooltipContent>
                </Tooltip>
              </TooltipTrigger>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{language === 'en' ? 'Insert image' : 'Insertar imagen'}</DialogTitle>
                <DialogDescription>
                  {language === 'en' ? 'Upload an image from your computer.' : 'Sube una imagen desde tu ordenador.'}
                </DialogDescription>
              </DialogHeader>
              <Form {...imageForm}>
                <form onSubmit={imageForm.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="name">{language === 'en' ? 'Image' : 'Imagen'}</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <Label htmlFor="image" className="cursor-pointer">
                        {language === 'en' ? 'Select image' : 'Seleccionar imagen'}
                      </Label>
                    </Button>
                  </div>
                  <FormField
                    control={imageForm.control}
                    name="alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? 'Alt' : 'Texto alternativo'}</FormLabel>
                        <FormControl>
                          <Input placeholder={language === 'en' ? 'Alt text' : 'Texto alternativo'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">{language === 'en' ? 'Insert' : 'Insertar'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Editable
            placeholder={language === 'en' ? 'Enter some rich text…' : 'Escribe algo…'}
            className="h-full p-4 outline-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>
    </>
  )
}

const BlockQuoteElementComponent = (props: any) => {
  return (
    <blockquote>{props.children}</blockquote>
  )
}

const BulletedListElementComponent = (props: any) => {
  return (
    <ul className="list-disc pl-5">{props.children}</ul>
  )
}

const CheckListItemElementComponent = (props: any) => {
  return (
    <li className="flex items-center">
      <input type="checkbox" checked={props.element.checked} readOnly />
      <span className="ml-2">{props.children}</span>
    </li>
  )
}

const CodeElementComponent = (props: any) => {
  return (
    <pre>
      <code className="bg-gray-100 p-2 rounded-md">{props.children}</code>
    </pre>
  )
}

const HeadingElementComponent = (props: any) => {
  return (
    <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">{props.children}</h1>
  )
}

const HeadingTwoElementComponent = (props: any) => {
  return (
    <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">{props.children}</h2>
  )
}

const ImageElementComponent = (props: any) => {
  const { element, attributes, children } = props
  return (
    <div {...attributes}>
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={element.url}
            alt={element.alt}
            className="rounded-md object-cover"
          />
        </AspectRatio>
        {children}
      </div>
      {element.alt && (
        <div className="text-sm text-muted-foreground">
          {element.alt}
        </div>
      )}
    </div>
  )
}

const LinkElementComponent = (props: any) => {
  const { element, attributes, children } = props
  return (
    <a href={element.url} {...attributes}>
      {children}
    </a>
  )
}

const ListItemElementComponent = (props: any) => {
  return (
    <li>{props.children}</li>
  )
}

const NumberedListElementComponent = (props: any) => {
  return (
    <ol className="list-decimal pl-5">{props.children}</ol>
  )
}

const ParagraphElementComponent = (props: any) => {
  return (
    <p className="scroll-m-20 leading-7 [&:not(:first-child)]:mt-6">{props.children}</p>
  )
}

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}

const MarkButton = ({ format, icon, title }: { format: string, icon: React.ReactNode, title: string }) => {
  const editor = useSlate()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const isActive = isMarkActive(editor, format)
              if (isActive) {
                Editor.removeMark(editor, format)
              } else {
                Editor.addMark(editor, format, true)
              }
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const BlockButton = ({ format, icon, title }: { format: string, icon: React.ReactNode, title: string }) => {
  const editor = useSlate()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const isActive = isBlockActive(editor, format)
              Transforms.setNodes(
                editor,
                { type: isActive ? 'paragraph' : format },
                { match: n => Editor.isBlock(editor, n), split: false }
              )
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)

  return marks ? marks[format] === true : false
}

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  })

  return !!match
}

const useSlate = () => {
  return React.useContext(SlateContext) as ReactEditor
}

const SlateContext = React.createContext<ReactEditor | null>(null)

export default BlogEditor;
