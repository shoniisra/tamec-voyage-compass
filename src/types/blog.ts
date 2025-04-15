
// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  content_en?: string;
  content_es?: string;
  category_en?: string;
  category_es?: string;
  excerpt_en?: string;
  excerpt_es?: string;
  cover_image?: string;
  slug: string;
  date?: string;
  created_at?: string;
  isLegacy?: boolean;
  // New content from EditorJS
  newContent?: any;
  content?: any;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  category_id?: string | null;
}

export interface BlogComment {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

export type Comment = {
  id: string;
  blog_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
};
