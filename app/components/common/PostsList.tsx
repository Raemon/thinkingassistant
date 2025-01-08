import Link from 'next/link'
import Tooltip from './Tooltip';
import { Post } from '@prisma/client';

export function PostList({ posts }: { posts: Post[], onSelectPost?: (postId: number) => void }) {

  return (
    <div>
      {posts.map((p) => (
        <Link key={p.id} href={`/posts/${p.slug}`} className="block mb-4 text-gray-400 leading-tight">
          <Tooltip content={<div dangerouslySetInnerHTML={{ __html: p.html }} />} placement="right-start">
            <div>{p.title}</div>
          </Tooltip>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
