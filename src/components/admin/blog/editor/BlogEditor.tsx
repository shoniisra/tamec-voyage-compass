
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogEditorProps {
  data?: string;
  onChange: (content: string) => void;
  initialTitle?: string;
  initialContent?: any;
  initialCoverImage?: string;
  initialSlug?: string;
  initialTags?: any[];
  blogId?: string;
  isEdit?: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ 
  data, 
  onChange,
  initialTitle,
  initialContent,
  initialCoverImage,
  initialSlug,
  initialTags,
  blogId,
  isEdit 
}) => {
  const { language } = useLanguage();
  const [content, setContent] = useState(data || initialContent || '');
  const editorRef = useRef<any>(null);

  console.log('Editor props:', data, onChange, initialContent);

  useEffect(() => {
    setContent(data || initialContent || '');
  }, [data, initialContent]);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      value={content}
      onEditorChange={handleEditorChange}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default BlogEditor;
