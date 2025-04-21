
export interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  content_en?: any;
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
  content?: any;
  newContent?: any; // Adding this property for compatibility with existing code
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
  blog_id?: string; // Adding this for compatibility
}

export type Comment = BlogComment;

export interface EditorJSBlogData {
  title: string;
  title_en?: string;
  content: any;
  content_en?: any;
  slug?: string;
  cover_image?: string;
}
