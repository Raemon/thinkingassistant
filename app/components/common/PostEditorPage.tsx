'use client';

import { Post } from '@prisma/client';
import Header from './Header';
import PostList from './PostsList';
import PostEditor from './PostEditor';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePosts } from '@/app/hooks/usePosts';

function PostEditorPage() {
//   const { slug } = useParams();
  const { data: posts = [], isLoading, error, refetch } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const params = useParams();
  const slug = params?.postSlug as string;

  

  useEffect(() => {
    if (posts.length > 0) {
      setSelectedPost(posts.find((p) => p.slug === slug));
    }
  }, [slug, posts]);

  console.log(selectedPost);

  return (
    <div>
      <Header title="Editor" />
      <div className="flex justify-between">
        <div className="w-1/5 p-4">
          <PostList posts={posts} />
          {posts.length === 0 && (
            <div>Loading...</div>
          )}
        </div>
        <div className="p-4 w-1/2">
          <PostEditor post={selectedPost} refetch={refetch} onSubmit={()=>{}} />
        </div>
        <div className="w-1/5 p-4">
        </div>
      </div>
    </div>
  );
}

export default PostEditorPage; 