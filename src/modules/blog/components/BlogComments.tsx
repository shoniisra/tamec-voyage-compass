
import React, { useState } from 'react';
import { useComments } from '@/hooks/use-comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface BlogCommentsProps {
  postId: string;
}

const BlogComments = ({ postId }: BlogCommentsProps) => {
  const { comments, loading, addComment } = useComments(postId);
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await addComment(name, email, content);
      
      // Clear the form on successful comment submission
      setName('');
      setEmail('');
      setContent('');
      
      toast({
        title: "Success",
        description: "Your comment has been posted",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post your comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold flex items-center mb-6">
        <MessageSquare className="mr-2" />
        {t('blog.comments')} ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h4 className="text-lg font-medium">{t('blog.leaveComment')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              {t('blog.name')} *
            </label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('blog.namePlaceholder')}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              {t('blog.email')} *
            </label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('blog.emailPlaceholder')}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-sm font-medium">
            {t('blog.comment')} *
          </label>
          <Textarea 
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('blog.commentPlaceholder')}
            rows={4}
            required
          />
        </div>
        
        <Button 
          type="submit"
          className="bg-tamec-600 hover:bg-tamec-700 text-white"
          disabled={isSubmitting}
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? t('blog.posting') : t('blog.postComment')}
        </Button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            {t('blog.noComments')}
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{comment.name}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComments;
