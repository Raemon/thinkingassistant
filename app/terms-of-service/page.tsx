import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import TermsOfServicePage from '../components/TermsOfServicePage';

const prisma = new PrismaClient();

// For SEO
export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost();
  
  return {
    title: post?.title ?? 'Terms of Service',
    description: post?.html?.slice(0, 160) ?? '',
  };
}

// Cache the database query
const getPost = unstable_cache(
  async () => {
    return await prisma.post.findUnique({
      where: { slug: 'terms-of-service' }
    });
  },
  ['terms-of-service-post'], // cache key
  { revalidate: 3600 } // revalidate every hour
);

// This file is the server-side rendering component.
// TermsOfServicePage is the client-side component.
// This separation allows for SSR while keeping the client-side interactive.
export default function Page() {
  return (
    <TermsOfServicePage />
  )
}