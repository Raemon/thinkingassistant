import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import PrivacyPolicyPage from '../components/PrivacyPolicyPage';

const prisma = new PrismaClient();

// For SEO
export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost();
  
  return {
    title: post?.title ?? 'Privacy Policy',
    description: post?.html?.slice(0, 160) ?? '',
  };
}

// Cache the database query
const getPost = unstable_cache(
  async () => {
    return await prisma.post.findUnique({
      where: { slug: 'privacy-policy' }
    });
  },
  ['privacy-policy-post'], // cache key
  { revalidate: 3600 } // revalidate every hour
);

// This file is the server-side rendering component.
// PrivacyPolicyPage is the client-side component.
// This separation allows for SSR while keeping the client-side interactive.
export default function Page() {
  return (
    <PrivacyPolicyPage />
  )
}