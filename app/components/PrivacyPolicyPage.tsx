'use client';

import Layout from "../components/common/Layout";
import PostDisplay from "../components/common/PostDisplay";
import { Post } from "@prisma/client";

export default function PrivacyPolicyPage({ post }: { post: Post }) {
  return (
    <Layout>
      <PostDisplay post={post} />
    </Layout>
  );
}