import { Post } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const fetchPost = async (slug: string): Promise<Post> => {
  const response = await fetch(`/api/posts/${slug}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function usePost(postSlug: string) {
  return useQuery({
    queryKey: ['post', postSlug],
    queryFn: () => fetchPost(postSlug)
  });
}