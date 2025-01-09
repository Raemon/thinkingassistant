'use client';

import dynamic from 'next/dynamic';

// Export the default component with SSR disabled
export default dynamic(
  () => import('./CkEditorComponent'),
  { ssr: false }
);