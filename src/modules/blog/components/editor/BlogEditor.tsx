import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlignLeft,
  AlignCenter,
  AlignJustify,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
  ImageIcon,
  GripVertical,
  Plus,
  Minus,
  Text,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useUploadThing } from "@/utils/uploadthing";

const BlogEditor = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<any>([]);
  const [url, setUrl] = useState('');
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState(50);
	const [imageRounded, setImageRounded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { startUpload } = useUploadThing("imageUploader");
  const { toast } = useToast();

  useEffect(() => {
    // Set initial value with a default paragraph if it's empty
    if (!value || value.length === 0) {
      setValue([{
        type: 'paragraph',
        children: [{ text: '' }],
      }]);
    }
  }, [value]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'block-quote':
        return <BlockQuoteElement {...props} />;
      case 'bulleted-list':
        return <BulletedListElement {...props} />;
      case 'numbered-list':
        return <NumberedListElement {...props} />;
      case 'list-item':
        return <ListItemElement {...props} />;
      case 'heading-one':
        return <HeadingOneElement {...props} />;
      case 'heading-two':
        return <HeadingTwoElement {...props} />;
      case 'heading-three':
        return <HeadingThreeElement {...props} />;
      case 'code':
        return <CodeElement {...props} />;
      case 'link':
        return <LinkElement {...props} />;
      case 'image':
        return <ImageElement {...props} />;
      case 'paragraph':
        return <ParagraphElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
  
    try {
      const result = await startUpload([file], {
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });
  
      if (result && result.length > 0) {
        const imageUrl = result[0].url;
        insertImage(editor, imageUrl);
        toast({
          title: "Image uploaded successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Could not upload image. Please try again.",
        });
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: e.message,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const insertImage = (editor: Editor, url: string) => {
    const text = { text: '' }
    const image: any = { type: 'image', url, children: [text], id: uuidv4() }
    Transforms.insertNodes(editor, image)
  };

  const insertLink = (editor: Editor, url: string) => {
    if (editor.selection) {
      wrapLink(editor, url)
    }
  };

  const isLinkActive = () => {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
  }

  const unwrapLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  }

  const wrapLink = (editor: Editor, url: string) => {
    if (isLinkActive()) {
      unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Editor.isCollapsed(selection)
    const link: any = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }
  }

  const toggleLink = () => {
    if (isLinkActive()) {
      unwrapLink(editor)
    } else {
      setIsLinkModalOpen(true);
    }
  }

  const handleConfirmLink = () => {
    insertLink(editor, url);
    setIsLinkModalOpen(false);
    setUrl('');
  };

  const handleCancelLink = () => {
    setIsLinkModalOpen(false);
    setUrl('');
  };

  const handleImageClick = (url: string) => {
		setSelectedImage(url);
		setImageWidth(50);
		setImageRounded(false);
	};

	const handleImageWidthChange = (value: number[]) => {
		setImageWidth(value[0]);
	};

	const handleImageRoundedChange = (checked: boolean) => {
		setImageRounded(checked);
	};

	const applyImageStyles = () => {
		if (!selectedImage) return;

		const nodes = Editor.nodes(editor, {
			match: n =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				n.type === 'image' &&
				n.url === selectedImage,
		});

		for (const [node, path] of nodes) {
			if (SlateElement.isElement(node) && node.type === 'image') {
				Transforms.setNodes(
					editor,
					{
						width: imageWidth,
						rounded: imageRounded,
					},
					{ at: path }
				);
			}
		}

		setSelectedImage(null);
	};

  const LIST_TYPES = ['numbered-list', 'bulleted-list']
  const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

  const isBlockActive = (editor: Editor, type: string, attribute: string = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [node] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n[attribute] === type,
    })
    return !!node
  }

  const isMarkActive = (editor: Editor, type: string) => {
    const marks = Editor.marks(editor) as any;
    return marks ? !!marks[type] : false
  }

  const toggleBlock = (editor: Editor, type: string, attribute: string = 'type') => {
    const isActive = isBlockActive(editor, type, attribute)
    const isList = LIST_TYPES.includes(type)

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type as string),
      split: true,
    })

    let newProperties: Partial<SlateElement>
    if (isActive) {
      newProperties = {
        type: 'paragraph',
      }
    } else if (isList) {
      newProperties = {
        type: 'list-item',
      }
    } else {
      newProperties = {
        type,
      }
    }

    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block: any = { type, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  const toggleMark = (editor: Editor, type: string) => {
    Editor.mark(editor, type)
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center p-2 border-b bg-gray-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark(editor, 'bold')}
                active={isMarkActive(editor, 'bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.bold')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark(editor, 'italic')}
                active={isMarkActive(editor, 'italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.italic')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark(editor, 'underline')}
                active={isMarkActive(editor, 'underline')}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.underline')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMark(editor, 'code')}
                active={isMarkActive(editor, 'code')}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.code')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLink}
                active={isLinkActive()}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.link')}</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>{t('editor.image')}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  {t('editor.uploadImage')}
                </Label>
                <Input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  onChange={(e: any) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {uploading ? (
                <DropdownMenuItem className="flex items-center gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>{t('editor.uploading')} ({uploadProgress}%)</span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'block-quote')}
                active={isBlockActive(editor, 'block-quote')}
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.quote')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'heading-one')}
                active={isBlockActive(editor, 'heading-one')}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.heading1')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'heading-two')}
                active={isBlockActive(editor, 'heading-two')}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.heading2')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'heading-three')}
                active={isBlockActive(editor, 'heading-three')}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.heading3')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'bulleted-list')}
                active={isBlockActive(editor, 'bulleted-list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.bulletList')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBlock(editor, 'numbered-list')}
                active={isBlockActive(editor, 'numbered-list')}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('editor.numberedList')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="p-4">
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
          <Editable
            placeholder={t('editor.placeholder')}
            spellCheck
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="focus:outline-none"
          />
        </Slate>
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('editor.insertLink')}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="defaultModal"
                  onClick={handleCancelLink}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <Input
                  type="url"
                  placeholder={t('editor.linkPlaceholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="flex items-center p-6 border-t rounded-b">
                <Button
                  className="bg-tamec-600 hover:bg-tamec-700 text-white mr-2"
                  onClick={handleConfirmLink}
                >
                  {t('editor.confirm')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancelLink}
                >
                  {t('editor.cancel')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Settings Modal */}
			{selectedImage && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
					<div className="relative p-4 w-full max-w-md h-auto">
						<div className="bg-white rounded-lg shadow relative">
							<div className="flex items-start justify-between p-4 border-b rounded-t">
								<h3 className="text-lg font-semibold text-gray-900">
									{t('editor.imageSettings')}
								</h3>
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
									onClick={() => setSelectedImage(null)}
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								</button>
							</div>
							<div className="p-6 space-y-6">
								<div className="space-y-2">
									<Label htmlFor="image-width">{t('editor.width')}: {imageWidth}%</Label>
									<Slider
										id="image-width"
										defaultValue={[imageWidth]}
										max={100}
										min={10}
										step={1}
										onValueChange={handleImageWidthChange}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label htmlFor="image-rounded">{t('editor.roundedCorners')}</Label>
									<Switch
										id="image-rounded"
										checked={imageRounded}
										onCheckedChange={handleImageRoundedChange}
									/>
								</div>
							</div>
							<div className="flex items-center p-6 border-t rounded-b">
								<Button
									className="bg-tamec-600 hover:bg-tamec-700 text-white mr-2"
									onClick={applyImageStyles}
								>
									{t('editor.apply')}
								</Button>
								<Button
									variant="ghost"
									onClick={() => setSelectedImage(null)}
								>
									{t('editor.cancel')}
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
    </div >
  );
};

const BlockQuoteElement = (props: any) => {
  return (
    <blockquote {...props.attributes}>
      {props.children}
    </blockquote>
  );
};

const BulletedListElement = (props: any) => {
  return (
    <ul {...props.attributes}>
      {props.children}
    </ul>
  );
};

const NumberedListElement = (props: any) => {
  return (
    <ol {...props.attributes}>
      {props.children}
    </ol>
  );
};

const ListItemElement = (props: any) => {
  return (
    <li {...props.attributes}>
      {props.children}
    </li>
  );
};

const HeadingOneElement = (props: any) => {
  return (
    <h1 {...props.attributes}>
      {props.children}
    </h1>
  );
};

const HeadingTwoElement = (props: any) => {
  return (
    <h2 {...props.attributes}>
      {props.children}
    </h2>
  );
};

const HeadingThreeElement = (props: any) => {
  return (
    <h3 {...props.attributes}>
      {props.children}
    </h3>
  );
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const LinkElement = (props: any) => {
  return (
    <a href={props.element.url} {...props.attributes}>
      {props.children}
    </a>
  );
};

const ImageElement = (props: any) => {
	const { attributes, element } = props;
	const { url, width = 50, rounded = false } = element;

	const imageStyle: React.CSSProperties = {
		width: `${width}%`,
		maxWidth: '100%',
		height: 'auto',
		borderRadius: rounded ? '10px' : '0',
		objectFit: 'cover',
		cursor: 'pointer',
	};

	return (
		<div {...attributes} style={{ textAlign: 'center' }}>
			<img
				src={url}
				alt="Blog Image"
				style={imageStyle}
				onClick={() => props.onClick(url)}
			/>
		</div>
	);
};

const ParagraphElement = (props: any) => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  );
};

const DefaultElement = (props: any) => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  );
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : undefined,
        fontStyle: props.leaf.italic ? 'italic' : undefined,
        textDecoration: props.leaf.underline ? 'underline' : undefined,
        fontFamily: props.leaf.code ? 'monospace' : undefined,
      }}
    >
      {props.children}
    </span>
  );
};

export default BlogEditor;
