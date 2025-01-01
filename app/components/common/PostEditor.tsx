'use client';

import { useEffect, useState } from 'react';
// import { debounce } from 'lodash'; 
import { Post } from '@prisma/client';

import CkEditor from './CkEditor';

export interface ApiResponse {
  success?: boolean;
  posts?: Post[];
  post?: Post;
  error?: string;
}

export const generateSlug = (title: string) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const PostEditor = ({post, refetch, onSubmit}:{post?:Post, refetch?:()=>void, onSubmit:()=>void}) => {
  const editing = post ? true : false;
  const postData = post || {title: '', html: ''}; 
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.html);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);

  // const autoUpdate = async (updatedTitle: string, updatedContent: string) => {
  //   if (!post) return;
  //   try {
  //     console.log('Auto-updating post...', post.slug);
  //     const response = await fetch(`/api/posts`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ title, slug: post?.slug, html: content })
  //     });
  //     if (!response.ok) {
  //       console.error('Auto-update failed');
  //     } else {  
  //       const data: ApiResponse = await response.json();
  //       setLastUpdated(data.post?.updatedAt);
  //     }
  //   } catch (err) {
  //     console.error('Auto-update error:', err);
  //   }
  // };

  // const debouncedUpdate = debounce((updatedTitle: string, updatedContent: string) => {
  //   autoUpdate(updatedTitle, updatedContent);
  // }, 3000, { leading: false, trailing: true });

  // useEffect(() => {
  //   debouncedUpdate(title || '', content || '');
  // }, [title, content]);

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.html || '');
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    if (!editing) {
      if (!title || !content) {
        setError('Title and content are required');
        return;
      }
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug: generateSlug(title),
            html: content
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setTitle('');
          setContent('');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to create post');
        console.error('Error creating post:', error);
      } finally {
        setIsSubmitting(false);
        onSubmit();
      }
    } else {
      if (!post) return;
      try {
        const response = await fetch(`/api/posts`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, slug: post.slug, html: content })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setLastUpdated(data.post?.updatedAt);
        // refetch();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to update post');
        console.error('Error updating post:', error);
      } finally {
        setIsSubmitting(false);
        onSubmit();
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex justify-between mb-2 sticky top-0 bg-white">
          <div className="text-xs text-gray-400">{lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}` : ''}</div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-xs text-blue-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </button> 
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          {/* <CkEditor
            initialData={content}
            onChange={(data) => setContent(data)}
            config={{
              placeholder: 'Post content'
            }}
          /> */}
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
