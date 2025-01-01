// import { useState, useEffect, useRef } from "react";
// import PostEditor, { generateSlug } from "./PostEditor";
// import Link from 'next/link'
// import { postCacheData } from '../../../postCacheData'; 
// import { Post } from "@prisma/client";

// function PostDisplay({postSlug}:{postSlug:string}) {
//   const [edit, setEdit] = useState(false)
  
//   const containerRef = useRef<HTMLDivElement>(null);

//   const cachedPost = postCacheData[postSlug] as Post | undefined;
//   if (!cachedPost) return null
//   const post = {
//     ...cachedPost,
//     createdAt: new Date(cachedPost?.createdAt ?? ''),
//     updatedAt: new Date(cachedPost?.updatedAt ?? ''),
//   }

//   const isDev = window.location.href.includes('localhost');  

//   const handleDoubleClick = async (newEdit:boolean) => {
//     if (!window.location.href.includes('localhost')) return;
//     setEdit(newEdit)
//   }

//   const htmlWithAnchors = post?.html?.replace(/<h[1-3]([^>]*)>([^<]*)<\/h[1-3]>/g, (match: string, attrs: string, text: string) => {
//     const level = match.charAt(2);
//     return `<h${level}${attrs} id="${generateSlug(text)}">${text}</h${level}>`;
//   });

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleClick = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
//         event.preventDefault();
//         const id = target.getAttribute('href')?.slice(1);
//         if (id) {
//           const element = document.getElementById(id);
//           if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//           }
//         }
//       }
//     };

//     container.addEventListener('click', handleClick);

//     return () => {  
//       container.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return (
//     <div className="max-w-[640px] mx-auto" ref={containerRef}>
//         {isDev && !edit && <a className="text-xs text-blue-400 cursor-pointer inline-block z-20 bg-white hover:opacity-50 sticky top-0 float-right" onClick={()=>handleDoubleClick(true)}>Edit</a>}
//       <div style={{display: edit ? 'none' : 'block'}}>
//         <h1 id={post?.slug}><Link href={`#${post?.slug}`}>{post?.title}</Link></h1>
//         <div dangerouslySetInnerHTML={{__html: htmlWithAnchors ?? ''}} />
//       </div>
//       <div style={{display: edit ? 'block' : 'none'}}>
//         <PostEditor post={post} onSubmit={()=>handleDoubleClick(false)}/>
//       </div>
//     </div>
//   )
// }

// export default PostDisplay;