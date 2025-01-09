'use client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { AnyBecauseUnknown } from '@/app/types';


import dynamic from 'next/dynamic';

// Export the default component with SSR disabled
export default dynamic(
  () => import('./CkEditorComponent'),
  { ssr: false }
);

// const CkEditor = ({
//   storageKey = 'ckeditor-content',
//   initialData = 'kjhgkjhk',
//   onChange,
//   config = {},
// }: EditorProps) => {

//   return (
//     <div className="w-full">
//       <style>{`
//         .ck.ck-editor__editable {
//           min-height: 300px;
//         }
//         .ck.ck-powered-by {
//           display: none;
//         }
//         .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
//           border: none;
//           box-shadow: none;
//           outline: none;
//         }

//         .ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable), 
//         .ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable) {
//           border-radius: 0;
//         }

//         .ck.ck-editor__editable_inline[dir=ltr] {
//           text-align: left;
//         }

//         .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
//           border-radius: 0;
//         }

//         .ck.ck-editor__editable_inline {
//           outline: none;
//           border: none;
//         }

//         .ck.ck-editor__editable_inline {
//           border: none;
//           overflow: auto;
//           padding: 0 var(--ck-spacing-standard);
//         }

//         .ck-focused {
//           outline: none;
//           border: none;
//         }

//         .ck.ck-editor__editable h1 {
//           font-size: 2.5em
//         }

//         .ck.ck-editor__editable h2 {
//           font-size: 2em
//         }

//         .ck.ck-editor__editable h3 {
//           font-size: 1.5em
//         }

//         .ck.ck-editor__editable p {
//           font-size: 1em
//         }

//         .ck.ck-editor__editable ul {
//           list-style-type: disc;
//           margin-left: 1.5em;
//         }

//         .ck.ck-editor__editable li {
//           margin-bottom: 0.5em;
//         }
//       `}</style>
//       <CKEditorComponent
//         editor={BalloonEditor}
//         config={{
//           ...config,
//           placeholder: 'Write your content here...',
//         }}
//         data={initialData}
//         onReady={(editor: AnyBecauseUnknown) => {
//           // const savedContent = localStorage.getItem(storageKey);
//           // const contentToLoad = savedContent ?? initialData;

//           // if (contentToLoad) {
//             // editor.setData(contentToLoad);
//           // }
//         }}
//         onChange={(_: AnyBecauseUnknown, editor: AnyBecauseUnknown) => {
//           const data = editor.getData();
//           // localStorage.setItem(storageKey, data);
//           onChange?.(data);
//         }}
//       />
//     </div>
//   );
// };

// export default CkEditor;