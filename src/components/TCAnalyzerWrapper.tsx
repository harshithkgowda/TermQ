'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering
const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[400px]" data-unique-id="b1991b0e-a014-4126-89f3-eae57cd8209f" data-file-name="components/TCAnalyzerWrapper.tsx">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" data-unique-id="cc22cf49-d613-4df5-a7e0-383ace1e0415" data-file-name="components/TCAnalyzerWrapper.tsx"></div>
      </div>
});
export default function TCAnalyzerWrapper() {
  return <TCAnalyzerInterface />;
}