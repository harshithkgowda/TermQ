'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[400px]" data-unique-id="59494a59-299e-4797-8e83-58d4759e397c" data-file-name="components/TCAnalyzerWrapper.tsx">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="fed80ec7-19df-42d4-b721-5dec4fbc4605" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
      </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}