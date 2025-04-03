
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toKebabCase } from '@/utils/stringUtils';
import { useRecentPosts } from '@/hooks/use-recent-posts';

interface RecentPostsProps {
  currentPostId: string;
  limit?: number;
}

const RecentPosts = ({ currentPostId, limit = 3 }: RecentPostsProps) => {
  const { language } = useLanguage();
  const { posts, loading } = useRecentPosts(currentPostId, limit);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="h-16 w-16 object-cover rounded" 
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
