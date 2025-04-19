import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Heading1, Heading2, Heading3, Image, Italic, Link as LinkIcon, List, ListOrdered, Quote, Underline, Undo, Redo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { enUS, es } from 'date-fns/locale';
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays } from 'date-fns';
import { DateRange } from "react-day-picker"
import { isURL } from '@/lib/utils';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const BlogEditor = ({ initialContent }: { initialContent: any }) => {
  const { t, language } = useLanguage();
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(initialContent ? JSON.parse(initialContent) : initialValue);
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
	const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialContent) {
      setValue(JSON.parse(initialContent));
    }
  }, [initialContent]);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const handleChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadCoverImage = async () => {
    if (!coverImage) {
      toast({
        title: t('Please select a cover image'),
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSaving(true);
      const fileExt = coverImage.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(filePath, coverImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      const imageUrl = `https://hnjvqihlstlgpywbqgno.supabase.co/storage/v1/object/public/${data.Key}`;
      setCoverImageUrl(imageUrl);
      toast({
        title: t('Cover image uploaded successfully'),
      });
    } catch (error: any) {
      console.error('Error uploading cover image:', error);
      toast({
        title: t('Failed to upload cover image'),
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !slug || !value || !coverImageUrl) {
      toast({
        title: t('Please fill all required fields'),
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([
          {
            title: title,
            title_en: titleEn,
            slug: slug,
            content: value,
            cover_image: coverImageUrl,
          },
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: t('Blog post created successfully'),
      });
      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      toast({
        title: t('Failed to create blog post'),
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUndo = () => {
    editor.undo();
  };

  const handleRedo = () => {
    editor.redo();
  };

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="title">{t('Title')}</Label>
        <Input
          type="text"
          id="title"
          placeholder={t('Enter title')}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="titleEn">{t('Title in English')}</Label>
        <Input
          type="text"
          id="titleEn"
          placeholder={t('Enter title in English')}
          value={titleEn}
          onChange={e => setTitleEn(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="slug">{t('Slug')}</Label>
        <Input
          type="text"
          id="slug"
          placeholder={t('Enter slug')}
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="coverImage">{t('Cover Image')}</Label>
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            id="coverImage"
            accept="image/*"
            className="hidden"
            onChange={handleChangeCoverImage}
            ref={fileInputRef}
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            {t('Select Image')}
          </Button>
          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt="Cover"
              className="w-20 h-20 object-cover rounded"
            />
          )}
          <Button onClick={handleUploadCoverImage} disabled={isSaving}>
            {isSaving ? t('Uploading...') : t('Upload')}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Toolbar editor={editor} language={language} />
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={t('Enter some rich text…')}
            spellCheck
            autoFocus
          />
        </Slate>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleCreatePost} disabled={isSaving}>
          {isSaving ? t('Saving...') : t('Create Post')}
        </Button>
      </div>
    </div>
  );
};

const Toolbar = ({ editor, language }: { editor: any, language: string }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <FormatButton editor={editor} format="bold" icon={<Bold className="h-4 w-4" />} />
      <FormatButton editor={editor} format="italic" icon={<Italic className="h-4 w-4" />} />
      <FormatButton editor={editor} format="underline" icon={<Underline className="h-4 w-4" />} />
      <FormatButton editor={editor} format="code" icon={<Code className="h-4 w-4" />} />
      <BlockButton editor={editor} format="heading-one" icon={<Heading1 className="h-4 w-4" />} />
      <BlockButton editor={editor} format="heading-two" icon={<Heading2 className="h-4 w-4" />} />
      <BlockButton editor={editor} format="heading-three" icon={<Heading3 className="h-4 w-4" />} />
      <BlockButton editor={editor} format="block-quote" icon={<Quote className="h-4 w-4" />} />
      <BlockButton editor={editor} format="numbered-list" icon={<ListOrdered className="h-4 w-4" />} />
      <BlockButton editor={editor} format="bulleted-list" icon={<List className="h-4 w-4" />} />
      <AlignButton editor={editor} format="align-left" icon={<AlignLeft className="h-4 w-4" />} />
      <AlignButton editor={editor} format="align-center" icon={<AlignCenter className="h-4 w-4" />} />
      <AlignButton editor={editor} format="align-right" icon={<AlignRight className="h-4 w-4" />} />
      <LinkButton editor={editor} icon={<LinkIcon className="h-4 w-4" />} language={language} />
      <ImageButton editor={editor} icon={<Image className="h-4 w-4" />} language={language} />
      <UndoRedoButtons editor={editor} />
    </div>
  );
};

const UndoRedoButtons = ({ editor }: { editor: any }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.undo()}
        disabled={editor.history.undos.length === 0}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.redo()}
        disabled={editor.history.redos.length === 0}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

const LinkButton = ({ editor, icon, language }: { editor: any, icon: any, language: string }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleConfirm = () => {
    if (isURL(url)) {
      insertLink(editor, url);
      setIsOpen(false);
      setUrl('');
    } else {
      alert(t('Please enter a valid URL.'));
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        {icon}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Insert Link')}</DialogTitle>
            <DialogDescription>
              {t('Enter the URL to link to.')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                {t('URL')}
              </Label>
              <Input
                type="url"
                id="url"
                placeholder="https://example.com"
                className="col-span-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleConfirm}>{t('Confirm')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ImageButton = ({ editor, icon, language }: { editor: any, icon: any, language: string }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleConfirm = () => {
    if (isURL(url)) {
      insertImage(editor, url, alt);
      setIsOpen(false);
      setUrl('');
      setAlt('');
    } else {
      alert(t('Please enter a valid URL.'));
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        {icon}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Insert Image')}</DialogTitle>
            <DialogDescription>
              {t('Enter the URL of the image and alt text.')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                {t('URL')}
              </Label>
              <Input
                type="url"
                id="url"
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alt" className="text-right">
                {t('Alt Text')}
              </Label>
              <Input
                type="text"
                id="alt"
                placeholder={t('Image description')}
                className="col-span-3"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleConfirm}>{t('Confirm')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FormatButton = ({ editor, format, icon }: { editor: any, format: any, icon: any }) => {
  const isActive = isMarkActive(editor, format);
  return (
    <Button
      variant="outline"
      size="icon"
      active={isActive}
      onClick={() => toggleMark(editor, format)}
    >
      {icon}
    </Button>
  );
};

const BlockButton = ({ editor, format, icon }: { editor: any, format: any, icon: any }) => {
  const isActive = isBlockActive(editor, format);
  return (
    <Button
      variant="outline"
      size="icon"
      active={isActive}
      onClick={() => toggleBlock(editor, format)}
    >
      {icon}
    </Button>
  );
};

const AlignButton = ({ editor, format, icon }: { editor: any, format: any, icon: any }) => {
  const isActive = isAlignActive(editor, format);
  return (
    <Button
      variant="outline"
      size="icon"
      active={isActive}
      onClick={() => toggleAlign(editor, format)}
    >
      {icon}
    </Button>
  );
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'align-left':
      return <div style={{ textAlign: 'left' }} {...attributes}>{children}</div>;
    case 'align-center':
      return <div style={{ textAlign: 'center' }} {...attributes}>{children}</div>;
    case 'align-right':
      return <div style={{ textAlign: 'right' }} {...attributes}>{children}</div>;
    case 'link':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    case 'image':
      return (
        <img
          src={element.url}
          alt={element.alt}
          style={{ maxWidth: '100%', height: 'auto' }}
          {...attributes}
        />
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor: any, format: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [block] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!block;
};

const isAlignActive = (editor: any, format: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [block] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!block;
};

const toggleMark = (editor: any, format: any) => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = ['numbered-list', 'bulleted-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['numbered-list', 'bulleted-list', 'block-quote', 'heading-one', 'heading-two', 'heading-three'].includes(n.type as string),
    split: true,
  });

  let newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block);
  }
};

const toggleAlign = (editor: any, format: any) => {
  const isActive = isAlignActive(editor, format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['align-left', 'align-center', 'align-right'].includes(n.type as string),
    split: true,
  });

  if (!isActive) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block);
  }
};

const insertLink = (editor: any, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const wrapLink = (editor: any, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: Link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const insertImage = (editor: any, url: string, alt: string) => {
  const image: ImageElement = {
    type: 'image',
    url,
    alt,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, image);
};

const unwrapLink = (editor: any) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    split: true,
  });
};

const isLinkActive = (editor: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [link] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });

  return !!link;
};

export type BlockQuote = {
  type: 'block-quote'
  children: CustomText[]
}

export type BulletedList = {
  type: 'bulleted-list'
  children: CustomText[]
}

export type HeadingOne = {
  type: 'heading-one'
  children: CustomText[]
}

export type HeadingTwo = {
  type: 'heading-two'
  children: CustomText[]
}

export type HeadingThree = {
  type: 'heading-three'
  children: CustomText[]
}

export type ListItem = {
  type: 'list-item'
  children: CustomText[]
}

export type NumberedList = {
  type: 'numbered-list'
  children: CustomText[]
}

export type AlignLeft = {
  type: 'align-left'
  children: CustomText[]
}

export type AlignCenter = {
  type: 'align-center'
  children: CustomText[]
}

export type AlignRight = {
  type: 'align-right'
  children: CustomText[]
}

export type Link = {
  type: 'link'
  url: string
  children: CustomText[]
}

export type ImageElement = {
  type: 'image'
  url: string
  alt: string
  children: CustomText[]
}

export type Paragraph = {
  type: 'paragraph'
  children: CustomText[]
}

export type CustomElement =
  | BlockQuote
  | BulletedList
  | HeadingOne
  | HeadingTwo
  | HeadingThree
  | ListItem
  | NumberedList
  | AlignLeft
  | AlignCenter
  | AlignRight
  | Link
  | ImageElement
  | Paragraph

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

import { BaseEditor, Range } from 'slate';
import { ReactEditor } from 'slate-react';

export default BlogEditor;
