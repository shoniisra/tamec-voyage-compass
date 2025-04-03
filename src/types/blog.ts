
export interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  title_es?: string;
  content?: any;
  content_en?: any;
  content_es?: any;
  cover_image?: string;
  date?: string;
  created_at?: string;
  slug?: string;
  isLegacy?: boolean;
  newContent?: any;
  excerpt_en?: string;
  excerpt_es?: string;
  category_en?: string;
  category_es?: string;
}

export interface Comment {
  id: string;
  blog_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}
