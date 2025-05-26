'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen" data-unique-id="e56fb6a4-d95e-45d9-8c70-decd10db8548" data-file-name="components/TCAnalyzerWrapper.tsx">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-unique-id="c8499223-b69f-41da-b4b8-27e7ccd1b258" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
    </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}