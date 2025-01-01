import { Post } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
}