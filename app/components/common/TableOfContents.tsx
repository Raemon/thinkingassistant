import { Post } from "@prisma/client";
import { generateSlug } from "./PostEditor";

export function TableOfContents({post}: {post: Post}) {
  const headings = [`<h1>${post.title}</h1>`, ...(post?.html?.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g) || [])];
  return <div>
    {headings.map((heading, i) => {
      const indentLevel = parseInt(heading.match(/<h[1-3]/)?.[0]?.match(/h(\d)/)?.[1] || '1') || 1;
      const text = heading.replace(/<[^>]+>/g, '');
      return <a
        href={`#${generateSlug(text)}`}
        key={i}
        className={`block text-md text-gray-500 font-normal leading-tight mb-4`}
        style={{
          fontWeight: indentLevel === 1 ? 600 : indentLevel === 2 ? 400 : 300,
          opacity: indentLevel === 1 ? 0 : indentLevel === 2 ? 1 : .7,
        }}
        onClick={(e) => {
          e.preventDefault();
          const id = generateSlug(text);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {text}
      </a>
    })}
  </div>;
}
