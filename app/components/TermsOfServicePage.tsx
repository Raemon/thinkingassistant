'use client';

import { Post } from "@prisma/client";
import Layout from "../components/common/Layout";
import PostDisplay from "../components/common/PostDisplay";

export default function TermsOfServicePage({ post }: { post: Post }) {
  return (
    <Layout>
      <PostDisplay post={post} />
    </Layout>
  );
}