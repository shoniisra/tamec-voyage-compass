
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  ImageIcon,
  Text
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface EditorProps {
  initialContent?: string;
}

const BlogEditor: React.FC<EditorProps> = ({ initialContent = "" }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState("");

  const handleSave = () => {
    toast({
      title: language === 'en' ? 'Successfully saved' : 'Guardado con éxito',
      description: language === 'en' ? 'Your blog post has been saved.' : 'Tu publicación ha sido guardada.'
    });
  };

  return (
    <div className="border rounded-md p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {language === 'en' ? 'Title' : 'Título'}
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={language === 'en' ? 'Enter blog title...' : 'Ingresa el título del blog...'}
          className="mb-4"
        />
      </div>

      <div className="flex flex-wrap items-center p-2 border-b bg-gray-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Bold' : 'Negrita'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Italic' : 'Cursiva'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Underline' : 'Subrayado'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Link' : 'Enlace'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Bullet List' : 'Lista con viñetas'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Numbered List' : 'Lista numerada'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Insert Image' : 'Insertar imagen'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Text className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{language === 'en' ? 'Format Text' : 'Formatear texto'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="p-4">
        <textarea
          className="w-full p-2 border rounded min-h-[300px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={language === 'en' ? 'Start typing your blog post...' : 'Comienza a escribir tu publicación...'}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          className="bg-tamec-600 hover:bg-tamec-700 text-white"
          onClick={handleSave}
        >
          {language === 'en' ? 'Save' : 'Guardar'}
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
