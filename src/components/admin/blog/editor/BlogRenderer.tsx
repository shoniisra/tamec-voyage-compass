import React from "react";
import Output from "editorjs-react-renderer";

interface BlogRendererProps {
  content: any;
}

// Custom renderers for Editor.js blocks
const renderers = {
  header: ({ data, style }: any) => {
    const Tag = `h${data.level}` as keyof JSX.IntrinsicElements;
    return <Tag className="mt-6 mb-3 font-bold text-left">{data.text}</Tag>;
  },
  paragraph: ({ data }: any) => {
    return <p className="my-4 text-left" dangerouslySetInnerHTML={{ __html: data.text }} />;
  },
  list: ({ data }: any) => {
    const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
    const listClasses = "list-inside my-4 text-left " + 
      (data.style === 'ordered' ? 'list-decimal' : 'list-disc');
    
    return (
      <ListTag className={listClasses}>
        {data.items.map((item: string, idx: number) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ListTag>
    );
  },
  image: ({ data }: any) => {
    return (
      <div className="my-6">
        <img 
          src={data.file?.url} 
          alt={data.caption || ''} 
          className="max-w-full rounded-md" 
        />
        {data.caption && (
          <p className="text-center text-gray-500 mt-1 text-left">{data.caption}</p>
        )}
      </div>
    );
  }
};

const BlogRenderer = ({ content }: BlogRendererProps) => {
  if (!content || !content.blocks || content.blocks.length === 0) {
    return <p>No content available</p>;
  }

  return (
    <div className="blog-content prose max-w-none text-left">
      <Output data={content} renderers={renderers} />
    </div>
  );
};

export default BlogRenderer;
