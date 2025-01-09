import { Metadata } from 'next';
import { Post, PrismaClient } from '@prisma/client';
import TermsOfServicePage from '../components/TermsOfServicePage';

const prisma = new PrismaClient();

export const revalidate = 3600; // revalidate every hour

async function getPost() {
  return await prisma.post.findUnique({
    where: { slug: 'terms-of-service' }
  });
}

// For SEO
export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost();
  
  return {
    title: post?.title ?? 'Terms of Service',
    description: post?.html?.slice(0, 160) ?? '',
  };
}

// This file is the server-side rendering component.
// TermsOfServicePage is the client-side component.
// This separation allows for SSR while keeping the client-side interactive.
export default async function Page() {
  const post = await getPost();

  return (
    <TermsOfServicePage post={post as Post} />
  );
}