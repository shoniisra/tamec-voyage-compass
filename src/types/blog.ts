
export interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  content?: any;
  content_en?: any;
  cover_image?: string;
  date?: string;
  created_at?: string;
  slug?: string;
  isLegacy?: boolean;
  newContent?: any;
}

export interface Comment {
  id: string;
  blog_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}
