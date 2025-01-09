import { Metadata } from 'next';
import { Post, PrismaClient } from '@prisma/client';
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

async function getPost() {
  return await prisma.post.findUnique({
    where: { slug: 'privacy-policy' }
  });
}

// This file is the server-side rendering component.
// PrivacyPolicyPage is the client-side component.
// This separation allows for SSR while keeping the client-side interactive.
export default async function Page() {
  const post = await getPost();
  return (
    <PrivacyPolicyPage post={post as Post} />
  )
}