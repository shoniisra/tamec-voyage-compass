
import React, { useState } from 'react';
import { useBlogPost } from '@/hooks/use-blog-post';
import { useComments } from '@/hooks/use-comments';
import { useRecentPosts } from '@/hooks/use-recent-posts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Heart, Share, Clock, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Link } from 'react-router-dom';

interface BlogDetailProps {
  slug: string;
}

const CommentSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  comment: z.string().min(3, {
    message: "Comment must be at least 3 characters.",
  }),
});

const BlogDetail = ({ slug }: BlogDetailProps) => {
  const { post, loading } = useBlogPost(slug);
  const { formatBlogPost, t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  const { comments, loading: commentsLoading, addComment } = useComments(post?.id || '');
  const { posts: recentPosts, loading: recentPostsLoading } = useRecentPosts(post?.id || '');

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Skeleton className="h-8 w-2/3 mb-4" />
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-80 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="text-tamec-600 hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  const formattedPost = formatBlogPost(post);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this blog post with others.",
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "This post has been removed from your favorites" : "This post has been added to your favorites",
    });
  };

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    const result = await addComment(values.name, values.email, values.comment);
    if (result.success) {
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      });
      form.reset();
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {formattedPost.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-6 flex-wrap gap-4">
            <span className="bg-tamec-50 text-tamec-700 px-3 py-1 rounded-full text-sm">
              {formattedPost.category}
            </span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.cover_image} 
            alt={formattedPost.title} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between mb-8 border-y py-4">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleLike}
            >
              <Heart 
                className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
              />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageSquare className="h-5 w-5" />
            <span>{comments.length} comments</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none mb-12">
          {formattedPost.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments</h3>
          
          {/* Comment Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share your thoughts..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-tamec-600 hover:bg-tamec-700">
                Post Comment
              </Button>
            </form>
          </Form>
          
          {/* Comments List */}
          <div className="space-y-4">
            {commentsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border p-4 rounded-lg">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-gray-500">Be the first to comment on this post!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPostsLoading ? (
              [1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </Card>
              ))
            ) : (
              recentPosts.map((post) => {
                const recentPost = formatBlogPost(post);
                return (
                  <Link to={`/blog/${post.slug}`} key={post.id}>
                    <Card className="overflow-hidden h-full hover:-translate-y-1 transition-all duration-300">
                      <div className="h-36 overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={recentPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-2 line-clamp-2">{recentPost.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{recentPost.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
