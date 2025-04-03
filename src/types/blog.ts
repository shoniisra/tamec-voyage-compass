
export interface BlogPost {
  id: string;
  title_en: string;
  title_es: string;
  excerpt_en: string;
  excerpt_es: string;
  content_en: string;
  content_es: string;
  cover_image: string;
  date: string;
  category_en: string;
  category_es: string;
  slug: string;
}

export interface Comment {
  id: string;
  blog_post_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}
