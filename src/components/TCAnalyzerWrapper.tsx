'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen" data-unique-id="ef10480c-2fd0-4efe-af97-9a9cb84f0409" data-file-name="components/TCAnalyzerWrapper.tsx">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-unique-id="a782eb95-bf43-4a3d-827d-680bb1589fd5" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
    </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}