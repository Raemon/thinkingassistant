import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@prisma/client';

export function PostList({ onSelectPost }: { onSelectPost?: (postId: string) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        return Array.isArray(data) ? setPosts(data) : setPosts([]);
      })
      .catch(err => {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      });
  }, []);

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} onClick={() => onSelectPost && onSelectPost(p.id.toString())}>
          <Link href={`/post/${p.slug}`}>{p.title}</Link>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
}

export default PostList;
